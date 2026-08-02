"use client";

import { BookOpen, Feather, Mic2, Music2, Sparkles } from "lucide-react";
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
  PaperTexture,
  Section,
  Stack,
  Tag,
} from "@/components";
import { focusRing } from "@/components/shared";
import { cn } from "@/lib/cn";

type JourneyEntry = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  isComingSoon?: boolean;
};

type TimelineProps = {
  entries: JourneyEntry[];
  className?: string;
};

type TimelineItemProps = {
  entry: JourneyEntry;
  index: number;
};

const journeyEntries: JourneyEntry[] = [
  {
    id: "age-13",
    label: "Age 13",
    title: "Published first book at the age of 11.",
    description:
      "At just 11 years old, Siddhiksha became a published author, marking the beginning of her creative journey and the earliest shape of a lifelong voice.",
    icon: <BookOpen className="size-5" aria-hidden="true" />,
  },
  {
    id: "second-book",
    label: "Next Chapter",
    title: "Published second book.",
    description:
      "The story continued with deeper confidence, proving that one finished world could become the beginning of another.",
    icon: <Feather className="size-5" aria-hidden="true" />,
  },
  {
    id: "songwriting",
    label: "New Language",
    title: "Started exploring songwriting.",
    description:
      "Words began listening for rhythm, turning emotion into lyrics and giving stories a softer way to move through the heart.",
    icon: <Music2 className="size-5" aria-hidden="true" />,
  },
  {
    id: "singing",
    label: "Finding Voice",
    title: "Began singing journey.",
    description:
      "A new creative chapter started quietly, with voice, melody, and practice becoming another path toward expression.",
    icon: <Mic2 className="size-5" aria-hidden="true" />,
  },
  {
    id: "future",
    label: "Future Milestone",
    title: "Coming Soon",
    description:
      "A glowing space for the dreams still forming, the songs not yet sung, and the worlds still waiting for their first line.",
    icon: <Sparkles className="size-5" aria-hidden="true" />,
    isComingSoon: true,
  },
];

export function TimelineConnector({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute bottom-12 left-5 top-12 w-px overflow-hidden rounded-full bg-foreground/10 md:left-1/2 md:-translate-x-1/2",
        className,
      )}
      data-cursor="card"
    >
      <motion.div
        style={{ scaleY: prefersReducedMotion ? 1 : scaleY }}
        className="h-full origin-top bg-[linear-gradient(180deg,transparent,rgba(214,178,91,0.88),rgba(255,255,255,0.55),transparent)] shadow-[0_0_28px_rgba(214,178,91,0.42)]"
      />
    </div>
  );
}

export function TimelineDot({
  isComingSoon,
  className,
}: {
  isComingSoon?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      animate={
        prefersReducedMotion
          ? undefined
          : { scale: [1, 1.1, 1], boxShadow: ["0 0 0 rgba(214,178,91,0)", "0 0 24px rgba(214,178,91,0.34)", "0 0 0 rgba(214,178,91,0)"] }
      }
      transition={{ duration: isComingSoon ? 3.8 : 5.2, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-foreground/14 bg-background shadow-[0_12px_34px_rgba(0,0,0,0.14)] dark:bg-[#0a0a0a]",
        isComingSoon && "border-[rgba(214,178,91,0.45)] bg-[rgba(214,178,91,0.16)]",
        className,
      )}
    >
      <span
        className={cn(
          "size-2.5 rounded-full bg-foreground/52",
          isComingSoon && "bg-[rgba(214,178,91,0.92)] shadow-[0_0_22px_rgba(214,178,91,0.64)]",
        )}
      />
    </motion.span>
  );
}

export function MilestoneCard({ entry, index }: TimelineItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      tabIndex={0}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28, clipPath: "inset(10% 0% 0% 0% round 1.5rem)" }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.006 }}
      whileFocus={prefersReducedMotion ? undefined : { y: -6, scale: 1.006 }}
      viewport={{ once: true, margin: "-110px" }}
      transition={{ duration: 0.88, delay: index * 0.075, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-background/66 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.11)] backdrop-blur-xl outline-none transition duration-700 dark:bg-white/[0.045] sm:p-8",
        focusRing,
        entry.isComingSoon && "border-[rgba(214,178,91,0.24)] shadow-[0_30px_92px_rgba(214,178,91,0.12)]",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.34),transparent_34%),linear-gradient(135deg,rgba(214,178,91,0.08),transparent_50%)] opacity-70 dark:bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(214,178,91,0.09),transparent_50%)]" />
      <div className="absolute -right-12 -top-12 size-40 rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.16),transparent_68%)] opacity-0 blur-2xl transition duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <Tag className="border-foreground/14 bg-foreground/[0.03]">{entry.label}</Tag>
          <span className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-background/54 text-foreground/62 dark:bg-white/[0.05]">
            {entry.icon}
          </span>
        </div>
        <h3 className="mt-6 font-display text-3xl leading-tight text-foreground text-balance sm:text-4xl">
          {entry.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-foreground/66">{entry.description}</p>
        {entry.isComingSoon ? (
          <Badge className="mt-7 bg-[rgba(214,178,91,0.92)] text-[#17120a]">
            Coming Soon
          </Badge>
        ) : null}
      </div>
    </motion.article>
  );
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <li
      className={cn(
        "relative grid gap-5 pl-16 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:items-center md:gap-8 md:pl-0",
      )}
    >
      <div className={cn("md:col-start-1", !isEven && "md:col-start-3")}>
        <MilestoneCard entry={entry} index={index} />
      </div>
      <div className="absolute left-0 top-8 md:static md:col-start-2 md:flex md:justify-center">
        <TimelineDot isComingSoon={entry.isComingSoon} />
      </div>
      <div className={cn("hidden md:block", isEven ? "md:col-start-3" : "md:col-start-1 md:row-start-1")} />
    </li>
  );
}

export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)} aria-label="Creative journey timeline">
      <TimelineConnector />
      <ol className="relative z-10 grid gap-10 md:gap-14">
        {entries.map((entry, index) => (
          <TimelineItem key={entry.id} entry={entry} index={index} />
        ))}
      </ol>
    </div>
  );
}

export function CreativeJourney({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 36, prefersReducedMotion ? 0 : -44],
  );

  return (
    <Section id="journey" spacing="xl" className={cn("relative isolate overflow-hidden", className)}>
      <GradientGlow className="opacity-70" />
      <NoiseOverlay />
      <PaperTexture />
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute right-[-8rem] top-44 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(214,178,91,0.16),transparent_68%)] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute bottom-28 left-[-10rem] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(154,133,255,0.12),transparent_68%)] blur-3xl"
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
      <div ref={ref}>
        <Container className="relative z-10">
          <Stack gap="xl" className="items-center">
            <div className="mx-auto max-w-4xl text-center">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-foreground/54"
              >
                Creative Journey
              </motion.p>
              <DisplayXL className="mt-5">
                Every Journey Begins With A Single Word.
              </DisplayXL>
              <AnimatedDivider className="mx-auto mt-8 max-w-56" />
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-foreground/68"
              >
                Every milestone is another chapter in Siddhiksha&apos;s creative life,
                from writing her first stories to publishing books and exploring
                music as a new language for imagination.
              </motion.p>
            </div>
            <Timeline entries={journeyEntries} className="w-full max-w-6xl" />
          </Stack>
        </Container>
      </div>
    </Section>
  );
}
