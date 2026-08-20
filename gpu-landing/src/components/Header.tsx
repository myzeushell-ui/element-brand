"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { Cta } from "./Cta";
import { IconMenu, IconClose } from "./icons";
import { nav, CONFIGURATOR_ID, CTA } from "@/lib/config";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-4">
          <a
            href="#main"
            className="flex items-center gap-2 rounded-md py-1"
            aria-label="ЭЛЕМЕНТ — наверх"
          >
            <Logo className="flex items-center gap-2" />
          </a>

          <nav aria-label="Основная навигация" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="rounded-md px-3 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Cta
              href={`#${CONFIGURATOR_ID}`}
              size="md"
              event="hero_calculation_click"
              eventParams={{ placement: "header" }}
              className="!w-auto"
            >
              {CTA.primaryShort}
            </Cta>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink md:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <Container>
          <nav aria-label="Мобильная навигация" className="py-3">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-base font-medium text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Cta
              href={`#${CONFIGURATOR_ID}`}
              size="lg"
              event="hero_calculation_click"
              eventParams={{ placement: "mobile-menu" }}
              onClick={() => setOpen(false)}
              className="mt-2"
            >
              {CTA.primaryShort}
            </Cta>
          </nav>
        </Container>
      </div>
    </header>
  );
}
