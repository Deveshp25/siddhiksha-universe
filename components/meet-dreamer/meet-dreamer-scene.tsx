"use client";

import Image from "next/image";
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
} from "@/components";
import { getAsset } from "@/lib/assets";
import { cn } from "@/lib/cn";

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
} as const;

const writingMoment = getAsset("writing-moment");
const formalPortrait = getAsset("formal-portrait");

function VisualComposition() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto aspect-[4/5] w-full max-w-md"
    >
      <div className="absolute inset-0 rounded-[2rem] border border-foreground/10 bg-background/58 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-xl dark:bg-white/[0.04] dark:shadow-[0_30px_90px_rgba(0,0,0,0.36)]" />
      <div className="absolute inset-5 overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.64),rgba(255,255,255,0.18))] shadow-inner dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
        <Image
          src={writingMoment.jpg}
          alt="Siddhiksha Patel writing in a notebook."
          fill
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-cover object-[52%_38%]"
          placeholder="blur"
          blurDataURL={writingMoment.blur}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(0,0,0,0.36)_100%),radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.28),transparent_34%)]" />
      </div>
      <motion.div
        className="absolute -left-8 top-14 size-36 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.26),transparent_70%)] blur-2xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-10 bottom-20 size-44 rounded-full bg-[radial-gradient(circle,rgba(154,133,255,0.18),transparent_68%)] blur-2xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -20, 0], opacity: [0.36, 0.62, 0.36] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-10 left-8 right-8 overflow-hidden rounded-[1.25rem] border border-white/20 bg-white/38 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-white/30">
            <Image
              src={formalPortrait.jpg}
              alt=""
              fill
              sizes="4rem"
              className="object-cover object-top"
              placeholder="blur"
              blurDataURL={formalPortrait.blur}
            />
          </div>
          <div>
            <div className="h-px w-16 bg-foreground/22" />
            <p className="mt-3 font-display text-2xl leading-none text-foreground">
              Young Author
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-foreground/54">
              Storyteller
            </p>
          </div>
        </div>
      </div>
      {Array.from({ length: 12 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute size-1 rounded-full bg-foreground/28 shadow-[0_0_18px_currentColor] dark:bg-white/36"
          style={{
            left: `${16 + ((index * 23) % 68)}%`,
            top: `${12 + ((index * 31) % 72)}%`,
          }}
          animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], opacity: [0.14, 0.46, 0.14] }}
          transition={{
            duration: 6 + (index % 4),
            delay: index * 0.22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export function MeetDreamerScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 36, prefersReducedMotion ? 0 : -36],
  );

  return (
    <Section id="about" spacing="xl" className={cn("relative isolate overflow-hidden", className)}>
      <GradientGlow className="opacity-60" />
      <NoiseOverlay />
      <div ref={ref}>
        <Container className="relative z-10 grid min-h-screen items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Stack gap="lg" className="max-w-3xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ ...revealTransition, delay: 0.05 }}
            className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-foreground/54"
          >
            Meet the Dreamer
          </motion.p>
          <DisplayXL>
            <motion.span
              className="block"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ ...revealTransition, delay: 0.18 }}
            >
              Every Story Begins
            </motion.span>
            <motion.span
              className="block"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ ...revealTransition, delay: 0.34 }}
            >
              With A Dream.
            </motion.span>
          </DisplayXL>
          <AnimatedDivider className="max-w-56" />
          <Stack gap="sm" className="max-w-2xl text-lg leading-8 text-foreground/70">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ ...revealTransition, delay: 0.48 }}
            >
              Siddhiksha moves through creative worlds with the wonder of someone
              still listening for the first spark.
            </motion.p>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ ...revealTransition, delay: 0.62 }}
            >
              Writing came first, opening the door to characters, emotions, and
              quiet universes waiting to be named. Music followed like a second
              language, carrying the same imagination into melody, voice, and song.
            </motion.p>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ ...revealTransition, delay: 0.76 }}
            >
              Author, storyteller, songwriter, and emerging singer, each expression
              begins from one inner place: a dream becoming brave enough to be heard.
            </motion.p>
          </Stack>
          </Stack>
          <motion.div style={{ y: visualY }} className="relative">
            <VisualComposition />
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
