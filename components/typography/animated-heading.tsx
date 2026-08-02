"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import type { PolymorphicProps } from "@/components/shared";

type AnimatedHeadingProps<TElement extends ElementType> =
  PolymorphicProps<TElement> & {
    delay?: number;
  };

export function AnimatedHeading<TElement extends ElementType = "h2">({
  as,
  children,
  className,
  delay = 0,
  ...props
}: AnimatedHeadingProps<TElement>) {
  const Component = motion.create((as ?? "h2") as ElementType);

  return (
    <Component
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "font-display text-3xl leading-tight tracking-normal text-balance sm:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

