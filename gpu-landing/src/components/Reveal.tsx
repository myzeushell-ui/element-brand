import type { ElementType, ReactNode } from "react";

/**
 * Контент виден всегда (без зависимости от JS/observer). Лёгкое появление —
 * чистой CSS-анимацией на загрузке (см. globals.css .reveal), которая уважает
 * prefers-reduced-motion и никогда не оставляет контент скрытым.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  return (
    <Tag
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
