import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../Reveal";
import { process, proof } from "@/lib/data";
import { company } from "@/lib/config";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Как мы работаем"
          title="От исходных данных до запуска оборудования"
          subtitle={
            <>
              {company.brand} — российский производитель газопоршневых установок.
              Конфигурация оборудования определяется задачей и параметрами конкретного объекта.
            </>
          }
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 60}
              className="relative rounded-xl border border-line bg-white p-6 shadow-card"
            >
              <span className="font-mono text-sm font-semibold tabular-nums text-accent">
                {step.n}
              </span>
              <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="grid gap-0 sm:grid-cols-[auto_minmax(0,1fr)]">
            <div className="flex items-center justify-center bg-accent px-8 py-6 text-white sm:px-10">
              <div className="text-center">
                <div className="text-4xl font-extrabold leading-none">5×230</div>
                <div className="mt-1 text-sm font-medium text-white/80">кВт</div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Пример реализованного решения
              </p>
              <h3 className="mt-2 text-lg font-bold text-ink">{proof.title}</h3>
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">
                {proof.text}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
