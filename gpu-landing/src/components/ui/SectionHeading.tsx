import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          Heading === "h2" ? "text-h2" : "text-2xl",
          "font-extrabold text-ink text-balance",
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-ink-2",
            align === "center" && "mx-auto",
            "max-w-prose",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
