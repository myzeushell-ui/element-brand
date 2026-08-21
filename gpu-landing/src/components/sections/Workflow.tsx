import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { workflow } from "@/lib/data";

export function Workflow() {
  return (
    <section id="workflow" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <Container>
        <h2 className="text-h2 font-extrabold text-ink">Как мы работаем</h2>

        <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {workflow.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 60}
              className="relative sm:pr-6 lg:border-r lg:border-dashed lg:border-line lg:last:border-r-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold tabular-nums text-accent">
                  {step.n}
                </span>
                <span aria-hidden className="hidden h-px flex-1 bg-line lg:block" />
                <span aria-hidden className="hidden h-1.5 w-1.5 rounded-full bg-line-strong lg:block" />
              </div>
              <h3 className="mt-4 text-[15px] font-bold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[15rem] text-[14px] leading-relaxed text-ink-2">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
