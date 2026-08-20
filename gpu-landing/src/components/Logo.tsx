import { company } from "@/lib/config";
import { cn } from "@/lib/cn";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="12" height="28" rx="2" fill="#15181D" />
        <rect x="17" y="2" width="13" height="12" rx="2" fill="#1E5AA8" />
        <rect x="17" y="17" width="13" height="13" rx="2" fill="#15181D" />
      </svg>
      <span
        className={cn(
          "text-[19px] font-extrabold tracking-[0.14em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {company.brand}
      </span>
    </span>
  );
}
