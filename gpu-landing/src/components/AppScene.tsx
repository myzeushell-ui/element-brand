import type { SVGProps } from "react";

/**
 * Оригинальные тематические иллюстрации для блока «Где применяются».
 * Не стоковые фото (без вопросов по лицензии). Единый синий инженерный стиль
 * на тёмном фоне. Когда появятся реальные лицензированные фотографии отраслей —
 * заменить этот компонент на next/image.
 */

const wrap: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 300 400",
  preserveAspectRatio: "xMidYMid slice",
  fill: "none",
  width: "100%",
  height: "100%",
  "aria-hidden": true,
  style: { display: "block" },
};

const L = "#A7C4E8"; // светлые линии
const A = "#4C86D0"; // акцент
const F = "rgba(126,163,214,0.14)"; // мягкая заливка

function Bg() {
  return (
    <>
      <defs>
        <linearGradient id="asky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22324A" />
          <stop offset="1" stopColor="#0C1524" />
        </linearGradient>
        <radialGradient id="aglow" cx="0.5" cy="0.15" r="0.9">
          <stop offset="0" stopColor="rgba(76,134,208,0.35)" />
          <stop offset="1" stopColor="rgba(76,134,208,0)" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill="url(#asky)" />
      <rect width="300" height="400" fill="url(#aglow)" />
    </>
  );
}

function Factory() {
  return (
    <svg {...wrap}>
      <Bg />
      <g stroke={L} strokeWidth="2" strokeLinejoin="round">
        {/* трубы */}
        <path d="M70 150 h26 v170 h-26 z" fill={F} />
        <path d="M104 130 h22 v190 h-22 z" fill={F} />
        <path d="M74 150 v-18 M112 130 v-16" stroke={A} />
        {/* дым */}
        <path d="M83 122 q10 -10 0 -20 q-10 -8 0 -18" stroke={A} strokeWidth="2.5" fill="none" />
        {/* корпус с зубчатой крышей */}
        <path d="M140 210 l24 -22 v22 l24 -22 v22 l24 -22 v22 l24 -22 v22 h8 v98 H140 z" fill={F} />
        {/* окна */}
        <g stroke={L} strokeWidth="1.6">
          <rect x="152" y="240" width="16" height="16" />
          <rect x="180" y="240" width="16" height="16" />
          <rect x="208" y="240" width="16" height="16" />
          <rect x="152" y="270" width="16" height="16" />
          <rect x="180" y="270" width="16" height="16" />
          <rect x="208" y="270" width="16" height="16" />
        </g>
        {/* ворота */}
        <rect x="236" y="286" width="20" height="34" fill={F} />
        {/* земля */}
        <path d="M20 320 H280" stroke={L} strokeWidth="2.5" />
      </g>
    </svg>
  );
}

function Oil() {
  return (
    <svg {...wrap}>
      <Bg />
      <g stroke={L} strokeWidth="2" strokeLinejoin="round">
        {/* вышка-дерик */}
        <path d="M110 300 L138 120 L162 120 L190 300 Z" fill={F} />
        <path d="M150 120 V300" stroke={L} strokeWidth="1.4" />
        <g stroke={L} strokeWidth="1.4">
          <path d="M124 240 H176 M128 210 H172 M132 180 H168 M136 150 H164" />
          <path d="M124 240 L172 210 M176 240 L128 210 M128 210 L168 180 M172 210 L132 180" />
        </g>
        {/* верхний блок */}
        <rect x="140" y="104" width="20" height="16" fill={F} />
        {/* факел */}
        <path d="M150 104 q6 -12 0 -22 q-6 8 0 22" stroke={A} strokeWidth="2.5" />
        {/* резервуар */}
        <ellipse cx="238" cy="278" rx="30" ry="10" fill={F} />
        <path d="M208 278 v-34 a30 10 0 0 1 60 0 v34" fill={F} />
        <path d="M208 244 a30 10 0 0 0 60 0" />
        {/* земля / трубопровод */}
        <path d="M20 300 H280" strokeWidth="2.5" />
        <path d="M60 316 H240" stroke={A} strokeWidth="2.5" />
        <circle cx="90" cy="316" r="4" fill={A} stroke="none" />
        <circle cx="210" cy="316" r="4" fill={A} stroke="none" />
      </g>
    </svg>
  );
}

function Crane() {
  return (
    <svg {...wrap}>
      <Bg />
      <g stroke={L} strokeWidth="2" strokeLinejoin="round">
        {/* строящееся здание */}
        <rect x="150" y="150" width="110" height="180" fill={F} />
        <g stroke={L} strokeWidth="1.4">
          <path d="M150 190 H260 M150 230 H260 M150 270 H260 M150 310 H260" />
          <path d="M186 150 V330 M223 150 V330" />
        </g>
        {/* башенный кран */}
        <path d="M70 330 V96" strokeWidth="2.5" />
        <path d="M60 330 H80 M58 316 L82 316" />
        <g stroke={L} strokeWidth="1.4">
          <path d="M70 120 L64 108 L76 108 Z M70 150 L64 138 L76 138 Z M70 180 L64 168 L76 168 Z M70 210 L64 198 L76 198 Z M70 250 L64 238 L76 238 Z M70 290 L64 278 L76 278 Z" />
        </g>
        {/* стрела + противовес */}
        <path d="M40 96 H210" strokeWidth="2.5" />
        <path d="M70 84 L150 96 M70 84 L40 96" />
        <rect x="34" y="96" width="16" height="14" fill={F} />
        {/* трос + крюк */}
        <path d="M170 96 V150" stroke={A} strokeWidth="1.6" />
        <path d="M164 150 h12 M170 150 v8" stroke={A} />
        <path d="M20 330 H280" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

function Server() {
  return (
    <svg {...wrap}>
      <Bg />
      <g stroke={L} strokeWidth="2" strokeLinejoin="round">
        {[40, 118, 196].map((x) => (
          <g key={x}>
            <rect x={x} y="90" width="64" height="230" fill={F} />
            <g stroke={L} strokeWidth="1.3">
              {[104, 128, 152, 176, 200, 224, 248, 272, 296].map((y) => (
                <rect key={y} x={x + 8} y={y} width="48" height="14" />
              ))}
            </g>
            <g fill={A} stroke="none">
              {[104, 152, 200, 248, 296].map((y) => (
                <circle key={y} cx={x + 14} cy={y + 7} r="2.4" />
              ))}
            </g>
          </g>
        ))}
        {/* фальшпол */}
        <path d="M20 320 H280 M20 336 H280" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

function Medical() {
  return (
    <svg {...wrap}>
      <Bg />
      <g stroke={L} strokeWidth="2" strokeLinejoin="round">
        {/* корпус больницы */}
        <rect x="96" y="110" width="108" height="210" fill={F} />
        <g stroke={L} strokeWidth="1.4">
          {[130, 160, 190, 220, 250].map((y) =>
            [104, 128, 152, 176].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="14" height="18" />
            )),
          )}
        </g>
        {/* крест-вывеска */}
        <rect x="132" y="78" width="36" height="36" rx="4" fill={F} />
        <path d="M150 86 V106 M140 96 H160" stroke={A} strokeWidth="3" />
        {/* вход */}
        <rect x="138" y="288" width="24" height="32" fill={F} />
        {/* пристройка */}
        <rect x="204" y="200" width="46" height="120" fill={F} />
        <g stroke={L} strokeWidth="1.4">
          <path d="M204 230 H250 M204 260 H250 M204 290 H250" />
        </g>
        <path d="M20 320 H280" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

const scenes: Record<string, () => React.ReactElement> = {
  factory: Factory,
  oil: Oil,
  crane: Crane,
  server: Server,
  medical: Medical,
};

export function AppScene({ name, className }: { name: string; className?: string }) {
  const Scene = scenes[name] ?? Factory;
  return (
    <div className={className}>
      <Scene />
    </div>
  );
}
