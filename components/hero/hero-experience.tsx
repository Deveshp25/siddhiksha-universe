"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Container,
  DisplayHero,
  GhostButton,
  PrimaryButton,
  Stack,
} from "@/components";
import { cn } from "@/lib/cn";
import { getAsset } from "@/lib/assets";

const heroPortrait = getAsset("hero-portrait");

const particles = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 8) * 0.35,
  duration: 8 + (index % 6),
}));

function HeroAtmosphere() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.90),transparent_25%),radial-gradient(circle_at_22%_30%,rgba(214,178,91,0.20),transparent_31%),radial-gradient(circle_at_76%_24%,rgba(154,133,255,0.14),transparent_30%),linear-gradient(180deg,var(--background)_0%,color-mix(in_srgb,var(--background)_88%,var(--foreground))_100%)] bg-[length:130%_130%,120%_120%,125%_125%,100%_100%] dark:bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_22%_30%,rgba(214,178,91,0.18),transparent_32%),radial-gradient(circle_at_76%_24%,rgba(154,133,255,0.13),transparent_30%),linear-gradient(180deg,var(--background)_0%,#050404_100%)]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                backgroundPosition: [
                  "50% 18%, 22% 30%, 76% 24%, 0% 0%",
                  "48% 22%, 25% 28%, 72% 27%, 0% 0%",
                  "50% 18%, 22% 30%, 76% 24%, 0% 0%",
                ],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,222,168,0.34),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(245,222,168,0.16),transparent_70%)]"
        animate={prefersReducedMotion ? undefined : { y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.30),transparent_66%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(214,178,91,0.12),transparent_68%)]"
        animate={prefersReducedMotion ? undefined : { x: [0, 34, 0], y: [0, -18, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-12 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(153,132,92,0.16),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)]"
        animate={prefersReducedMotion ? undefined : { x: [0, -28, 0], y: [0, 22, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-foreground/18 shadow-[0_0_18px_currentColor] dark:bg-white/22"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -18, 0], opacity: [0.04, 0.18, 0.04] }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export function HeroExperience({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(42);
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 28, mass: 0.45 });
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 28, mass: 0.45 });
  const portraitGlowX = useTransform(glowX, [0, 100], [-36, 36]);
  const portraitGlowY = useTransform(glowY, [0, 100], [-28, 28]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : 64]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.18]);
  const portraitY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : -54]);
  const portraitOpacity = useTransform(scrollY, [0, 620], [0.96, 0.22]);

  return (
    <section
      id="home"
      onPointerMove={(event) => {
        if (prefersReducedMotion || event.pointerType !== "mouse") {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - bounds.left) / bounds.width) * 100);
        mouseY.set(((event.clientY - bounds.top) / bounds.height) * 100);
      }}
      className={cn(
        "relative isolate flex min-h-screen overflow-hidden text-foreground",
        className,
      )}
    >
      <HeroAtmosphere />
      <motion.div
        aria-hidden="true"
        style={{ y: portraitY, opacity: portraitOpacity }}
        initial={prefersReducedMotion ? false : { opacity: 0, x: 34, filter: "blur(14px)" }}
        animate={prefersReducedMotion ? undefined : { opacity: 0.96, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-[-7rem] top-24 z-[1] hidden w-[48vw] max-w-[46rem] lg:block"
      >
        <motion.div
          className="absolute -inset-20 rounded-[48%] bg-[radial-gradient(circle,rgba(214,178,91,0.18),transparent_62%)] blur-3xl"
          style={{
            x: portraitGlowX,
            y: portraitGlowY,
          }}
        />
        <div className="absolute -inset-8 rounded-[48%] bg-[radial-gradient(circle_at_48%_36%,rgba(214,178,91,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/64 to-transparent" />
        <div className="relative h-full overflow-hidden rounded-l-[42%] rounded-r-[2rem] border border-white/16 bg-background/18 shadow-[0_40px_140px_rgba(0,0,0,0.24)] backdrop-blur-sm [mask-image:linear-gradient(180deg,black_0%,black_78%,transparent_100%)] dark:bg-white/[0.03]">
          <Image
            src={heroPortrait.jpg}
            alt=""
            fill
            sizes="48vw"
            className="object-cover object-[50%_20%]"
            placeholder="blur"
            blurDataURL={heroPortrait.blur}
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_28%),radial-gradient(circle_at_56%_24%,transparent_0%,rgba(0,0,0,0.12)_72%)]" />
        </div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-y-0 right-0 z-[2] hidden w-1/2 bg-gradient-to-r from-transparent via-background/12 to-background/58 lg:block" />
      <Container className="relative z-10 flex min-h-screen items-center py-20">
        <motion.div
          style={{ y, opacity }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-5xl text-center lg:mx-0 lg:max-w-4xl lg:text-left"
        >
          <Stack gap="lg" className="items-center lg:items-start">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="font-sans text-xs font-medium uppercase tracking-[0.26em] text-foreground/56"
            >
              Siddhiksha Universe
            </motion.p>
            <DisplayHero>
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                Where Stories Become Worlds,
              </motion.span>
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                and Words Find a Voice.
              </motion.span>
            </DisplayHero>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.72, ease: "easeOut" }}
              className="max-w-2xl font-sans text-base leading-8 text-foreground/68 sm:text-lg"
            >
              Author. Storyteller. Songwriter. Creative Explorer.
            </motion.p>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-2 aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-[2rem] border border-white/18 bg-background/54 shadow-[0_28px_86px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden"
            >
              <Image
                src={heroPortrait.jpg}
                alt="Portrait of Siddhiksha Patel."
                fill
                sizes="(max-width: 1024px) 18rem"
                className="object-cover object-[50%_16%]"
                placeholder="blur"
                blurDataURL={heroPortrait.blur}
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,var(--background)_106%)]" />
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row lg:justify-start"
            >
              <PrimaryButton rightIcon={<ArrowRight className="size-4" />}>
                Explore the Journey
              </PrimaryButton>
              <GhostButton>Discover the Books</GhostButton>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-foreground/48"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="h-10 w-px bg-foreground/24" />
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
