import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { applications } from "@/lib/data";
import { CONTACT_ID } from "@/lib/config";
import {
  IconArrowRight,
  IconFactory,
  IconOil,
  IconCrane,
  IconServer,
  IconMedical,
} from "../icons";
import type { SVGProps } from "react";

const iconMap: Record<string, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  factory: IconFactory,
  oil: IconOil,
  crane: IconCrane,
  server: IconServer,
  medical: IconMedical,
};

export function Applications() {
  return (
    <section id="applications" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          {/* Текст */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-accent">
              Применение решений
            </p>
            <h2 className="mt-4 text-h2 font-extrabold leading-[1.05] text-ink">
              Где применяются
              <br />
              наши решения
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-2">
              ГПУ «ЭЛЕМЕНТ» обеспечивают стабильное питание там, где остановка
              недопустима. Мы понимаем требования различных отраслей и предлагаем решения
              под реальные задачи.
            </p>
            <a
              href={`#${CONTACT_ID}`}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:text-accent-strong"
            >
              Смотреть кейсы
              <IconArrowRight width={18} height={18} />
            </a>
          </div>

          {/* Карточки */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {applications.map((a, i) => {
              const Icon = iconMap[a.icon] ?? IconFactory;
              return (
                <Reveal
                  as="article"
                  key={a.title}
                  delay={i * 50}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white"
                >
                  {/* Изобразительная плитка (единый тон). На бизнес-подтверждение: заменить реальными фото. */}
                  <div className="relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-[#2A3A52] to-[#101826]">
                    <Icon width={44} height={44} className="text-white/25" />
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(46,111,196,0.28),transparent_60%)]" />
                  </div>
                  <div className="flex items-start gap-2.5 p-4">
                    <Icon width={20} height={20} className="mt-0.5 flex-none text-accent" />
                    <h3 className="text-[14px] font-semibold leading-snug text-ink">
                      {a.title}
                    </h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
