"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ExperienceEffects() {
  return (
    <>
      <IntroSplash />
      <CursorEffects />
      <SectionOverlap />
    </>
  );
}

function IntroSplash() {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("portfolio-intro-seen") === "1";
    } catch {
      seen = false;
    }

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const dismissTimeout = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(dismissTimeout);
    }

    const dismiss = () => {
      try {
        sessionStorage.setItem("portfolio-intro-seen", "1");
      } catch {
        // The intro still dismisses when session storage is unavailable.
      }
      setVisible(false);
    };

    const timeout = window.setTimeout(dismiss, 2400);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#0e1116] text-white"
          initial={{ y: "0%" }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          aria-label={t("loading")}
          role="status"
        >
          <svg
            className="pointer-events-none absolute inset-0 size-full opacity-80"
            aria-hidden="true"
          >
            <defs>
              <pattern id="intro-network-pattern" width="96" height="96" patternUnits="userSpaceOnUse">
                <g transform="translate(24 24) scale(.7) translate(-32 -32)">
                  <polyline points="25,19 11,32 25,45" fill="none" stroke="white" strokeOpacity=".1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M40 32L53 19M40 32L53 45" stroke="#2dd4bf" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="40" cy="32" r="4.5" fill="#2dd4bf" fillOpacity=".35" />
                  <circle cx="53" cy="19" r="3.5" fill="#2dd4bf" fillOpacity=".35" />
                  <circle cx="53" cy="45" r="3.5" fill="#2dd4bf" fillOpacity=".35" />
                </g>
                <g transform="translate(72 72) scale(.7) translate(-32 -32)">
                  <polyline points="25,19 11,32 25,45" fill="none" stroke="white" strokeOpacity=".1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M40 32L53 19M40 32L53 45" stroke="#2dd4bf" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="40" cy="32" r="4.5" fill="#2dd4bf" fillOpacity=".35" />
                  <circle cx="53" cy="19" r="3.5" fill="#2dd4bf" fillOpacity=".35" />
                  <circle cx="53" cy="45" r="3.5" fill="#2dd4bf" fillOpacity=".35" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#intro-network-pattern)" />
          </svg>
          <div className="relative flex flex-col items-center gap-6 px-6 text-center">
            <motion.svg
              className="size-[120px]"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
              <rect
                width="64"
                height="64"
                rx="16"
                fill="#0e1116"
                stroke="#2dd4bf"
                strokeOpacity=".35"
              />
              <motion.polyline
                points="25,19 11,32 25,45"
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <motion.path
                d="M40 32L53 19M40 32L53 45"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
              />
              {[
                { cx: 40, cy: 32, r: 4.5 },
                { cx: 53, cy: 19, r: 3.5 },
                { cx: 53, cy: 45, r: 3.5 },
              ].map((node, index) => (
                <motion.circle
                  key={node.cy}
                  {...node}
                  fill="#2dd4bf"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.45, type: "spring" }}
                />
              ))}
            </motion.svg>

            <div className=" text-[clamp(36px,7vw,56px)] leading-none font-semibold">
              <motion.span
                className="mr-2 inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                Ayman
              </motion.span>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.02, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                Fahd
              </motion.span>
            </div>

            <motion.p
              className="m-0 text-[13px] font-medium tracking-[.28em] text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              SOFTWARE ENGINEER
            </motion.p>

            <div className="h-0.5 w-[min(200px,60vw)] overflow-hidden rounded-full bg-[#242b35]">
              <motion.span
                className="block h-full origin-left bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1.8, ease: "easeOut" }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 min-h-11 -translate-x-1/2 rounded-full border border-[#2b323d] bg-transparent px-5 text-sm font-medium text-[#9ca3af] transition-colors hover:border-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CursorEffects() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 300, damping: 24 });
  const ringY = useSpring(pointerY, { stiffness: 300, damping: 24 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("cur");

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX.set(event.clientX - 4);
      pointerY.set(event.clientY - 4);
      setVisible(true);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      setHovering(
        target instanceof Element &&
          Boolean(target.closest("a, button, [role='button'], [data-cursor-hover]")),
      );
    };

    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);
    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerenter", onPointerEnter);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      root.classList.remove("cur");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerenter", onPointerEnter);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <>
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[250] size-2 rounded-full bg-primary shadow-[0_0_0_1.5px_#0e1116] ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ x: pointerX, y: pointerY }}
      />
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[250] size-10 rounded-full border-[1.5px] border-primary transition-colors duration-200 ${visible ? "opacity-100" : "opacity-0"} ${hovering ? "bg-primary/20" : "bg-transparent"}`}
        style={{ x: ringX, y: ringY, translateX: -16, translateY: -16, scale: pressed ? 0.75 : hovering ? 1.7 : 1 }}
      />
    </>
  );
}

function SectionOverlap() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-stack]"),
    );
    const header = document.querySelector<HTMLElement>("header");
    const storyStage = document.querySelector<HTMLElement>("[data-story-stage]");

    if (sections.length === 0) return;

    root.classList.add("motion-ready");

    const layout = () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const headerOffset = mobile ? 0 : header?.getBoundingClientRect().height ?? 0;
      storyStage?.style.setProperty("--stack-top", `${headerOffset}px`);

      sections.forEach((section, index) => {
        section.style.zIndex = String(index + 1);

        if (section.dataset.scrollStack === "pin") {
          section.style.top = `${Math.max(0, Math.min(headerOffset, window.innerHeight - section.offsetHeight))}px`;
        }
      });
    };

    layout();
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);

    const observer = new ResizeObserver(layout);
    sections.forEach((section) => observer.observe(section));
    if (header) observer.observe(header);
    if (storyStage) observer.observe(storyStage);

    return () => {
      root.classList.remove("motion-ready");
      window.removeEventListener("resize", layout);
      window.removeEventListener("load", layout);
      observer.disconnect();
    };
  }, []);

  return null;
}
