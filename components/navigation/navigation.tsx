"use client";

import { ArrowUpRight, Mail, Menu, Sparkles, X } from "lucide-react";
import { motion, type HTMLMotionProps, useMotionValueEvent, useScroll } from "framer-motion";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { Container } from "@/components/layout";
import { IconButton } from "@/components/buttons";
import { focusRing } from "@/components/shared";

export type NavItem = {
  label: string;
  href: string;
};

type NavbarProps = HTMLMotionProps<"header"> & {
  brand?: ReactNode;
  items?: NavItem[];
  actions?: ReactNode;
};

function NavLink({
  className,
  children,
  isActive,
  onNavigate,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      onClick={(event) => {
        if (props.href?.startsWith("#")) {
          const target = document.querySelector(props.href);

          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(null, "", props.href);
          }
        }

        onNavigate?.();
      }}
      className={cn(
        "relative text-sm text-foreground/70 transition duration-500 ease-[var(--ease-luxury)] hover:text-foreground",
        isActive &&
          "text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:bg-[rgba(214,178,91,0.78)] after:shadow-[0_0_14px_rgba(214,178,91,0.40)]",
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Navbar({ brand, items = [], actions, className, ...props }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");
  const { scrollY } = useScroll();

  useEffect(() => {
    const sectionItems = items.filter((item) => item.href.startsWith("#"));

    if (sectionItems.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.16, 0.32, 0.48],
      },
    );

    sectionItems.forEach((item) => {
      const section = document.querySelector(item.href);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isScrollingDown = latest > previous + 6;

    setIsScrolled(latest > 18);
    setIsHidden(isScrollingDown && latest > 160 && !isOpen);
  });

  return (
    <motion.header
      animate={{ y: isHidden ? "-110%" : "0%" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
        isScrolled
          ? "border-foreground/10 bg-background/68 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:bg-background/62 dark:shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
          : "border-transparent bg-background/0 backdrop-blur-0",
        className,
      )}
      {...props}
    >
      <Container className="flex min-h-[var(--header-height)] items-center justify-between gap-6">
        <div className="font-display text-xl leading-none text-foreground">{brand}</div>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href} isActive={activeHref === item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">{actions}</div>
        <IconButton
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </IconButton>
      </Container>
      <MobileMenu
        isOpen={isOpen}
        items={items}
        actions={actions}
        activeHref={activeHref}
        onNavigate={() => {
          setIsOpen(false);
        }}
      />
    </motion.header>
  );
}

export function MobileMenu({
  isOpen,
  items = [],
  actions,
  activeHref,
  onNavigate,
  className,
}: {
  isOpen?: boolean;
  items?: NavItem[];
  actions?: ReactNode;
  activeHref?: string;
  onNavigate?: () => void;
  className?: string;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn("border-t border-foreground/8 bg-background md:hidden", className)}>
      <Container className="flex flex-col gap-5 py-6">
        <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={activeHref === item.href}
              className="text-base"
              onNavigate={onNavigate}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {actions ? <div className="pt-2">{actions}</div> : null}
      </Container>
    </div>
  );
}

export function Footer({
  brand,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { brand?: ReactNode }) {
  return (
    <footer
      className={cn(
        "relative isolate overflow-hidden border-t border-foreground/10 bg-background/55 py-14 backdrop-blur-xl sm:py-16",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,178,91,0.10),transparent_68%)]"
      />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-foreground/60">
              <Sparkles aria-hidden="true" className="size-3.5 text-[rgba(214,178,91,0.9)]" />
              A world of stories
            </div>
            <div className="font-display text-3xl leading-none text-foreground sm:text-4xl">{brand}</div>
            <p className="mt-4 max-w-md text-sm leading-7 text-foreground/62 sm:text-base">
              Stories, imagination, and little glimpses into the creative universe of author
              Siddhiksha Patel.
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
              Stay connected
            </p>
            <nav aria-label="Social media" className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/share/1E6UyJ5YFc/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-4 text-sm text-foreground/72 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(214,178,91,0.38)] hover:text-foreground hover:shadow-[0_12px_34px_rgba(214,178,91,0.10)]",
                  focusRing,
                )}
              >
                <span aria-hidden="true" className="font-semibold text-[rgba(214,178,91,0.9)]">f</span>
                Facebook
                <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-45 transition group-hover:opacity-100" />
              </a>
              <a
                href="https://www.instagram.com/authorsiddhikshapatel?srtk=cmJkMWhjcTA1aHdp&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-4 text-sm text-foreground/72 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(214,178,91,0.38)] hover:text-foreground hover:shadow-[0_12px_34px_rgba(214,178,91,0.10)]",
                  focusRing,
                )}
              >
                <span aria-hidden="true" className="flex size-4 items-center justify-center rounded-[0.3rem] border border-[rgba(214,178,91,0.9)] text-[rgba(214,178,91,0.9)]">
                  <span className="size-1.5 rounded-full border border-current" />
                </span>
                Instagram
                <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-45 transition group-hover:opacity-100" />
              </a>
              <a
                href="https://www.youtube.com/@SiddhikshaPatelOfficial/videos"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-4 text-sm text-foreground/72 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(214,178,91,0.38)] hover:text-foreground hover:shadow-[0_12px_34px_rgba(214,178,91,0.10)]",
                  focusRing,
                )}
              >
                <span aria-hidden="true" className="flex size-4 items-center justify-center rounded-[0.3rem] bg-[rgba(214,178,91,0.9)] text-[0.55rem] text-background">▶</span>
                YouTube
                <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-45 transition group-hover:opacity-100" />
              </a>
              <a
                href="mailto:siddhikshapatel@gmail.com"
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-4 text-sm text-foreground/72 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(214,178,91,0.38)] hover:text-foreground hover:shadow-[0_12px_34px_rgba(214,178,91,0.10)]",
                  focusRing,
                )}
              >
                <Mail aria-hidden="true" className="size-4 text-[rgba(214,178,91,0.9)]" />
                Email
              </a>
            </nav>
            <a
              href="mailto:siddhikshapatel@gmail.com"
              className={cn("mt-4 inline-block text-sm text-foreground/55 transition hover:text-foreground", focusRing)}
            >
              siddhikshapatel@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-foreground/10 pt-5 text-xs text-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Siddhiksha Patel. All rights reserved.</p>
          <p className="text-foreground/38">Made with imagination, one story at a time.</p>
        </div>
        {children ? <div className="sr-only">{children}</div> : null}
      </Container>
    </footer>
  );
}

export function Breadcrumb({
  items = [],
  className,
}: {
  items?: NavItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/58">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            <a className={cn("transition hover:text-foreground", focusRing)} href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SocialLinks({
  links = [],
  className,
}: {
  links?: NavItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Social links" className={cn("flex items-center gap-4", className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn("text-sm text-foreground/62 transition hover:text-foreground", focusRing)}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
