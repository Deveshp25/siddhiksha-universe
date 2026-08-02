"use client";

import { Loader2 } from "lucide-react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { focusRing } from "@/components/shared";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: ButtonSize;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-normal transition duration-500 ease-[var(--ease-luxury)] will-change-transform disabled:pointer-events-none disabled:opacity-50";

const buttonSizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background shadow-[0_16px_48px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:scale-[1.012] hover:bg-foreground/88 hover:shadow-[0_22px_64px_rgba(214,178,91,0.24)] active:translate-y-0 active:scale-[0.992]",
  secondary:
    "border border-foreground/18 bg-background/80 text-foreground hover:-translate-y-1 hover:scale-[1.008] hover:border-foreground/35 hover:bg-foreground/5 hover:shadow-[0_18px_52px_rgba(214,178,91,0.12)] active:translate-y-0 active:scale-[0.994]",
  ghost:
    "bg-transparent text-foreground hover:-translate-y-0.5 hover:bg-foreground/8 hover:shadow-[0_14px_42px_rgba(214,178,91,0.10)] active:translate-y-0",
  text: "min-h-0 rounded-none px-0 underline-offset-4 hover:text-foreground/70 hover:underline",
};

function Button({
  className,
  children,
  isLoading,
  leftIcon,
  rightIcon,
  size = "md",
  variant,
  disabled,
  ...props
}: ButtonProps & { variant: ButtonVariant }) {
  return (
    <button
      data-cursor="button"
      className={cn(
        buttonBase,
        focusRing,
        buttonSizes[size],
        buttonVariants[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading ? rightIcon : null}
    </button>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button variant="secondary" {...props} />;
}

export function GhostButton(props: ButtonProps) {
  return <Button variant="ghost" {...props} />;
}

export function TextButton(props: ButtonProps) {
  return <Button variant="text" {...props} />;
}

export function LoadingButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />;
}

export function MagneticButton({
  className,
  children,
  ...props
}: HTMLMotionProps<"button"> & {
  size?: ButtonSize;
}) {
  return (
    <motion.button
      data-cursor="button"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        buttonBase,
        focusRing,
        buttonSizes.md,
        buttonVariants.primary,
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function IconButton({
  className,
  children,
  "aria-label": ariaLabel,
  size = "md",
  ...props
}: ButtonProps & { "aria-label": string }) {
  return (
    <button
      data-cursor="button"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-foreground/14 bg-background/70 text-foreground transition duration-300 hover:bg-foreground/8",
        focusRing,
        size === "sm" ? "size-10" : size === "lg" ? "size-14" : "size-12",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
