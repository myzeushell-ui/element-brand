import type { SVGProps } from "react";

/** Минималистичные line-иконки (24×24, stroke=currentColor). Без стоковых наборов. */

const base: SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconGenerator(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="9" width="14" height="8" rx="1.5" />
      <path d="M17 11h2.5a1.5 1.5 0 0 1 1.5 1.5V16H17" />
      <path d="M6 9V7m4 2V7m4 2V7" />
      <path d="M6 20v-3m8 3v-3" />
    </svg>
  );
}

export function IconGauge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="m12 14 4-3.5" />
      <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
    </svg>
  );
}

export function IconHeat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3c1 2.5-1.5 3.5-1.5 6A2.5 2.5 0 0 0 10 11.5" />
      <path d="M14 3c1 2.5-1.5 3.5-1.5 6a2.5 2.5 0 0 0 2.5 2.5" />
      <path d="M6 15h12M6 18h12M6 21h12" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
