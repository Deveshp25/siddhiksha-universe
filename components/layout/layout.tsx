import type { ElementType } from "react";

import { cn } from "@/lib/cn";
import type { PolymorphicProps, WithClassName } from "@/components/shared";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type SectionSpacing = "sm" | "md" | "lg" | "xl";
type GridColumns = 1 | 2 | 3 | 4;

const containerSizes: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-[var(--container-max)]",
  full: "max-w-none",
};

const stackGaps: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const sectionSpacing: Record<SectionSpacing, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
  xl: "py-24 sm:py-40",
};

const gridColumns: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

export function Container({
  as,
  size = "xl",
  className,
  children,
  ...props
}: PolymorphicProps<"div"> & { size?: ContainerSize }) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full px-5 sm:px-8", containerSizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Section({
  as,
  spacing = "lg",
  className,
  children,
  ...props
}: PolymorphicProps<"section"> & { spacing?: SectionSpacing }) {
  const Component = as ?? "section";

  return (
    <Component className={cn("relative", sectionSpacing[spacing], className)} {...props}>
      {children}
    </Component>
  );
}

export function Grid({
  as,
  columns = 3,
  gap = "md",
  className,
  children,
  ...props
}: PolymorphicProps<"div"> & { columns?: GridColumns; gap?: StackGap }) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("grid", gridColumns[columns], stackGaps[gap], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Stack<TElement extends ElementType = "div">({
  as,
  gap = "md",
  className,
  children,
  ...props
}: PolymorphicProps<TElement> & { gap?: StackGap }) {
  const Component = as ?? "div";

  return (
    <Component className={cn("flex flex-col", stackGaps[gap], className)} {...props}>
      {children}
    </Component>
  );
}

export function Spacer({ size = "md", className }: WithClassName & { size?: StackGap }) {
  return <div aria-hidden="true" className={cn(stackGaps[size].replace("gap", "h"), className)} />;
}

export function Divider({ className }: WithClassName) {
  return <hr className={cn("border-0 border-t border-foreground/12", className)} />;
}

