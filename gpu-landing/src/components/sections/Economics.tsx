import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../Reveal";
import { Cta } from "../Cta";
import { economicsFactors } from "@/lib/data";
import { CONFIGURATOR_ID } from "@/lib/config";

export function Economics() {
  return (
    <section id="economics" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Экономика"
              title="Посчитаем экономику собственной генерации для вашего предприятия"
            />
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-2">
              Стоимость собственной электроэнергии нельзя корректно определить одной
              универсальной цифрой. Для предварительного расчёта необходимо учитывать
              параметры конкретного объекта.
            </p>
            <Cta
              href={`#${CONFIGURATOR_ID}`}
              event="hero_calculation_click"
              eventParams={{ placement: "economics" }}
              className="mt-8 !w-full sm:!w-auto"
            >
              Получить предварительный расчёт
            </Cta>
          </div>

          {/* Инженерная сетка входных параметров, не рекламный калькулятор */}
          <Reveal className="rounded-2xl border border-line bg-white p-2 shadow-card">
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
              {economicsFactors.map((f) => (
                <div key={f.n} className="flex items-start gap-4 p-5">
                  <span className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-accent">
                    {f.n}
                  </span>
                  <span className="text-[15px] font-medium leading-snug text-ink">
                    {f.label}
                  </span>
                </div>
              ))}
              <div className="flex items-center p-5 text-sm text-ink-3 sm:col-span-2">
                Экономика проекта зависит от тарифа на электроэнергию, стоимости газа,
                профиля нагрузки, режима эксплуатации, времени работы и использования тепла.
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
