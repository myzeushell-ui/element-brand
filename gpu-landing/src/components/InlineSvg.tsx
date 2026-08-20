import fs from "node:fs";
import path from "node:path";

/**
 * Инлайнит статический SVG из /public прямо в разметку: без отдельного запроса,
 * мгновенный LCP, нулевой CLS (пропорции заданы viewBox). Когда появится реальное
 * фото ГПУ (WebP/AVIF) — заменить hero-визуал на next/image.
 */
const cache = new Map<string, string>();

function load(relPublicPath: string): string {
  const cached = cache.get(relPublicPath);
  if (cached) return cached;
  const file = path.join(process.cwd(), "public", relPublicPath);
  const svg = fs.readFileSync(file, "utf8");
  cache.set(relPublicPath, svg);
  return svg;
}

export function InlineSvg({ src, className }: { src: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: load(src) }} />;
}
