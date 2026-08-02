"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { IconButton, Tag } from "@/components";
import { focusRing } from "@/components/shared";
import { cn } from "@/lib/cn";

import type { GalleryItem } from "./gallery-data";

type LightboxProps = {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

type LightboxNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function LightboxNavigation({ onPrevious, onNext }: LightboxNavigationProps) {
  return (
    <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between gap-4 sm:inset-x-8">
      <IconButton
        type="button"
        aria-label="Previous gallery moment"
        onClick={onPrevious}
        className="bg-background/70 backdrop-blur-xl"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </IconButton>
      <IconButton
        type="button"
        aria-label="Next gallery moment"
        onClick={onNext}
        className="bg-background/70 backdrop-blur-xl"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </IconButton>
    </div>
  );
}

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
          return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActiveElement?.focus();
    };
  }, [activeIndex, onClose, onNext, onPrevious]);

  return (
    <AnimatePresence>
      {activeItem ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} gallery preview`}
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/68 px-4 py-8 backdrop-blur-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(event) => {
            const touchStart = touchStartRef.current;
            const touch = event.changedTouches[0];
            touchStartRef.current = null;

            if (!touchStart) {
              return;
            }

            const deltaX = touch.clientX - touchStart.x;
            const deltaY = touch.clientY - touchStart.y;

            if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
              return;
            }

            if (deltaX < 0) {
              onNext();
            } else {
              onPrevious();
            }
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(214,178,91,0.18),transparent_40%)]" />
          <LightboxNavigation onPrevious={onPrevious} onNext={onNext} />
          <motion.div
            key={activeItem.id}
            className="relative z-10 grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-foreground/12 bg-background/82 shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl touch-pan-y dark:bg-[#0a0a0a]/86 lg:grid-cols-[1.12fr_0.88fr]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22, scale: 0.985, clipPath: "inset(3% round 2rem)" }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% round 2rem)" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.985, clipPath: "inset(3% round 2rem)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative min-h-[20rem] lg:min-h-[36rem]">
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={activeItem.blurDataURL}
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(0,0,0,0.30))]" />
            </div>
            <div className="relative flex flex-col justify-between gap-10 p-7 sm:p-9">
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close gallery preview"
                onClick={onClose}
                className={cn(
                  "absolute right-5 top-5 inline-flex size-12 items-center justify-center rounded-full border border-foreground/14 bg-background/74 text-foreground transition duration-300 hover:bg-foreground/8",
                  focusRing,
                )}
              >
                <X aria-hidden="true" className="size-5" />
              </button>
              <div className="pr-14">
                <Tag className="border-foreground/14 bg-foreground/[0.03]">
                  {activeItem.category}
                </Tag>
                <h3 className="mt-6 font-display text-4xl leading-tight text-foreground text-balance sm:text-5xl">
                  {activeItem.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-foreground/68">
                  {activeItem.description}
                </p>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/44">
                {activeItem.date}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
