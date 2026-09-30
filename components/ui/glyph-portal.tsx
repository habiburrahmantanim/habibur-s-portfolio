"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type PortalTheme = "emerald" | "light" | "gradient";

export interface GlyphPortalProps {
  word?: string;
  initialTheme?: PortalTheme;
  fontFamily?: string;
  fontWeight?: number | string;
  scrollLength?: number;
  interactive?: boolean;
  annotations?: boolean;
  front?: ReactNode;
  frontContent?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

type LetterAnchor = { char: string; x: number; y: number };

const ZOOM_EASE = 0.1;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function layoutWord(value: string) {
  const cleanWord = value.toUpperCase().trim() || "SUBLIME";
  const letterSpacing = Math.min(80, 500 / Math.max(cleanWord.length, 4));
  const startX = 500 - ((cleanWord.length - 1) * letterSpacing) / 2;
  const anchors: LetterAnchor[] = Array.from(cleanWord).map((char, index) => ({
    char,
    x: startX + index * letterSpacing,
    y: 200,
  }));
  return {
    word: cleanWord,
    anchors,
    fontSize: Math.max(70, Math.min(140, 900 / cleanWord.length)),
  };
}

export default function GlyphPortal({
  word: initialWord = "SUBLIME",
  initialTheme = "emerald",
  fontFamily = "var(--font-geist-sans), sans-serif",
  fontWeight = 800,
  scrollLength = 1,
  interactive = true,
  annotations = false,
  front,
  frontContent,
  children,
  className = "",
  style,
  id,
}: GlyphPortalProps) {
  const generatedId = useId().replaceAll(":", "");
  const maskId = `${generatedId}-glyph-mask`;
  const emeraldId = `${generatedId}-emerald`;
  const lightId = `${generatedId}-light`;
  const gradientId = `${generatedId}-gradient`;
  const rootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const exitRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLElement>(null);
  const targetZoom = useRef(0);
  const currentZoom = useRef(0);
  const frame = useRef<number | null>(null);
  const touchY = useRef(0);
  const reducedMotion = useRef(false);
  const triggerZoomRef = useRef<(value: number) => void>(() => {});
  const [word, setWord] = useState(initialWord);
  const [theme, setTheme] = useState<PortalTheme>(initialTheme);
  const [selectedLetter, setSelectedLetter] = useState(0);
  const { word: cleanWord, anchors, fontSize } = layoutWord(word);
  const activeLetter = Math.min(selectedLetter, anchors.length - 1);
  const targetAnchor = anchors[activeLetter] ?? { x: 500, y: 200 };
  const frontSlot = frontContent ?? front;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotion.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const applyProgress = (progress: number) => {
      const scale = 1 + Math.pow(progress, 2.8) * 85;
      const translateX = (500 - targetAnchor.x) * (scale - 1) * 0.85;
      const translateY = (200 - targetAnchor.y) * (scale - 1) * 0.85;
      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
        stageRef.current.style.opacity = String(
          Math.max(1 - Math.pow(progress, 1.8) * 1.5, 0),
        );
      }
      if (backgroundRef.current) {
        backgroundRef.current.style.opacity = String(
          Math.min(progress * 1.8, 1),
        );
      }
      const frontOpacity = Math.max(1 - progress * 2.5, 0);
      if (frontRef.current) {
        frontRef.current.style.opacity = String(frontOpacity);
        frontRef.current.style.pointerEvents =
          frontOpacity < 0.2 ? "none" : "auto";
      }
      const contentVisible = progress > 0.75;
      if (contentRef.current) {
        contentRef.current.style.opacity = contentVisible ? "1" : "0";
        contentRef.current.style.pointerEvents = contentVisible
          ? "auto"
          : "none";
        contentRef.current.setAttribute("aria-hidden", String(!contentVisible));
        contentRef.current.toggleAttribute("inert", !contentVisible);
      }
      if (exitRef.current) {
        exitRef.current.style.opacity = contentVisible ? "1" : "0";
        exitRef.current.style.pointerEvents = contentVisible ? "auto" : "none";
      }
      const controlsOpacity = Math.max(1 - progress * 2.5, 0);
      for (const element of [controlsRef.current, pickerRef.current]) {
        if (!element) continue;
        element.style.opacity = String(controlsOpacity);
        element.style.pointerEvents = controlsOpacity < 0.2 ? "none" : "auto";
      }
      rootRef.current?.setAttribute("data-entered", String(contentVisible));
    };

    const renderLoop = () => {
      const difference = targetZoom.current - currentZoom.current;
      if (reducedMotion.current) currentZoom.current = targetZoom.current;
      else if (Math.abs(difference) > 0.0005) {
        currentZoom.current += difference * ZOOM_EASE;
      } else {
        currentZoom.current = targetZoom.current;
      }

      applyProgress(currentZoom.current);
      if (Math.abs(targetZoom.current - currentZoom.current) > 0.0005) {
        frame.current = requestAnimationFrame(renderLoop);
      } else {
        frame.current = null;
      }
    };

    triggerZoomRef.current = (value: number) => {
      targetZoom.current = clamp(value, 0, 1);
      if (frame.current !== null) return;
      if (reducedMotion.current) renderLoop();
      else frame.current = requestAnimationFrame(renderLoop);
    };

    applyProgress(currentZoom.current);
    if (Math.abs(targetZoom.current - currentZoom.current) > 0.0005) {
      frame.current = requestAnimationFrame(renderLoop);
    }
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [targetAnchor.x, targetAnchor.y]);

  useEffect(() => {
    const isAtHome = () => {
      const root = rootRef.current;
      if (!root || window.scrollY > 1) return false;
      const bounds = root.getBoundingClientRect();
      return bounds.top <= 1 && bounds.bottom >= window.innerHeight - 1;
    };

    const onWheel = (event: WheelEvent) => {
      if (!isAtHome()) return;
      if (currentZoom.current < 0.95 || event.deltaY < 0) {
        event.preventDefault();
      }
      triggerZoomRef.current(
        targetZoom.current + event.deltaY * 0.0015 * scrollLength,
      );
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isAtHome()) return;
      const nextY = event.touches[0]?.clientY ?? touchY.current;
      const delta = touchY.current - nextY;
      touchY.current = nextY;
      if (currentZoom.current < 0.95 || delta < 0) {
        if (event.cancelable) event.preventDefault();
      }
      triggerZoomRef.current(targetZoom.current + delta * 0.003 * scrollLength);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [scrollLength]);

  const slot = frontSlot ?? (
    <div className="glyph-portal-default-front">
      <span>DESIGN / DIGITAL EXPERIENCES</span>
      <h1>A different perspective starts here.</h1>
    </div>
  );

  return (
    <div
      ref={rootRef}
      id={id}
      className={`glyph-portal ${className}`}
      data-theme={theme}
      data-entered="false"
      style={{ fontFamily, ...style }}
    >
      <div ref={backgroundRef} className="glyph-portal-background" />

      {interactive && (
        <div ref={controlsRef} className="glyph-portal-controls">
          <div className="glyph-portal-themes" aria-label="Portal theme">
            {(["emerald", "light", "gradient"] as PortalTheme[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={theme === item}
                onClick={() => setTheme(item)}
              >
                {item === "gradient" ? "Gradient" : item}
              </button>
            ))}
          </div>
          <label className="glyph-portal-word-select">
            <span className="sr-only">Portal word</span>
            <select
              value={cleanWord}
              onChange={(event) => setWord(event.target.value)}
            >
              {!WORD_OPTIONS.includes(cleanWord) && (
                <option value={cleanWord}>{cleanWord}</option>
              )}
              {WORD_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div ref={frontRef} className="glyph-portal-front">
        {slot}
        <div className="glyph-portal-front-bottom">
          <span>Scroll down</span>
        </div>
      </div>

      <div ref={stageRef} className="glyph-portal-stage" aria-hidden="true">
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <mask id={maskId}>
              <rect
                x="-1000"
                y="-1000"
                width="3000"
                height="3000"
                fill="white"
              />
              <text
                x="500"
                y="240"
                textAnchor="middle"
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                fontSize={fontSize}
                letterSpacing="-.03em"
                fill="black"
              >
                {cleanWord}
              </text>
            </mask>
            <radialGradient id={emeraldId} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1c3d30" />
              <stop offset="55%" stopColor="#142b22" />
              <stop offset="100%" stopColor="#08120d" />
            </radialGradient>
            <linearGradient id={lightId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="36%" stopColor="#1e1b4b" />
              <stop offset="70%" stopColor="#134c3d" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <rect
            x="-1000"
            y="-1000"
            width="3000"
            height="3000"
            fill={`url(#${theme === "emerald" ? emeraldId : theme === "light" ? lightId : gradientId})`}
          />
          <circle
            cx="500"
            cy="200"
            r="320"
            fill={
              theme === "light"
                ? "#94a3b8"
                : theme === "gradient"
                  ? "#10b981"
                  : "#234e3e"
            }
            opacity=".3"
          />
          <rect
            x="-1000"
            y="-1000"
            width="3000"
            height="3000"
            fill="#fff"
            mask={`url(#${maskId})`}
          />
          <text
            x="500"
            y="240"
            textAnchor="middle"
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fontSize={fontSize}
            letterSpacing="-.03em"
            fill="none"
            stroke="rgba(15, 23, 21, .12)"
            strokeWidth="1.5"
          >
            {cleanWord}
          </text>
        </svg>
      </div>

      <section
        ref={contentRef}
        className="glyph-portal-inner"
        aria-label="Inside the portfolio"
        aria-hidden="true"
        inert
      >
        <div className={`glyph-portal-inner-content theme-${theme}`}>
          {children ?? (
            <>
              <span>PORTFOLIO / 2026</span>
              <h2>A different way into what comes next.</h2>
              <p>
                Thoughtful interfaces, dependable systems, and data-led ideas.
              </p>
            </>
          )}
        </div>
      </section>

      <button
        ref={exitRef}
        className="glyph-portal-exit"
        type="button"
        aria-label="Return to the Home portal"
        onClick={() => triggerZoomRef.current(0)}
      >
        <span aria-hidden="true">&#8592;</span> Back to front
      </button>

      {interactive && (
        <nav
          ref={pickerRef}
          className="glyph-portal-picker"
          aria-label="Choose portal letter"
        >
          <span>Target glyph</span>
          {anchors.map((anchor, index) => (
            <button
              key={`${anchor.char}-${index}`}
              type="button"
              aria-label={`Zoom through ${anchor.char}, letter ${index + 1}`}
              aria-pressed={activeLetter === index}
              onClick={() => setSelectedLetter(index)}
            >
              {anchor.char}
            </button>
          ))}
        </nav>
      )}

      {annotations && (
        <output className="glyph-portal-annotation" aria-live="polite">
          {targetAnchor.char} / {Math.round(targetAnchor.x)}, {targetAnchor.y}
        </output>
      )}
    </div>
  );
}
