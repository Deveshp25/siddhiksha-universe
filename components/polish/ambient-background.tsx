"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 41) % 92)}%`,
  top: `${6 + ((index * 29) % 86)}%`,
  delay: index * 0.21,
}));

export function AmbientBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.018] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:10px_10px]"
        animate={prefersReducedMotion ? undefined : { backgroundPosition: ["0px 0px", "18px 12px", "0px 0px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.10),transparent_68%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 32, -18, 0], opacity: [0.45, 0.72, 0.48, 0.45] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(154,133,255,0.08),transparent_68%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -34, 0], opacity: [0.38, 0.62, 0.38] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute size-1 rounded-full bg-foreground/10 shadow-[0_0_14px_currentColor] dark:bg-white/14"
          style={{ left: particle.left, top: particle.top }}
          animate={prefersReducedMotion ? undefined : { y: [0, -16, 0], opacity: [0.04, 0.16, 0.04] }}
          transition={{
            duration: 9 + (particle.id % 6),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
