import { Container } from "../ui/Container";
import { Cta } from "../Cta";
import { InlineSvg } from "../InlineSvg";
import { heroAdvantages } from "@/lib/data";
import { CONTACT_ID, CTA } from "@/lib/config";
import { IconShield, IconGear, IconBadge, IconDownload } from "../icons";

const advIcons = [IconShield, IconGear, IconBadge];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white to-paper">
      <Container>
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:py-16">
          {/* Текстовая часть */}
          <div className="max-w-xl">
            <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-accent">
              Газопоршневые электростанции
            </p>
            <h1 className="text-display font-extrabold text-ink text-balance">
              Надёжные энергетические решения для вашего бизнеса
            </h1>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-ink-2">
              Высокоэффективные газопоршневые установки «ЭЛЕМЕНТ» для автономного и
              резервного энергоснабжения промышленных предприятий и инфраструктурных
              объектов.
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-3">
              {heroAdvantages.map((a, i) => {
                const Icon = advIcons[i] ?? IconShield;
                return (
                  <li key={a.title} className="flex flex-col gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon width={20} height={20} />
                    </span>
                    <span className="text-[13.5px] font-medium leading-snug text-ink-2">
                      {a.title}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Cta
                href={`#${CONTACT_ID}`}
                event="hero_calculation_click"
                eventParams={{ placement: "hero" }}
              >
                {CTA.choose}
              </Cta>
              <Cta
                href={`#${CONTACT_ID}`}
                variant="secondary"
                event="catalog_download_click"
                eventParams={{ placement: "hero" }}
              >
                {CTA.catalog}
                <span className="text-xs font-semibold text-ink-3">PDF</span>
                <IconDownload width={16} height={16} />
              </Cta>
            </div>
          </div>

          {/* Продуктовый визуал */}
          <div className="relative">
            <InlineSvg
              src="images/gpu-hero.svg"
              className="mx-auto w-full max-w-[640px] [&>svg]:h-auto [&>svg]:w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
