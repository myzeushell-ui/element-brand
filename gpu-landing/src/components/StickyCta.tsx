"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { CONFIGURATOR_ID, CTA } from "@/lib/config";

/**
 * Ненавязчивая мобильная sticky-CTA. Появляется после hero и прячется,
 * когда пользователь уже в конфигураторе, чтобы не перекрывать форму.
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [inForm, setInForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById(CONFIGURATOR_ID);
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(
        (entries) => setInForm(entries.some((e) => e.isIntersecting)),
        { threshold: 0.15 },
      );
      io.observe(target);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const hidden = !pastHero || inForm;

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 p-4 md:hidden",
        "transition-transform duration-300 ease-smooth",
        hidden ? "translate-y-[130%]" : "translate-y-0",
      ].join(" ")}
      aria-hidden={hidden}
    >
      <a
        href={`#${CONFIGURATOR_ID}`}
        onClick={() => track("hero_calculation_click", { placement: "sticky-mobile" })}
        className="flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-6 text-base font-semibold text-white shadow-lg shadow-accent/25"
        tabIndex={hidden ? -1 : 0}
      >
        {CTA.primaryShort}
      </a>
    </div>
  );
}
