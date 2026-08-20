"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { IconCheck } from "../icons";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { readUtm } from "@/lib/utm";
import { contactBenefits } from "@/lib/data";
import { legalLinks, CTA } from "@/lib/config";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;

    if (!form.name.trim() || !form.company.trim()) {
      setError("Укажите имя и компанию.");
      return;
    }
    if (!form.phone.trim() && !isEmail(form.email)) {
      setError("Оставьте телефон или корректный e-mail для связи.");
      return;
    }
    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных.");
      return;
    }

    setError(null);
    setStatus("loading");
    track("lead_submit", { source: "contact-form" });

    const payload = {
      name: form.name.trim(),
      company: form.company.trim(),
      phone: form.phone.trim() || undefined,
      email: form.email.trim() || undefined,
      comment: form.comment.trim() || undefined,
      power: "unknown" as const,
      purposes: [] as string[],
      source: "gpu-landing/contact-form",
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      ...readUtm(),
      company_website: honeypot,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      track("lead_success");
    } catch {
      setStatus("error");
      setError("Не удалось отправить запрос. Попробуйте ещё раз или напишите на e-mail.");
      track("lead_error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12">
          {/* Технический чертёж на фоне справа */}
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративный статичный SVG */}
          <img
            src="/images/gpu-blueprint.svg"
            alt=""
            aria-hidden="true"
            width={1040}
            height={700}
            className="pointer-events-none absolute -right-10 top-1/2 hidden w-[42%] max-w-[560px] -translate-y-1/2 opacity-70 xl:block"
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.55fr)]">
            {/* Левая колонка */}
            <div>
              <h2 className="text-h2 font-extrabold leading-[1.08] text-ink">
                Запросите расчёт
                <br />
                <span className="text-accent">и консультацию</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
                Наши инженеры свяжутся с вами, чтобы уточнить детали и подготовить
                оптимальное предложение для вашего проекта.
              </p>
              <ul className="mt-7 space-y-3.5">
                {contactBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] text-ink">
                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-soft text-accent">
                      <IconCheck width={13} height={13} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Форма */}
            <div className="xl:col-start-2">
              {status === "success" ? (
                <SuccessPanel />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* honeypot */}
                  <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Не заполняйте
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Ваше имя" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
                    <Field id="company" label="Компания" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} autoComplete="organization" />
                    <Field id="phone" label="Телефон" required type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} autoComplete="tel" />
                    <Field id="email" label="E-mail" required type="email" inputMode="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} autoComplete="email" />
                  </div>
                  <div className="mt-4">
                    <Field id="comment" label="Опишите задачу или объект" textarea value={form.comment} onChange={(v) => setForm({ ...form, comment: v })} hideLabel placeholder="Опишите задачу или объект" />
                  </div>

                  <label className="mt-4 flex items-start gap-3 text-[13.5px] text-ink-2">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 flex-none accent-accent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <span>
                      Согласен на обработку{" "}
                      <a href={legalLinks[1].href} className="text-accent underline underline-offset-2">
                        персональных данных
                      </a>
                    </span>
                  </label>

                  <div aria-live="polite" className="min-h-[1.25rem]">
                    {error && (
                      <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-accent px-8 text-[15px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                  >
                    {status === "loading" ? "Отправляем…" : CTA.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  placeholder,
  hideLabel,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  hideLabel?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
}) {
  const cls =
    "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent-ring";
  return (
    <div>
      <label htmlFor={id} className={cn("mb-1.5 block text-sm font-medium text-ink", hideLabel && "sr-only")}>
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {textarea ? (
        <textarea id={id} rows={4} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input id={id} type={type} required={required} placeholder={placeholder} inputMode={inputMode} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

function SuccessPanel() {
  return (
    <div className="flex h-full flex-col justify-center py-8 text-center" role="status" aria-live="polite">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <IconCheck width={26} height={26} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">Запрос отправлен</h3>
      <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink-2">
        Мы получили ваши данные. Инженер свяжется с вами, чтобы уточнить детали и
        подготовить предложение.
      </p>
    </div>
  );
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
