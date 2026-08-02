"use client";

import dynamic from "next/dynamic";
import { Camera, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

import {
  AnimatedDivider,
  Container,
  DisplayXL,
  GradientGlow,
  NoiseOverlay,
  PaperTexture,
  Section,
  Stack,
  Tag,
} from "@/components";
import { cn } from "@/lib/cn";

import { GalleryCard } from "./gallery-card";
import { galleryItems, type GalleryItem } from "./gallery-data";

const Lightbox = dynamic(() => import("./lightbox").then((module) => module.Lightbox), {
  ssr: false,
});

type GalleryProps = {
  items?: GalleryItem[];
  className?: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
  onSelect: (index: number) => void;
};

type GalleryFiltersProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

const masonryOffsets = [
  "lg:mt-20",
  "lg:mt-0",
  "lg:mt-32",
  "lg:mt-8",
  "lg:-mt-10",
];

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();
  const particles = Array.from({ length: 18 }, (_, index) => ({
    id: index,
    left: `${8 + ((index * 29) % 84)}%`,
    top: `${10 + ((index * 37) % 78)}%`,
    delay: index * 0.18,
  }));

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute size-1 rounded-full bg-foreground/24 shadow-[0_0_18px_currentColor] dark:bg-white/30"
          style={{ left: particle.left, top: particle.top }}
          animate={prefersReducedMotion ? undefined : { y: [0, -16, 0], opacity: [0.14, 0.42, 0.14] }}
          transition={{
            duration: 7 + (particle.id % 5),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GalleryFilters({
  categories,
  activeCategory,
  onChange,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3" aria-label="Gallery categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            activeCategory === category
              ? "border-foreground bg-foreground text-background"
              : "border-foreground/14 bg-background/56 text-foreground/60 hover:border-foreground/28 hover:text-foreground",
          )}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          index={index}
          onSelect={onSelect}
          className={masonryOffsets[index % masonryOffsets.length]}
        />
      ))}
    </div>
  );
}

export function Gallery({ items = galleryItems, className }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 44, prefersReducedMotion ? 0 : -38],
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );
  const activeItem = activeIndex === null ? null : visibleItems[activeIndex];

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    });
  }, [visibleItems.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % visibleItems.length;
    });
  }, [visibleItems.length]);

  return (
    <Section id="gallery" spacing="xl" className={cn("relative isolate overflow-hidden", className)}>
      <GradientGlow className="opacity-70" />
      <NoiseOverlay />
      <PaperTexture />
      <FloatingParticles />
      <motion.div
        aria-hidden="true"
        style={{ y: parallaxY }}
        className="absolute -right-24 top-44 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.14),transparent_68%)] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: parallaxY }}
        className="absolute -left-28 bottom-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(154,133,255,0.11),transparent_68%)] blur-3xl"
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
      <div ref={sectionRef}>
        <Container className="relative z-10">
          <Stack gap="xl">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-foreground/54"
                >
                  Media Gallery
                </motion.p>
                <DisplayXL className="mt-5">Moments Behind The Stories</DisplayXL>
                <AnimatedDivider className="mt-8 max-w-56" />
              </div>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl justify-self-start lg:justify-self-end"
              >
                <p className="text-lg leading-8 text-foreground/68">
                  Every photograph captures a chapter.
                  <br />
                  Every memory inspires another story.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Tag className="border-foreground/14 bg-background/58">
                    <Camera aria-hidden="true" className="mr-2 size-3.5" />
                    Scrapbook
                  </Tag>
                  <Tag className="border-foreground/14 bg-background/58">
                    <Sparkles aria-hidden="true" className="mr-2 size-3.5" />
                    Creative Memory
                  </Tag>
                </div>
              </motion.div>
            </div>
            <GalleryFilters
              categories={categories}
              activeCategory={activeCategory}
              onChange={(category) => {
                setActiveCategory(category);
                setActiveIndex(null);
              }}
            />
            <GalleryGrid items={visibleItems} onSelect={handleSelect} />
          </Stack>
        </Container>
      </div>
      {activeItem ? (
        <Lightbox
          items={visibleItems}
          activeIndex={activeIndex}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      ) : null}
    </Section>
  );
}
