"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import {
  AnimatedDivider,
  Container,
  DisplayXL,
  GradientGlow,
  NoiseOverlay,
  Section,
  Stack,
  Tag,
} from "@/components";
import { getAsset, type SiteAssetKey } from "@/lib/assets";
import { cn } from "@/lib/cn";

type BookShowcaseCardProps = {
  title: string;
  description: string;
  genre: string;
  imageKey: SiteAssetKey;
  imageAlt: string;
  amazonUrl: string;
  amazonLabel: string;
  className?: string;
  coverTone: "amber" | "blue";
};

const books: BookShowcaseCardProps[] = [
  {
    title: "Whispers of Elvoria",
    description:
      "A golden fantasy of ancient gods, Indian mythology, friendship, destiny, and hidden power.",
    genre: "Mythic Fantasy",
    imageKey: "whispers-of-elvoria-cover",
    imageAlt: "Book cover for Whispers of Elvoria by Siddhiksha Patel.",
    amazonUrl: "https://link.amazon/B04itBUzw",
    amazonLabel: "Read Whispers of Elvoria on Amazon",
    coverTone: "amber",
  },
  {
    title: "Shadows Beneath: Whispers of the Forgotten",
    description:
      "A dark-academia mystery of boarding school secrets, underground tunnels, ancient evil, and dark magic.",
    genre: "Mystery Fantasy",
    imageKey: "shadows-beneath-cover",
    imageAlt: "Book cover for Shadows Beneath: Whispers of the Forgotten by Siddhiksha Patel.",
    amazonUrl: "https://link.amazon/B0bemSyUE",
    amazonLabel: "Read Shadows Beneath: Whispers of the Forgotten on Amazon",
    coverTone: "blue",
  },
];

const coverAtmosphere: Record<BookShowcaseCardProps["coverTone"], string> = {
  amber: "bg-[radial-gradient(circle_at_50%_18%,rgba(255,235,176,0.30),transparent_34%),linear-gradient(145deg,rgba(118,79,28,0.18),rgba(214,178,91,0.10)_48%,rgba(57,34,18,0.24))]",
  blue: "bg-[radial-gradient(circle_at_50%_18%,rgba(116,202,229,0.22),transparent_34%),linear-gradient(145deg,rgba(13,22,38,0.24),rgba(50,92,128,0.14)_48%,rgba(5,8,15,0.32))]",
};

const coverGlow: Record<BookShowcaseCardProps["coverTone"], string> = {
  amber: "bg-[radial-gradient(circle,rgba(214,178,91,0.26),transparent_68%)]",
  blue: "bg-[radial-gradient(circle,rgba(94,188,224,0.22),transparent_68%)]",
};

const cardOffsets = [
  "lg:translate-y-12",
  "lg:-translate-y-10",
];

function BookCover({
  coverTone,
  imageKey,
  imageAlt,
}: {
  coverTone: BookShowcaseCardProps["coverTone"];
  imageKey: SiteAssetKey;
  imageAlt: string;
}) {
  const asset = getAsset(imageKey);

  return (
    <div
      className={cn(
        "relative aspect-[3/4.88] overflow-hidden rounded-[1rem] border border-white/20 shadow-[18px_24px_54px_rgba(0,0,0,0.22)]",
        coverAtmosphere[coverTone],
      )}
    >
      <Image
        src={asset.jpg}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 23vw, (min-width: 640px) 40vw, 80vw"
        className="object-cover transition duration-1000 ease-out group-hover:scale-[1.035]"
        placeholder="blur"
        blurDataURL={asset.blur}
      />
      <div className="absolute inset-y-0 left-0 w-7 bg-black/22" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.22)_42%,transparent_58%)] opacity-0 transition duration-700 group-hover:opacity-60" />
      <div className="absolute inset-0 rounded-[1rem] ring-1 ring-inset ring-white/18" />
    </div>
  );
}

export function BookShowcaseCard({
  title,
  description,
  genre,
  coverTone,
  imageKey,
  imageAlt,
  amazonUrl,
  amazonLabel,
  className,
}: BookShowcaseCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -10, rotateX: 1.4, rotateY: -2.2, scale: 1.018 }
      }
      transition={{ type: "spring", stiffness: 150, damping: 24, mass: 0.7 }}
      className={cn("group relative transform-gpu will-change-transform [transform-style:preserve-3d]", className)}
      data-cursor="card"
    >
      <div className={cn("absolute -inset-6 rounded-[2rem] opacity-0 blur-2xl transition duration-700 group-hover:opacity-100", coverGlow[coverTone])} />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-background/62 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-700 group-hover:border-foreground/18 group-hover:shadow-[0_36px_96px_rgba(0,0,0,0.20)] dark:bg-white/[0.045] dark:shadow-[0_28px_80px_rgba(0,0,0,0.36)]">
        <div className="pointer-events-none absolute inset-y-6 left-6 w-px bg-white/16 opacity-0 transition duration-700 group-hover:opacity-100" />
        <BookCover coverTone={coverTone} imageKey={imageKey} imageAlt={imageAlt} />
        <Stack gap="sm" className="p-3 pt-6">
          <Tag className="w-fit border-foreground/14 bg-foreground/[0.03]">
            {genre}
          </Tag>
          <h3 className="font-display text-3xl leading-tight text-foreground text-balance">
            {title}
          </h3>
          <p className="min-h-20 text-sm leading-6 text-foreground/64">
            {description}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-full text-sm font-medium text-foreground transition duration-500 group-hover:gap-3"
            >
              Explore World
              <ArrowRight className="size-4 transition duration-500 group-hover:translate-x-1" />
            </button>
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={amazonLabel}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/12 bg-background/58 px-4 py-2 text-sm font-medium text-foreground/74 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-xl transition duration-500 ease-[var(--ease-luxury)] hover:-translate-y-1 hover:border-[rgba(214,178,91,0.36)] hover:text-foreground hover:shadow-[0_18px_48px_rgba(214,178,91,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white/[0.04]"
              data-cursor="button"
            >
              Read on Amazon
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Stack>
      </div>
    </motion.article>
  );
}

function LibraryAtmosphere() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <GradientGlow className="opacity-70" />
      <NoiseOverlay />
      <motion.div
        className="absolute left-10 top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.16),transparent_68%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 34, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.20),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(154,133,255,0.10),transparent_68%)]"
        animate={prefersReducedMotion ? undefined : { x: [0, -26, 0], y: [0, 22, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export function WorldsScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardsY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 42, prefersReducedMotion ? 0 : -48],
  );

  return (
    <Section id="books" spacing="xl" className={cn("relative isolate overflow-hidden", className)}>
      <LibraryAtmosphere />
      <div ref={ref}>
        <Container className="relative z-10">
          <div className="grid items-start gap-16 lg:grid-cols-[0.78fr_1.22fr]">
            <Stack gap="lg" className="max-w-xl lg:sticky lg:top-24">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-foreground/54"
              >
                The Worlds
              </motion.p>
              <DisplayXL>Worlds Waiting To Be Opened.</DisplayXL>
              <AnimatedDivider className="max-w-48" />
              <p className="text-lg leading-8 text-foreground/68">
                Every book begins as a whisper of imagination before becoming a
                world someone else can live inside.
              </p>
            </Stack>
            <motion.div
              style={{ y: cardsY }}
              className="grid max-w-4xl gap-8 sm:grid-cols-2 lg:gap-8"
            >
              {books.map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cardOffsets[index]}
                >
                  <BookShowcaseCard {...book} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
