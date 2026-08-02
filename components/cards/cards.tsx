import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import {
  editorialRadius,
  glassSurface,
  mutedText,
  surfaceBase,
} from "@/components/shared";

type CardProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

function CardShell({
  className,
  children,
  variant = "editorial",
  ...props
}: HTMLAttributes<HTMLElement> & {
  variant?: "editorial" | "glass" | "quiet";
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden p-6 transition duration-700 ease-[var(--ease-luxury)] hover:-translate-y-1 hover:shadow-[0_32px_92px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_32px_92px_rgba(0,0,0,0.42)] sm:p-8",
        editorialRadius,
        variant === "glass" ? glassSurface : surfaceBase,
        variant === "quiet" && "shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

function CardContent({ eyebrow, title, description, action, children }: CardProps) {
  return (
    <div className="relative z-10 flex h-full flex-col gap-5">
      {eyebrow ? (
        <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-foreground/54">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h3 className="font-display text-2xl leading-tight tracking-normal text-balance text-foreground sm:text-3xl">
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className={cn("font-sans text-base leading-7", mutedText)}>{description}</p>
      ) : null}
      {children}
      {action ? <div className="mt-auto pt-4">{action}</div> : null}
    </div>
  );
}

export function EditorialCard({ className, ...props }: CardProps) {
  return (
    <CardShell className={className}>
      <CardContent {...props} />
    </CardShell>
  );
}

export function GlassCard({ className, ...props }: CardProps) {
  return (
    <CardShell variant="glass" className={className}>
      <CardContent {...props} />
    </CardShell>
  );
}

export function BookCard({ className, children, ...props }: CardProps) {
  return (
    <CardShell
      className={cn(
        "min-h-80 border-foreground/15 bg-[linear-gradient(135deg,var(--background),color-mix(in_srgb,var(--foreground)_8%,transparent))]",
        className,
      )}
    >
      <div className="absolute inset-y-6 left-5 w-px bg-foreground/12" aria-hidden="true" />
      <CardContent {...props}>{children}</CardContent>
    </CardShell>
  );
}

export function StoryCard({ className, ...props }: CardProps) {
  return (
    <CardShell className={cn("p-7 sm:p-10", className)}>
      <CardContent {...props} />
    </CardShell>
  );
}

export function MediaCard({
  className,
  media,
  children,
  ...props
}: CardProps & { media?: ReactNode }) {
  return (
    <CardShell className={cn("p-0", className)}>
      {media ? <div className="aspect-[4/3] overflow-hidden bg-foreground/6">{media}</div> : null}
      <div className="p-6 sm:p-8">
        <CardContent {...props}>{children}</CardContent>
      </div>
    </CardShell>
  );
}

export function FeatureCard({ className, icon, ...props }: CardProps & { icon?: ReactNode }) {
  return (
    <CardShell variant="quiet" className={cn("bg-foreground/[0.03]", className)}>
      {icon ? <div className="mb-6 text-foreground/72">{icon}</div> : null}
      <CardContent {...props} />
    </CardShell>
  );
}

export function QuoteCard({ className, quote, cite, ...props }: CardProps & {
  quote?: ReactNode;
  cite?: ReactNode;
}) {
  return (
    <CardShell className={className}>
      <blockquote className="relative z-10">
        <p className="font-display text-2xl italic leading-snug text-foreground sm:text-3xl">
          {quote}
        </p>
        {cite ? <footer className="mt-6 font-sans text-sm text-foreground/58">{cite}</footer> : null}
      </blockquote>
      <CardContent {...props} />
    </CardShell>
  );
}
