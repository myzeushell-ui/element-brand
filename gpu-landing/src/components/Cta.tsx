"use client";

import { cn } from "@/lib/cn";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 ease-smooth focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover active:bg-accent-strong",
  secondary:
    "bg-white text-ink border border-line-strong hover:border-accent hover:text-accent",
  ghost: "text-accent hover:text-accent-strong hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-4 text-[15px]",
  lg: "min-h-[52px] px-6 text-base",
};

export function Cta({
  href,
  children,
  variant = "primary",
  size = "lg",
  event,
  eventParams,
  className,
  onClick,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  event?: AnalyticsEvent;
  eventParams?: Record<string, unknown>;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], "w-full sm:w-auto", className)}
      onClick={(e) => {
        if (event) track(event, eventParams);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
