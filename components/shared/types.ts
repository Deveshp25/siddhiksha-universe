import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type PolymorphicProps<TElement extends ElementType> = {
  as?: TElement;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "className" | "children">;

export type WithClassName = {
  className?: string;
};

export type WithChildren = {
  children?: ReactNode;
};

