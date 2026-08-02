"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SESSION_KEY = "siddhiksha-universe-loader-seen";

export function LoadingExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    setIsVisible(true);
    sessionStorage.setItem(SESSION_KEY, "true");

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, prefersReducedMotion ? 450 : 1400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          aria-label="Loading Siddhiksha Universe"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(214,178,91,0.18),transparent_36%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.30),transparent_28%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(214,178,91,0.16),transparent_36%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.08),transparent_28%)]" />
          <motion.div
            className="relative flex flex-col items-center gap-7 px-6 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="font-display text-4xl leading-none text-foreground text-balance sm:text-6xl"
              animate={prefersReducedMotion ? undefined : { textShadow: ["0 0 0 rgba(214,178,91,0)", "0 0 30px rgba(214,178,91,0.34)", "0 0 0 rgba(214,178,91,0)"] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              Siddhiksha Universe
            </motion.p>
            <div className="h-px w-56 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full origin-left bg-[rgba(214,178,91,0.82)] shadow-[0_0_18px_rgba(214,178,91,0.46)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.25 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
