"use client";

import { Search } from "lucide-react";
import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/cn";
import { focusRing } from "@/components/shared";

const fieldBase =
  "w-full rounded-2xl border border-foreground/14 bg-background/75 px-4 py-3 text-base text-foreground shadow-sm transition placeholder:text-foreground/38 hover:border-foreground/24 disabled:cursor-not-allowed disabled:opacity-50";

type FieldWrapperProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: string;
  error?: string;
};

function FieldWrapper({ label, error, children, className }: FieldWrapperProps) {
  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      {label ? (
        <span className="text-sm font-medium text-foreground/72">{label}</span>
      ) : null}
      {children}
      {error ? <span className="text-sm text-red-600 dark:text-red-400">{error}</span> : null}
    </label>
  );
}

export function Input({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & FieldWrapperProps) {
  return (
    <FieldWrapper label={label} error={error}>
      <input className={cn(fieldBase, focusRing, className)} aria-invalid={!!error} {...props} />
    </FieldWrapper>
  );
}

export function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapperProps) {
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={cn(fieldBase, focusRing, "min-h-32 resize-y", className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldWrapper>
  );
}

export function SearchBar({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-full">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/45"
      />
      <input
        type="search"
        className={cn(fieldBase, focusRing, "pl-11", className)}
        {...props}
      />
    </div>
  );
}

export function Checkbox({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className={cn("inline-flex items-center gap-3 text-sm text-foreground/72", className)}>
      <input
        type="checkbox"
        className={cn("size-4 rounded border-foreground/25 accent-foreground", focusRing)}
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}

export function Toggle({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className={cn("inline-flex items-center gap-3 text-sm text-foreground/72", className)}>
      <span className="relative inline-flex">
        <input type="checkbox" className="peer sr-only" {...props} />
        <span className="h-7 w-12 rounded-full border border-foreground/14 bg-foreground/10 transition peer-checked:bg-foreground" />
        <span className="absolute left-1 top-1 size-5 rounded-full bg-background shadow transition peer-checked:translate-x-5" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}

