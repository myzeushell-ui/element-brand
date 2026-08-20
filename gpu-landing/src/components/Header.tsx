"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { Cta } from "./Cta";
import { IconMenu, IconClose } from "./icons";
import { nav, company, phoneHref, CONTACT_ID, CTA } from "@/lib/config";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          <a href="#main" aria-label="ЭЛЕМЕНТ — наверх" className="rounded-md py-1">
            <Logo />
          </a>

          <nav aria-label="Основная навигация" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[15px] font-medium text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={phoneHref}
              className="whitespace-nowrap text-[15px] font-semibold text-ink hover:text-accent"
            >
              {company.phone}
            </a>
            <Cta
              href={`#${CONTACT_ID}`}
              size="md"
              event="hero_calculation_click"
              eventParams={{ placement: "header" }}
              className="!w-auto"
            >
              {CTA.request}
            </Cta>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <Container>
          <nav aria-label="Мобильная навигация" className="py-3">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-base font-medium text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-3 border-t border-line pt-3">
              <a href={phoneHref} className="px-2 text-base font-semibold text-ink">
                {company.phone}
              </a>
              <Cta
                href={`#${CONTACT_ID}`}
                event="hero_calculation_click"
                eventParams={{ placement: "mobile-menu" }}
                onClick={() => setOpen(false)}
              >
                {CTA.request}
              </Cta>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
