import fs from "node:fs";
import path from "node:path";

/**
 * Инлайним hero-SVG прямо в разметку: нет отдельного запроса, мгновенный LCP,
 * нулевой CLS (пропорции заданы viewBox). Когда появится реальное фото ГПУ
 * (WebP/AVIF) — заменить этот компонент на next/image.
 */
let cachedSvg: string | null = null;

function loadHeroSvg(): string {
  if (cachedSvg) return cachedSvg;
  const file = path.join(process.cwd(), "public", "images", "gpu-hero.svg");
  cachedSvg = fs.readFileSync(file, "utf8");
  return cachedSvg;
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <div
      className={className}
      // SVG статичен и лежит в репозитории — безопасно инлайнить.
      dangerouslySetInnerHTML={{ __html: loadHeroSvg() }}
    />
  );
}
