"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  className?: string;
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (index) => index * 0.04,
  className = "",
}: TextRollProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(/(\s+)/);
  let characterIndex = 0;

  return (
    <span className={`text-roll ${className}`.trim()}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: {} }}
      >
        {words.map((word, wordIndex) => {
          if (/^\s+$/.test(word)) {
            return <span key={`space-${wordIndex}`}>{word}</span>;
          }

          return (
            <span className="text-roll-word" key={`${word}-${wordIndex}`}>
              {Array.from(word).map((character) => {
                const index = characterIndex++;
                return (
                  <span
                    className="text-roll-char"
                    key={`${character}-${index}`}
                  >
                    <motion.span
                      className="text-roll-char-motion"
                      variants={{
                        hidden: { y: "110%" },
                        visible: {
                          y: "0%",
                          transition: {
                            duration,
                            delay: getEnterDelay(index),
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      {character}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </span>
  );
}
