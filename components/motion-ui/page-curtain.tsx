"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";

type UsePageCurtainOptions = { titles: string[] };

export function usePageCurtain({ titles }: UsePageCurtainOptions) {
  const [page, setPage] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  });

  const go = (nextPage: number) => {
    if (
      isPending ||
      nextPage === page ||
      nextPage < 0 ||
      nextPage >= titles.length
    ) {
      return;
    }
    setIsPending(true);
    setPage(nextPage);
    timeout.current = setTimeout(() => setIsPending(false), 620);
  };

  const ref = useRef<HTMLDivElement>(null);
  return { page, isPending, go, ref };
}

type PageCurtainStageProps = {
  page: number;
  isPending: boolean;
  announce?: string;
  children: ReactNode;
};

export const PageCurtainStage = forwardRef<
  HTMLDivElement,
  PageCurtainStageProps
>(function PageCurtainStage({ page, isPending, announce, children }, ref) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`page-curtain-stage${isPending ? " is-pending" : ""}`}
      aria-live="polite"
      aria-label={announce}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="page-curtain-page"
          key={page}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)", opacity: 0.4, y: 20 }
          }
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { clipPath: "inset(100% 0 0% 0)", opacity: 0, y: -12 }
          }
          transition={{
            duration: reducedMotion ? 0.12 : 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export function PageCurtainContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`page-curtain-content ${className}`.trim()}>{children}</div>
  );
}

export function PageCurtainTabs({
  labels,
  active,
  isPending,
  onSelect,
}: {
  labels: string[];
  active: number;
  isPending: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="page-curtain-tabs"
      role="tablist"
      aria-label="Journey chapters"
    >
      {labels.map((label, index) => (
        <button
          type="button"
          role="tab"
          id={`journey-tab-${index}`}
          aria-selected={active === index}
          aria-controls="journey-page"
          tabIndex={active === index ? 0 : -1}
          disabled={isPending}
          key={label}
          onClick={() => onSelect(index)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            const direction = event.key === "ArrowRight" ? 1 : -1;
            const next = (active + direction + labels.length) % labels.length;
            onSelect(next);
            document.getElementById(`journey-tab-${next}`)?.focus();
          }}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
