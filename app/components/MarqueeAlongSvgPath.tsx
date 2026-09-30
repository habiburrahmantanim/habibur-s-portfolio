"use client";

import React, { useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeAlongSvgPathProps {
  children: React.ReactNode;
  path: string;
  className?: string;
  pathId?: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
  showPath?: boolean;
  baseVelocity?: number;
  direction?: "normal" | "reverse";
  slowdownOnHover?: boolean;
  slowDownFactor?: number;
  repeat?: number;
  centerTiles?: boolean;
  randomize?: boolean;
  enableRollingZIndex?: boolean;
}

const wrap = (value: number) => ((value % 100) + 100) % 100;

function MarqueeItem({
  children,
  index,
  totalItems,
  baseOffset,
  path,
  centerTiles,
}: {
  children: React.ReactNode;
  index: number;
  totalItems: number;
  baseOffset: MotionValue<number>;
  path: string;
  centerTiles: boolean;
}) {
  const offsetDistance = useTransform(
    baseOffset,
    (value) => `${wrap(value + (index * 100) / totalItems)}%`,
  );

  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance,
        offsetRotate: "0deg",
        transform: centerTiles ? "translate(-50%, -50%)" : undefined,
        transformOrigin: "center center",
        willChange: "offset-distance",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function MarqueeAlongSvgPath({
  children,
  path,
  className,
  pathId,
  viewBox = "0 0 100 70",
  width = "100%",
  height = "100%",
  showPath = false,
  baseVelocity = 3,
  direction = "normal",
  slowdownOnHover = true,
  slowDownFactor = 0.2,
  repeat = 2,
  centerTiles = true,
}: MarqueeAlongSvgPathProps) {
  const baseOffset = useMotionValue(0);
  const hoverFactor = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactor, {
    damping: 50,
    stiffness: 400,
  });
  const childItems = useMemo(
    () => React.Children.toArray(children),
    [children],
  );
  const items = useMemo(
    () =>
      Array.from({ length: Math.max(0, repeat) }, (_, repeatIndex) =>
        childItems.map((child) => ({ child, repeatIndex })),
      ).flat(),
    [childItems, repeat],
  );

  useAnimationFrame((_, delta) => {
    const directionFactor = direction === "normal" ? 1 : -1;
    baseOffset.set(
      baseOffset.get() +
        directionFactor *
          baseVelocity *
          (delta / 1000) *
          smoothHoverFactor.get(),
    );
  });

  const id = pathId ?? "marquee-along-svg-path";

  return (
    <div
      className={cn("relative h-full w-full", className)}
      onMouseEnter={() => hoverFactor.set(slowdownOnHover ? slowDownFactor : 1)}
      onMouseLeave={() => hoverFactor.set(1)}
    >
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          id={id}
          d={path}
          fill="none"
          stroke={showPath ? "currentColor" : "none"}
          strokeWidth={showPath ? "1.2" : undefined}
          strokeDasharray={showPath ? "3 10" : undefined}
          strokeLinecap="round"
          opacity={showPath ? 0.35 : undefined}
        />
      </svg>
      {items.map(({ child, repeatIndex }, index) => (
        <MarqueeItem
          key={`${repeatIndex}-${index}`}
          index={index}
          totalItems={items.length}
          baseOffset={baseOffset}
          path={path}
          centerTiles={centerTiles}
        >
          {child}
        </MarqueeItem>
      ))}
    </div>
  );
}
