"use client";

import { createTimeline, splitText, stagger, type Target } from "animejs";
import { useEffect, useRef } from "react";

export function SplitTextReveal({ text }: { text: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (
      !paragraph ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const split = splitText(paragraph, {
      words: { wrap: "clip" },
      chars: true,
    });
    const timeline = createTimeline({
      autoplay: false,
      loop: false,
      defaults: { ease: "inOut(3)", duration: 650 },
    })
      .add(
        split.words,
        {
          y: (element: Target) =>
            Number((element as HTMLElement).dataset.line) % 2
              ? "100%"
              : "-100%",
        },
        stagger(125),
      )
      .add(
        split.chars,
        {
          y: (element: Target) =>
            Number((element as HTMLElement).dataset.line) % 2
              ? "100%"
              : "-100%",
        },
        stagger(10, { from: "random" }),
      );

    timeline.init().play();
    return () => {
      timeline.cancel();
      split.revert();
    };
  }, []);

  return (
    <p ref={paragraphRef} className="glyph-portal-home-subtitle">
      {text}
    </p>
  );
}
