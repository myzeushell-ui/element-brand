import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../Reveal";
import { useCases } from "@/lib/data";
import { IconGenerator, IconGauge, IconGrid, IconHeat } from "../icons";

const icons = [IconGenerator, IconGauge, IconGrid, IconHeat];

export function UseCases() {
  return (
    <section id="use-cases" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Задачи предприятия"
          title="Когда предприятию нужна собственная генерация"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((c, i) => {
            const Icon = icons[i] ?? IconGenerator;
            return (
              <Reveal
                as="article"
                key={c.title}
                delay={i * 60}
                className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card"
              >
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon />
                </span>
                <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{c.text}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
