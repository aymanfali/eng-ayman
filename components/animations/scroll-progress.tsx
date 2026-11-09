"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = prefersReducedMotion ? scrollYProgress : springProgress;
  const markerPosition = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div
      id="bar"
      className="pointer-events-none fixed inset-x-1 top-0 z-[60] h-[3px] bg-foreground/15"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left bg-primary shadow-[0_0_10px_var(--primary)]"
        style={{ scaleX: progress }}
      />
      <motion.span
        className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background bg-primary shadow-[0_0_8px_var(--primary)]"
        style={{ left: markerPosition }}
      />
    </div>
  );
}
