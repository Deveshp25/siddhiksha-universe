import type { ElementType } from "react";

import { cn } from "@/lib/cn";
import type { PolymorphicProps } from "@/components/shared";

type TypographyVariant =
  | "displayHero"
  | "displayXL"
  | "heading"
  | "subHeading"
  | "body"
  | "caption"
  | "quote"
  | "label";

const typographyStyles: Record<TypographyVariant, string> = {
  displayHero:
    "font-display text-5xl leading-[0.95] tracking-normal text-balance sm:text-7xl lg:text-8xl",
  displayXL:
    "font-display text-4xl leading-none tracking-normal text-balance sm:text-6xl lg:text-7xl",
  heading:
    "font-display text-3xl leading-tight tracking-normal text-balance sm:text-4xl",
  subHeading:
    "font-sans text-lg leading-8 tracking-normal text-foreground/74 sm:text-xl",
  body: "font-sans text-base leading-7 tracking-normal text-foreground/76",
  caption:
    "font-sans text-sm leading-6 tracking-normal text-foreground/60",
  quote:
    "font-display text-2xl italic leading-snug tracking-normal text-foreground sm:text-3xl",
  label:
    "font-sans text-xs font-medium uppercase leading-none tracking-[0.18em] text-foreground/58",
};

function Typography<TElement extends ElementType>({
  as,
  className,
  children,
  variant,
  ...props
}: PolymorphicProps<TElement> & { variant: TypographyVariant }) {
  const Component = as ?? "p";

  return (
    <Component className={cn(typographyStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
}

export function DisplayHero(props: PolymorphicProps<"h1">) {
  return <Typography as="h1" variant="displayHero" {...props} />;
}

export function DisplayXL(props: PolymorphicProps<"h2">) {
  return <Typography as="h2" variant="displayXL" {...props} />;
}

export function Heading(props: PolymorphicProps<"h2">) {
  return <Typography as="h2" variant="heading" {...props} />;
}

export function SubHeading(props: PolymorphicProps<"p">) {
  return <Typography as="p" variant="subHeading" {...props} />;
}

export function Body(props: PolymorphicProps<"p">) {
  return <Typography as="p" variant="body" {...props} />;
}

export function Caption(props: PolymorphicProps<"p">) {
  return <Typography as="p" variant="caption" {...props} />;
}

export function Quote(props: PolymorphicProps<"blockquote">) {
  return <Typography as="blockquote" variant="quote" {...props} />;
}

export function Label(props: PolymorphicProps<"span">) {
  return <Typography as="span" variant="label" {...props} />;
}

