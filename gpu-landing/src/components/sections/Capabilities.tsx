import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../Reveal";
import { capabilities } from "@/lib/data";
import { IconCheck } from "../icons";

export function Capabilities() {
  const main = capabilities.filter((c) => !c.separate);
  const service = capabilities.find((c) => c.separate);

  return (
    <section id="capabilities" className="scroll-mt-24 border-t border-line bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Возможности решения" title="Конфигурация под задачу объекта" />

        <ul className="mt-12 grid gap-x-10 gap-y-6 lg:grid-cols-2">
          {main.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 50} className="flex gap-4">
              <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-soft text-accent">
                <IconCheck width={15} height={15} />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">{c.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        {service && (
          <div className="mt-10 rounded-xl border border-line bg-paper p-6">
            <h3 className="text-base font-bold text-ink">{service.title}</h3>
            <p className="mt-1 max-w-prose text-[15px] leading-relaxed text-ink-2">
              {service.text}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
