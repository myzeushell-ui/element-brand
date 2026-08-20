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

export function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconGear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
    </svg>
  );
}

export function IconBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9 13.5-1.5 6L12 17l4.5 2.5-1.5-6" />
    </svg>
  );
}

export function IconDownload(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />
    </svg>
  );
}

export function IconFactory(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20h18M4 20V9l5 3.5V9l5 3.5V9l5 3.5V20" />
      <path d="M6 6V4M6 6h.01" />
    </svg>
  );
}

export function IconOil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s5 5.5 5 9.5A5 5 0 0 1 7 12.5C7 8.5 12 3 12 3z" />
    </svg>
  );
}

export function IconCrane(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V5l14 2M5 5l3 3" />
      <path d="M12 5.9V11m0 0-2 2m2-2 2 2M9 21h6" />
    </svg>
  );
}

export function IconServer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </svg>
  );
}

export function IconMedical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8m-4-4h8" />
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
