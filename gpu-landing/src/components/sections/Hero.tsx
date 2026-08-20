import Image from "next/image";
import { Container } from "../ui/Container";
import { Cta } from "../Cta";
import { heroAdvantages } from "@/lib/data";
import { CONTACT_ID, CTA } from "@/lib/config";
import { IconShield, IconGear, IconBadge, IconDownload } from "../icons";

const advIcons = [IconShield, IconGear, IconBadge];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white to-paper">
      <Container>
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:py-16">
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
              <Cta href={`#${CONTACT_ID}`} event="hero_calculation_click" eventParams={{ placement: "hero" }}>
                {CTA.choose}
              </Cta>
              <Cta href={`#${CONTACT_ID}`} variant="secondary" event="catalog_download_click" eventParams={{ placement: "hero" }}>
                {CTA.catalog}
                <span className="text-xs font-semibold text-ink-3">PDF</span>
                <IconDownload width={16} height={16} />
              </Cta>
            </div>
          </div>

          {/* Продуктовый визуал: фото на инженерной сетке с габаритами */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,#E7EBF1_1px,transparent_1px),linear-gradient(to_bottom,#E7EBF1_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(80%_80%_at_60%_45%,#000,transparent)]"
            />
            <div className="relative">
              <Image
                src="/images/genset.png"
                alt="Газопоршневая установка ЭЛЕМЕНТ для собственной генерации электроэнергии"
                width={1448}
                height={1086}
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="h-auto w-full"
              />
              <svg
                aria-hidden
                viewBox="0 0 1448 1086"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <g stroke="#B4BBC5" strokeWidth="2" fill="none">
                  <line x1="1422" y1="150" x2="1422" y2="1000" />
                  <line x1="1414" y1="150" x2="1430" y2="150" />
                  <line x1="1414" y1="1000" x2="1430" y2="1000" />
                  <line x1="70" y1="1045" x2="1240" y2="1045" />
                  <line x1="70" y1="1037" x2="70" y2="1053" />
                  <line x1="1240" y1="1037" x2="1240" y2="1053" />
                  <line x1="1240" y1="1045" x2="1410" y2="1078" />
                </g>
                <g fill="#8A929C" fontFamily="var(--font-manrope), system-ui, sans-serif" fontSize="30">
                  <text x="1452" y="575" transform="rotate(90 1452 575)" textAnchor="middle">1950 мм</text>
                  <text x="640" y="1078" textAnchor="middle">3200 мм</text>
                  <text x="1330" y="1076" textAnchor="middle">900 мм</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
