"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Tag } from "@/components";
import { focusRing } from "@/components/shared";
import { cn } from "@/lib/cn";

import type { GalleryItem } from "./gallery-data";

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  onSelect: (index: number) => void;
  className?: string;
};

const aspectClasses: Record<GalleryItem["aspect"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/11]",
  square: "aspect-square",
  feature: "aspect-[5/6] md:aspect-[7/6]",
};

export function GalleryCard({ item, index, onSelect, className }: GalleryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26, clipPath: "inset(12% 0% 0% 0% round 1.5rem)" }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.86, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn("break-inside-avoid", className)}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        className={cn(
          "group relative block w-full overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-background/62 text-left shadow-[0_24px_80px_rgba(0,0,0,0.12)] outline-none backdrop-blur-xl transition duration-700 ease-[var(--ease-luxury)] hover:-translate-y-2 hover:border-foreground/18 hover:shadow-[0_32px_96px_rgba(0,0,0,0.18)] dark:bg-white/[0.045]",
          focusRing,
        )}
        aria-label={`Open ${item.title}`}
        data-cursor="gallery"
      >
        <div className={cn("relative overflow-hidden", aspectClasses[item.aspect])}>
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-[1200ms] ease-[var(--ease-luxury)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
            placeholder="blur"
            blurDataURL={item.blurDataURL}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,0.62)_100%)] opacity-70 transition duration-700 group-hover:opacity-82 group-focus-visible:opacity-82" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.22),transparent_34%)] opacity-0 transition duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-white opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6">
            <p className="text-sm leading-6 text-white/76">{item.description}</p>
          </div>
        </div>
        <div className="relative flex items-start justify-between gap-4 p-5 sm:p-6">
          <div>
            <Tag className="border-foreground/14 bg-foreground/[0.03]">{item.category}</Tag>
            <h3 className="mt-4 font-display text-3xl leading-tight text-foreground text-balance">
              {item.title}
            </h3>
          </div>
          <span className="shrink-0 pt-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/44">
            {item.date}
          </span>
        </div>
      </button>
    </motion.article>
  );
}
