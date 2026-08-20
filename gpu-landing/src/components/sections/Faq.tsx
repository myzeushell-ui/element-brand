import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { faq } from "@/lib/data";

/**
 * Нативный доступный аккордеон на <details>/<summary>:
 * работает без JS, доступен с клавиатуры, корректная семантика.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-line bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Вопросы"
          title="Что обычно нужно определить перед подбором ГПУ"
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left focus-visible:outline-none">
                <h3 className="text-base font-semibold text-ink sm:text-lg">{item.q}</h3>
                <span
                  aria-hidden
                  className="relative mt-1 h-4 w-4 flex-none text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                </span>
              </summary>
              <p className="max-w-prose pb-5 text-[15px] leading-relaxed text-ink-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
