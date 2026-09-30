"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/portfolio";

const STEP = 40;
const EASE = 0.12;
const WHEEL_UNITS = 180;
const DRAG_UNITS = 210;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function place(
  ringAngle: number,
  drumAngle: number,
  ringRadius: number,
  drumRadius: number,
  bow: number,
  amount: number,
) {
  const bowOffset = -bow * (1 - Math.cos((drumAngle * Math.PI) / 180));
  return (
    `translateX(${amount * bowOffset}px)` +
    ` rotateZ(${(1 - amount) * ringAngle}deg) translateY(${-(1 - amount) * ringRadius}px)` +
    ` rotateX(${amount * drumAngle}deg) translateZ(${amount * drumRadius}px)`
  );
}

export function WorksWheel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const ringLabelRef = useRef<HTMLDivElement>(null);
  const turn = useRef(0);
  const target = useRef(0);
  const dragY = useRef<number | null>(null);
  const settling = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = projects.length;
  const last = count - 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const update = () =>
      setStage({ width: element.clientWidth, height: element.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const metrics = useMemo(() => {
    const { width, height } = stage;
    const cardWidth = Math.min(
      height * 0.34 * 1.45,
      width * (width < 600 ? 0.48 : 0.28),
    );
    const cardHeight = cardWidth / 1.45;
    const ringRadius = cardHeight * 1.35;
    const ringScale = count
      ? clamp(
        (((2 * Math.PI * ringRadius) / count) * 0.82) / (cardWidth || 1),
        0.16,
        1,
      )
      : 1;
    const drumRadius = cardHeight * 2;
    return {
      cardWidth,
      cardHeight,
      ringRadius,
      ringScale,
      drumRadius,
      bow: cardHeight * 1.3,
      depth: cardHeight * 2.7,
    };
  }, [stage, count]);

  const goTo = useCallback(
    (index: number) => {
      const destination = clamp(index, 0, count);
      target.current = destination;
      setActive(clamp(Math.round(destination) - 1, 0, last));
    },
    [count, last],
  );

  useEffect(() => {
    if (!stage.height || !count) return;
    let frame = 0;
    const { ringRadius, ringScale, drumRadius, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reducedMotion ? 1 : EASE);

      const amount = clamp(turn.current, 0, 1);
      const position = clamp(turn.current - 1, 0, last);
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-amount * drumRadius}px)`;
      }

      for (let index = 0; index < count; index++) {
        const distance = index - position;
        const card = cardRefs.current[index];
        if (!card) continue;
        card.style.transform = place(
          distance * (360 / count),
          distance * STEP,
          ringRadius,
          drumRadius,
          bow,
          amount,
        );
        card.style.opacity =
          amount > 0.5 && Math.abs(distance) > 1.6 ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
        card.tabIndex = amount > 0.5 && Math.abs(distance) < 0.5 ? 0 : -1;
        const face = card.firstElementChild as HTMLElement | null;
        if (face) {
          const isNearest = amount > 0.5 && Math.abs(distance) < 0.5;
          const faceScale = isNearest
            ? 1.5
            : ringScale + (1 - ringScale) * amount;
          face.style.transform = `scale(${faceScale})`;
          face.style.transition = "transform 0.35s cubic-bezier(0.22,1,0.36,1)";
        }
      }

      if (detailRef.current) detailRef.current.style.opacity = String(amount);
      if (ringLabelRef.current)
        ringLabelRef.current.style.opacity = String(1 - amount);
      const nearest = clamp(Math.round(position), 0, last);
      setActive((previous) => (previous === nearest ? previous : nearest));
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.height, count, last, reducedMotion]);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      const next = clamp(target.current + event.deltaY / WHEEL_UNITS, 0, count);
      if (next !== target.current) event.preventDefault();
      goTo(next);
      if (settling.current !== null) window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => goTo(Math.round(target.current)),
        140,
      );
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      if (settling.current !== null) window.clearTimeout(settling.current);
    };
  }, [count, goTo]);

  const moveBy = (amount: number) => {
    goTo(clamp(Math.round(target.current) + amount, 0, count));
  };

  return (
    <div className="works-wheel">
      <div
        ref={stageRef}
        className="works-wheel-stage"
        tabIndex={0}
        role="region"
        aria-label="Interactive selected projects"
        style={{ perspective: `${metrics.depth}px` }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            moveBy(1);
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            moveBy(-1);
          }
        }}
        onPointerDown={(event) => {
          dragY.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragY.current === null) return;
          const delta = dragY.current - event.clientY;
          target.current = clamp(target.current + delta / DRAG_UNITS, 0, count);
          dragY.current = event.clientY;
        }}
        onPointerUp={() => {
          dragY.current = null;
          goTo(Math.round(target.current));
        }}
        onPointerCancel={() => {
          dragY.current = null;
        }}
      >
        <div ref={wheelRef} className="works-wheel-ring">
          {projects.map((project, index) => (
            <a
              id={`work-project-${index}`}
              key={project.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="works-wheel-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title}, ${project.type}`}
              tabIndex={-1}
              style={{
                width: metrics.cardWidth,
                height: metrics.cardHeight,
                marginLeft: -metrics.cardWidth / 2,
                marginTop: -metrics.cardHeight / 2,
              }}
            >
              <div className={`works-wheel-face tone-${project.tone}`}>
                <span className="works-wheel-number">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.type.toUpperCase()}</span>
                </span>
                <span className="works-wheel-mark" aria-hidden="true">
                  {["↗", "◌", "∿", "R²", "▦", "◉"][index]}
                </span>
                <div className="works-wheel-card-copy">
                  <span>{project.type}</span>
                  <strong>{project.title}</strong>
                </div>
                <span className="works-wheel-metric">{project.metric}</span>
              </div>
            </a>
          ))}
        </div>
        <div
          ref={ringLabelRef}
          className="works-wheel-ring-label"
          aria-hidden="true"
        >
          Selected
          <br />
          work
        </div>
        <div ref={detailRef} className="works-wheel-detail" aria-live="polite">
          <span>{projects[active].type}</span>
          <h3>{projects[active].title}</h3>
          <p>{projects[active].description}</p>
          <a href={projects[active].href} target="_blank" rel="noreferrer">
            View project <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="works-wheel-controls">
        <button
          className="works-wheel-arrow"
          type="button"
          aria-label="Previous project"
          onClick={() => moveBy(-1)}
        >
          <ArrowLeft size={17} />
        </button>
        <div className="works-wheel-index" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.title}
              aria-label={`Show ${project.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index + 1)}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <button
          className="works-wheel-arrow"
          type="button"
          aria-label="Next project"
          onClick={() => moveBy(1)}
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
