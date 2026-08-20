import { Container } from "../ui/Container";
import { Cta } from "../Cta";
import { HeroArt } from "../HeroArt";
import { company, CONFIGURATOR_ID, CTA } from "@/lib/config";

const trust = ["Российский производитель", "Подбор под объект", "Решения 65–230 кВт"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20">
      {/* мягкий акцентный ореол за изображением, без агрессивных градиентов */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-6%] hidden h-[520px] w-[520px] rounded-full bg-accent-soft blur-3xl lg:block"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              Газопоршневые установки {company.brand}
            </p>
            <h1 className="text-display font-extrabold text-ink text-balance">
              Газопоршневые установки&nbsp;65–230&nbsp;кВт для предприятий
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-2">
              Собственная электроэнергия для производственных, коммерческих и
              инфраструктурных объектов. Подберём мощность и конфигурацию ГПУ под
              нагрузку и условия вашего объекта.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Cta
                href={`#${CONFIGURATOR_ID}`}
                event="hero_calculation_click"
                eventParams={{ placement: "hero" }}
              >
                {CTA.primary}
              </Cta>
              <Cta
                href={`#${CONFIGURATOR_ID}`}
                variant="secondary"
                event="engineer_contact_click"
                eventParams={{ placement: "hero" }}
              >
                {CTA.secondary}
              </Cta>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
              {trust.map((t, i) => (
                <li key={t} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden className="hidden h-1 w-1 rounded-full bg-line-strong sm:inline-block" />
                  )}
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="relative rounded-2xl border border-line bg-white p-4 shadow-card sm:p-6">
              <HeroArt className="mx-auto w-full max-w-[560px] [&>svg]:h-auto [&>svg]:w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
