import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { powers } from "@/lib/data";
import { CONTACT_ID } from "@/lib/config";
import { IconArrowRight } from "../icons";

export function PowerRange() {
  return (
    <section id="power" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          {/* Intro-столбец */}
          <div className="lg:pt-2">
            <h2 className="text-h2 font-extrabold leading-[1.05] text-ink">
              Линейка
              <br />
              мощностей
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-2">
              Широкий диапазон мощностей для решения задач любой сложности — от
              резервного питания до постоянной работы в тяжёлых условиях.
            </p>
            <a
              href={`#${CONTACT_ID}`}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:text-accent-strong"
            >
              Смотреть все модели
              <IconArrowRight width={18} height={18} />
            </a>
          </div>

          {/* Карточки */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {powers.map((p, i) => (
              <Reveal
                as="article"
                key={p.value}
                delay={i * 60}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-200 ease-smooth hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <div className="flex items-start gap-1">
                  <span className="text-power font-extrabold leading-[0.85] text-accent">
                    {p.value}
                  </span>
                  <span className="mt-2 text-lg font-semibold text-ink-3">{p.unit}</span>
                </div>
                <p className="mt-4 min-h-[66px] text-[14.5px] leading-relaxed text-ink-2">
                  {p.note}
                </p>
                <div className="mt-auto pt-5">
                  <Image
                    src="/images/genset.png"
                    alt={`Газопоршневая установка ЭЛЕМЕНТ ${p.value} кВт`}
                    width={1448}
                    height={1086}
                    sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 22vw"
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
