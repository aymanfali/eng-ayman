"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

type SkillsMarqueeProps = {
  reduceMotion: boolean;
};

// Data
const skills = [
  "AI INTEGRATION",
  "FRONTEND ENGINEERING",
  "DESIGN SYSTEMS",
  "ACCESSIBLE INTERFACES",
  "TECHNICAL CONSULTING",
];

const words = ["Production", "software,", "built", "to", "last."];

// Animation
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

// Hero
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const networkY = useTransform(progress, [0, 1], [0, -80]);
  const magneticX = useSpring(0, { stiffness: 300, damping: 15 });
  const magneticY = useSpring(0, { stiffness: 300, damping: 15 });
  const reduce = !!reduceMotion;

  return (
    <>
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <g id="network-mark">
            <polyline
              points="25,19 11,32 25,45"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".1"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M40 32L53 19M40 32L53 45"
              stroke="#2DD4BF"
              strokeOpacity=".4"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle cx="40" cy="32" r="4.5" fill="#2DD4BF" fillOpacity=".4" />
            <circle cx="53" cy="19" r="3.5" fill="#2DD4BF" fillOpacity=".4" />
            <circle cx="53" cy="45" r="3.5" fill="#2DD4BF" fillOpacity=".4" />
          </g>

          <pattern
            id="background-pattern"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            <use
              href="#network-mark"
              transform="translate(24 24) scale(.7) translate(-32 -32)"
            />
            <use
              href="#network-mark"
              transform="translate(72 72) scale(.7) translate(-32 -32)"
            />
          </pattern>
        </defs>
      </svg>

      <section
        ref={heroRef}
        data-scroll-stack="hero"
        className="relative overflow-hidden pt-32 pb-28 max-[760px]:pt-20 max-[760px]:pb-18"
      >
        {/* Background */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 h-[calc(100%+96px)] w-[calc(100%+96px)] [-webkit-mask-image:linear-gradient(180deg,#000_45%,transparent_95%)] [mask-image:linear-gradient(180deg,#000_45%,transparent_95%)]"
          style={reduceMotion ? undefined : { y: networkY }}
          animate={reduceMotion ? undefined : { x: [0, -96] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        >
          <svg className="block h-full w-full">
            <rect width="100%" height="100%" fill="url(#background-pattern)" />
          </svg>
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative mx-auto max-w-280 px-6"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <div className="flex items-center justify-between gap-8">
            <div className="relative max-w-170">
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 text-sm font-medium tracking-[.28em] text-ink before:h-0.75 before:w-7 before:rounded-sm before:bg-teal before:content-[''] dark:text-teal"
              >
                SOFTWARE ENGINEER
              </motion.div>

              <h1
                className="my-6 font-head text-[clamp(44px,8vw,88px)] font-semibold leading-[1.02] tracking-[-.035em]"
                aria-label="Production software, built to last."
              >
                {words.map((word, index) => (
                  <span
                    key={index}
                    className="mr-[.22em] inline-block overflow-hidden pb-[.08em] align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.08 + 0.1,
                        duration: 0.8,
                        ease,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                variants={fadeUp}
                className="mb-9 max-w-135 text-xl text-muted-foreground"
              >
                I design, build and ship reliable web software, from the first
                commit to a stable release and beyond.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#work"
                  style={reduce ? undefined : { x: magneticX, y: magneticY }}
                  onPointerMove={(event) => {
                    if (reduce || event.pointerType === "touch") return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    magneticX.set(
                      (event.clientX - bounds.left - bounds.width / 2) * 0.2,
                    );
                    magneticY.set(
                      (event.clientY - bounds.top - bounds.height / 2) * 0.3,
                    );
                  }}
                  onPointerLeave={() => {
                    magneticX.set(0);
                    magneticY.set(0);
                  }}
                  whileHover={reduce ? undefined : { y: -3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  className="inline-flex min-h-12 items-center rounded-xl bg-ink px-6.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal bg-primary dark:text-secondary"
                >
                  View selected work
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  className="inline-flex min-h-12 items-center rounded-xl border border-line px-6.5 font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal dark:border-dark-line dark:text-dark-ink"
                >
                  Start a project
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              className="relative hidden shrink-0 md:block"
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              animate={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, x: 0, y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }
              }
              transition={{
                delay: 0.5,
                duration: 0.7,
                ease,
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="relative flex h-[360px] w-[280px] items-center justify-center rounded-[2rem] border border-line/80 bg-white/5 shadow-[0_20px_60px_rgba(11,18,32,0.18)] backdrop-blur-sm dark:border-dark-line/80">
                <div className="absolute inset-4 rounded-[1.5rem] border border-teal/20 bg-teal/5" />
                <Image
                  src="/ayman.svg"
                  alt="Ayman"
                  width={240}
                  height={240}
                  priority
                  className="relative z-10 h-auto w-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <SkillsMarquee reduceMotion={!!reduceMotion} />
      </section>
    </>
  );
}

// Skills Marquee
function SkillsMarquee({ reduceMotion }: SkillsMarqueeProps) {
  return (
    <motion.div
      className="mt-18 overflow-hidden whitespace-nowrap border-y border-line mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] dark:border-dark-line"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      aria-label={skills.join(", ")}
    >
      <motion.div
        className="inline-flex w-max"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            aria-hidden="true"
            className="inline-flex items-center gap-7 px-3.5 py-4.5 text-sm font-medium tracking-[.2em] text-muted dark:text-dark-muted"
          >
            {skills.map((skill) => (
              <span key={skill} className="inline-flex items-center gap-7 text-primary">
                {skill}
                <i className="inline-block size-1.5 rounded-full bg-primary" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
