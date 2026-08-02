"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type CursorState = "default" | "hover" | "button" | "card" | "gallery" | "interactive";

const cursorStyles: Record<CursorState, string> = {
  default: "size-5 border-foreground/24 bg-foreground/[0.035]",
  hover: "size-8 border-[rgba(214,178,91,0.42)] bg-[rgba(214,178,91,0.075)]",
  button: "size-10 border-[rgba(214,178,91,0.42)] bg-[rgba(214,178,91,0.08)]",
  card: "size-12 border-[rgba(214,178,91,0.34)] bg-[rgba(214,178,91,0.095)]",
  gallery: "size-14 border-white/48 bg-white/12 mix-blend-difference",
  interactive: "size-9 border-foreground/34 bg-foreground/[0.065]",
};

function getCursorState(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) {
    return "default";
  }

  if (target.closest("[data-cursor='gallery']")) {
    return "gallery";
  }

  if (target.closest("[data-cursor='card'], article")) {
    return "card";
  }

  if (target.closest("button, [role='button']")) {
    return "button";
  }

  if (target.closest("a, input, textarea, select, summary")) {
    return "interactive";
  }

  if (target.closest("[data-cursor='hover']")) {
    return "hover";
  }

  return "default";
}

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 520, damping: 42, mass: 0.2 });
  const y = useSpring(cursorY, { stiffness: 520, damping: 42, mass: 0.2 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsEnabled(canHover);

    if (!canHover) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setCursorState(getCursorState(event.target));
    }

    function handlePointerLeave() {
      cursorX.set(-100);
      cursorY.set(-100);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[89] size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.12),transparent_68%)] opacity-70 blur-xl"
        style={{ x, y, willChange: "transform" }}
      />
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-80 shadow-[0_0_28px_rgba(214,178,91,0.18)] backdrop-blur-sm transition-[width,height,border-color,background-color] duration-300",
          cursorStyles[cursorState],
        )}
        style={{ x, y, willChange: "transform" }}
      />
    </>
  );
}
