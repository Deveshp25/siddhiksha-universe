import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { Heading, Label } from "@/components/typography";

type StateProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function Loading({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-3 text-sm text-foreground/64", className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
      <span>{label}</span>
    </div>
  );
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-foreground/10", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

function StateShell({ title, description, action, className, children }: StateProps) {
  return (
    <div
      className={cn(
        "flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-foreground/10 px-6 py-10 text-center",
        className,
      )}
    >
      {children}
      {title ? <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3> : null}
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-6 text-foreground/62">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState(props: StateProps) {
  return (
    <StateShell {...props}>
      <AlertCircle aria-hidden="true" className="size-7 text-foreground/58" />
    </StateShell>
  );
}

export function EmptyState(props: StateProps) {
  return (
    <StateShell {...props}>
      <div aria-hidden="true" className="size-9 rounded-full border border-foreground/18" />
    </StateShell>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  className,
}: {
  label?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      {title ? <Heading className="mt-4">{title}</Heading> : null}
      {description ? (
        <p className="mt-5 text-base leading-7 text-foreground/68 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <Label className={className}>{children}</Label>;
}

function Pill({
  children,
  className,
  variant = "soft",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: "soft" | "solid" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5",
        variant === "soft" && "bg-foreground/8 text-foreground/72",
        variant === "solid" && "bg-foreground text-background",
        variant === "outline" && "border border-foreground/16 text-foreground/72",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Tag(props: HTMLAttributes<HTMLSpanElement>) {
  return <Pill variant="outline" {...props} />;
}

export function Badge(props: HTMLAttributes<HTMLSpanElement>) {
  return <Pill variant="solid" {...props} />;
}

export function Chip(props: HTMLAttributes<HTMLSpanElement>) {
  return <Pill variant="soft" {...props} />;
}

