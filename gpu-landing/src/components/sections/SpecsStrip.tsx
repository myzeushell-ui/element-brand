import { Container } from "../ui/Container";
import { specs } from "@/lib/data";

/**
 * Тонкая полоса характеристик как в референсе.
 * Значения — на бизнес-подтверждение (см. src/lib/data.ts).
 */
export function SpecsStrip() {
  return (
    <section id="specs" aria-label="Технические характеристики" className="scroll-mt-24 border-y border-line bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-x divide-line/70 sm:grid-cols-3 lg:grid-cols-6">
          {specs.map((s) => (
            <div key={s.label} className="px-4 py-7 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-ink">{s.value}</dd>
              <p className="mt-1.5 text-[13px] text-ink-3">{s.label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
