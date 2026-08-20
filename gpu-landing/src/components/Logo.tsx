import { company } from "@/lib/config";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="text-accent"
      >
        <path
          fill="currentColor"
          d="M33.7 3.2c1.2 6.4-1.1 11-4.6 14.9-3.7 4.1-8.7 7.8-11.6 13.2-2.7 5-3.4 11 .1 16.7 2.5 4.1 6.6 6.9 11 8.2-2.4-2.3-3.7-5.2-3.4-8.6.3-3.6 2.4-6.4 4.8-9.1.9 2.2 2.2 4 4.2 5.2 2.9 1.8 4.2 4.6 3.9 8-.2 2.2-1.2 4.1-2.7 5.7 5.4-1.6 9.9-5.2 12-10.6 2.2-5.6 1.2-11.6-1.6-16.8-2.1-3.9-5.1-7-7.2-10.9-2.2-4-2.8-8.3-1.3-12.7-2 .9-3.8 2.2-5.2 3.9.4-3.6-.2-7-2.4-10.2z"
        />
      </svg>
      <span className="text-[17px] font-extrabold tracking-[0.14em] text-ink">
        {company.brand}
      </span>
    </span>
  );
}
