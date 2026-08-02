"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function AnimatedDivider({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("h-px origin-left bg-foreground/16", className)}
      {...props}
    />
  );
}

export function GradientGlow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.34),transparent_38%),linear-gradient(135deg,rgba(212,175,55,0.12),transparent_42%,rgba(255,255,255,0.08))] opacity-80 dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_38%),linear-gradient(135deg,rgba(212,175,55,0.12),transparent_42%,rgba(255,255,255,0.05))]",
        className,
      )}
      {...props}
    />
  );
}

export function NoiseOverlay({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:12px_12px]",
        className,
      )}
      {...props}
    />
  );
}

export function PaperTexture({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40 dark:opacity-15",
        className,
      )}
      {...props}
    />
  );
}

export function FloatingOrb({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -16, 0], opacity: [0.28, 0.42, 0.28] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none absolute size-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_68%)] blur-xl",
        className,
      )}
      {...props}
    />
  );
}

export function CursorGlow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-1/2 top-1/2 z-50 hidden size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/6 blur-3xl lg:block",
        className,
      )}
      {...props}
    />
  );
}
