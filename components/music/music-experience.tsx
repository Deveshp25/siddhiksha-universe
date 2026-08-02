"use client";

import { Check, Clock3, Feather, Music2, PenLine, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import {
  AnimatedDivider,
  Badge,
  Container,
  DisplayXL,
  GradientGlow,
  NoiseOverlay,
  Section,
  Stack,
} from "@/components";
import { focusRing } from "@/components/shared";
import { cn } from "@/lib/cn";

type ProcessMilestone = {
  title: string;
  label: string;
  icon: ReactNode;
  tone: "complete" | "active" | "future";
};

const floatingNotes = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 23) % 84)}%`,
  top: `${10 + ((index * 31) % 76)}%`,
  delay: index * 0.34,
  duration: 9 + (index % 4),
  note: index % 3 === 0 ? "♪" : index % 3 === 1 ? "♫" : "♩",
}));

const processMilestones: ProcessMilestone[] = [
  {
    title: "Lyrics Written",
    label: "Words found",
    icon: <Check className="size-4" aria-hidden="true" />,
    tone: "complete",
  },
  {
    title: "Vocals Recorded",
    label: "Voice captured",
    icon: <Check className="size-4" aria-hidden="true" />,
    tone: "complete",
  },
  {
    title: "Composition in Progress",
    label: "Being shaped",
    icon: <Clock3 className="size-4" aria-hidden="true" />,
    tone: "active",
  },
  {
    title: "Future Release",
    label: "Awaiting its moment",
    icon: <Sparkles className="size-4" aria-hidden="true" />,
    tone: "future",
  },
];

const milestoneStyles: Record<ProcessMilestone["tone"], string> = {
  complete:
    "border-[rgba(214,178,91,0.24)] bg-[rgba(214,178,91,0.08)] text-foreground",
  active:
    "border-[rgba(214,178,91,0.34)] bg-[rgba(214,178,91,0.12)] text-foreground shadow-[0_18px_58px_rgba(214,178,91,0.10)]",
  future: "border-foreground/10 bg-background/58 text-foreground/72 dark:bg-white/[0.04]",
};

function FloatingNotes() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {floatingNotes.map((note) => (
        <motion.span
          key={note.id}
          className="absolute font-display text-2xl text-foreground/10 dark:text-white/12"
          style={{ left: note.left, top: note.top }}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -18, 0], opacity: [0.04, 0.16, 0.04] }
          }
          transition={{
            duration: note.duration,
            delay: note.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {note.note}
        </motion.span>
      ))}
    </div>
  );
}

function FountainPen() {
  return (
    <div
      aria-hidden="true"
      className="absolute -right-6 bottom-14 h-3 w-56 rotate-[-18deg] rounded-full bg-[linear-gradient(90deg,rgba(28,23,18,0.96),rgba(214,178,91,0.72)_48%,rgba(16,14,13,0.98))] shadow-[0_18px_42px_rgba(0,0,0,0.28)] sm:-right-12"
    >
      <div className="absolute right-0 top-1/2 h-5 w-12 -translate-y-1/2 rounded-r-full bg-[linear-gradient(90deg,rgba(214,178,91,0.62),rgba(255,238,188,0.88),rgba(68,48,24,0.92))]" />
      <div className="absolute -left-8 top-1/2 h-px w-12 -translate-y-1/2 bg-[rgba(23,23,23,0.38)] dark:bg-white/24" />
      <div className="absolute -left-10 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[rgba(23,23,23,0.42)] dark:bg-white/26" />
    </div>
  );
}

function LyricCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1rem] border border-foreground/10 bg-background/68 p-4 shadow-[0_18px_54px_rgba(0,0,0,0.10)] backdrop-blur-xl dark:bg-white/[0.045]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0_94%,rgba(214,178,91,0.16)_95%)] bg-[length:100%_1.75rem] opacity-40" />
      <p className="relative font-display text-2xl italic leading-snug text-foreground/74">
        {children}
      </p>
    </div>
  );
}

function NotebookScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <motion.div
        aria-hidden="true"
        className="absolute -left-12 top-0 size-64 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.22),transparent_68%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], opacity: [0.36, 0.58, 0.36] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-10 bottom-8 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(214,178,91,0.10),transparent_68%)]"
        animate={prefersReducedMotion ? undefined : { y: [0, -22, 0], opacity: [0.34, 0.54, 0.34] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -8, rotateX: 1.2, rotateZ: -0.5 }}
        transition={{ type: "spring", stiffness: 150, damping: 24, mass: 0.75 }}
        className="group relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-foreground/10 bg-background/58 p-5 shadow-[0_34px_110px_rgba(0,0,0,0.14)] backdrop-blur-xl will-change-transform dark:bg-white/[0.045] dark:shadow-[0_34px_110px_rgba(0,0,0,0.38)] sm:p-8"
        data-cursor="card"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,246,220,0.38),transparent_34%),linear-gradient(145deg,rgba(214,178,91,0.10),transparent_50%,rgba(154,133,255,0.06))] transition duration-700 group-hover:opacity-90 dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_36%),linear-gradient(145deg,rgba(214,178,91,0.10),transparent_50%,rgba(154,133,255,0.05))]" />
        <div className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(214,178,91,0.20),transparent_66%)] opacity-0 blur-2xl transition duration-700 group-hover:opacity-100" />
        <div className="relative grid gap-5">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[#f8f1e2]/86 p-6 text-[#2a2118] shadow-[0_24px_70px_rgba(0,0,0,0.16)] transition duration-700 group-hover:-translate-y-1 group-hover:shadow-[0_32px_92px_rgba(214,178,91,0.18)] dark:bg-[#efe2c9]/90">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0_93%,rgba(55,42,30,0.12)_94%)] bg-[length:100%_2rem]" />
            <div className="absolute bottom-0 left-10 top-0 w-px bg-[rgba(180,70,70,0.18)]" />
            <div className="relative pl-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#5f4b32]/64">
                  lyric manuscript
                </p>
                <Feather className="size-4 text-[#5f4b32]/52" aria-hidden="true" />
              </div>
              <p className="mt-8 font-display text-4xl italic leading-tight text-[#2a2118] text-balance">
                Some stories wait quietly until they learn how to sing.
              </p>
              <div className="mt-9 grid gap-3 text-sm leading-7 text-[#4c3b28]/72">
                <span>soft drafts / midnight notes / melody fragments</span>
                <span>voice becoming atmosphere</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <LyricCard>first line, still glowing</LyricCard>
            <LyricCard className="sm:translate-y-5">chorus taking shape</LyricCard>
          </div>
        </div>
        <FountainPen />
      </motion.div>
    </div>
  );
}

function ProcessCard({ milestone, index }: { milestone: ProcessMilestone; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      tabIndex={0}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
      whileFocus={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[1.25rem] border p-5 outline-none transition duration-700 ease-[var(--ease-luxury)] backdrop-blur-xl",
        focusRing,
        milestoneStyles[milestone.tone],
      )}
      data-cursor="card"
    >
      <div className="absolute -right-10 -top-10 size-28 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.18),transparent_68%)] opacity-0 blur-xl transition duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="relative flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background/54 text-foreground/68 dark:bg-white/[0.05]">
          {milestone.icon}
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/46">
            {milestone.label}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-tight text-foreground text-balance">
            {milestone.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}

export function MusicExperience({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 42, prefersReducedMotion ? 0 : -38],
  );

  return (
    <Section id="music" spacing="xl" className={cn("relative isolate overflow-hidden", className)}>
      <GradientGlow className="opacity-75" />
      <NoiseOverlay />
      <FloatingNotes />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-12 h-[32rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.12),transparent_68%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 28, -18, 0], opacity: [0.42, 0.62, 0.44, 0.42] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div ref={ref}>
        <Container className="relative z-10 grid min-h-screen items-center gap-16 lg:grid-cols-[0.92fr_1.08fr]">
          <Stack gap="lg" className="max-w-2xl">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-foreground/54"
            >
              Music Experience
            </motion.p>
            <DisplayXL>The Next Chapter</DisplayXL>
            <AnimatedDivider className="max-w-52" />
            <Stack gap="sm" className="max-w-xl text-lg leading-8 text-foreground/70">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                Some stories are written.
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                Some become melodies.
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                This chapter is still being composed.
              </motion.p>
            </Stack>
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              {processMilestones.map((milestone, index) => (
                <ProcessCard
                  key={milestone.title}
                  milestone={milestone}
                  index={index}
                />
              ))}
            </div>
            <Badge className="w-fit border border-foreground/10 bg-background/58 text-foreground/62 backdrop-blur-xl dark:bg-white/[0.04]">
              <Music2 aria-hidden="true" className="mr-2 size-3.5" />
              Quietly composing
            </Badge>
          </Stack>
          <motion.div style={{ y: visualY }} className="relative">
            <NotebookScene />
            <motion.div
              aria-hidden="true"
              animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 -top-8 hidden rounded-full border border-foreground/10 bg-background/70 p-4 text-foreground/58 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:bg-white/[0.06] sm:block"
            >
              <PenLine className="size-6" />
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
