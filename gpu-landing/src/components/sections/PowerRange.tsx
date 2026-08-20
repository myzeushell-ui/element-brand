import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../Reveal";
import { Cta } from "../Cta";
import { powers } from "@/lib/data";
import { CONFIGURATOR_ID } from "@/lib/config";

export function PowerRange() {
  return (
    <section id="power" className="scroll-mt-24 border-y border-line bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Мощности"
          title="ГПУ ЭЛЕМЕНТ — 65–230 кВт"
          subtitle="Подбор мощности выполняется по фактической нагрузке объекта, режиму эксплуатации и требованиям к схеме электроснабжения."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {powers.map((p, i) => (
            <Reveal
              as="article"
              key={p.value}
              delay={i * 60}
              className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-all duration-200 ease-smooth hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-power font-extrabold leading-none text-ink transition-colors group-hover:text-accent">
                  {p.value}
                </span>
                <span className="text-lg font-semibold text-ink-3">{p.unit}</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{p.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-ink">
            Не знаете, какая мощность нужна? Рассчитаем по вашему профилю нагрузки.
          </p>
          <Cta
            href={`#${CONFIGURATOR_ID}`}
            size="md"
            event="hero_calculation_click"
            eventParams={{ placement: "power" }}
            className="!w-full sm:!w-auto"
          >
            Подобрать мощность
          </Cta>
        </div>
      </Container>
    </section>
  );
}
