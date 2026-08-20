import { Container } from "../ui/Container";
import { Cta } from "../Cta";
import { CONFIGURATOR_ID, CTA } from "@/lib/config";

export function FinalCta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-64 w-[80%] rounded-full bg-accent/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-h2 font-extrabold text-white text-balance">
              Нужна ГПУ для вашего объекта?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70">
              Передайте исходные данные — подберём мощность и подготовим предварительный
              расчёт.
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              <Cta
                href={`#${CONFIGURATOR_ID}`}
                event="hero_calculation_click"
                eventParams={{ placement: "final" }}
              >
                {CTA.primaryShort}
              </Cta>
              <Cta
                href={`#${CONFIGURATOR_ID}`}
                variant="ghost"
                event="engineer_contact_click"
                eventParams={{ placement: "final" }}
                className="!text-white hover:!bg-white/10 hover:!text-white"
              >
                {CTA.secondary}
              </Cta>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
