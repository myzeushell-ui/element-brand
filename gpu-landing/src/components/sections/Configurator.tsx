"use client";

import { useRef, useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { IconArrowRight, IconCheck } from "../icons";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { readUtm } from "@/lib/utm";
import { configPowerOptions, configPurposeOptions } from "@/lib/data";
import { legalLinks } from "@/lib/config";
import type { PowerValue } from "@/lib/types";

type Status = "idle" | "loading" | "success" | "error";

export function Configurator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [power, setPower] = useState<PowerValue | null>(null);
  const [purposes, setPurposes] = useState<string[]>([]);
  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    region: "",
    comment: "",
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  function ensureStarted() {
    if (!started.current) {
      started.current = true;
      track("configurator_started");
    }
  }

  function choosePower(value: PowerValue) {
    ensureStarted();
    setPower(value);
    track("power_selected", { power: value });
  }

  function togglePurpose(value: string) {
    ensureStarted();
    setPurposes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  function goStep2() {
    if (!power) {
      setError("Выберите требуемую мощность или вариант «Не знаю».");
      return;
    }
    setError(null);
    track("configurator_step_completed", { step: 1 });
    setStep(2);
  }

  function goStep3() {
    setError(null);
    track("configurator_step_completed", { step: 2 });
    setStep(3);
  }

  const contactValid = form.phone.trim().length >= 5 || isEmail(form.email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // бот заполнил скрытое поле
    if (!power) {
      setStep(1);
      setError("Выберите требуемую мощность.");
      return;
    }
    if (!contactValid) {
      setError("Укажите телефон или корректный email — чтобы инженер мог ответить.");
      return;
    }
    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных.");
      return;
    }

    setError(null);
    setStatus("loading");
    track("lead_submit", { power, purposes });

    const utm = readUtm();
    const payload = {
      company: form.company.trim() || undefined,
      name: form.name.trim() || undefined,
      phone: form.phone.trim() || undefined,
      email: form.email.trim() || undefined,
      region: form.region.trim() || undefined,
      power,
      purposes,
      comment: form.comment.trim() || undefined,
      source: "gpu-landing/configurator",
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      ...utm,
      company_website: honeypot, // honeypot (сервер отбросит, если непусто)
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      track("lead_success", { power });
    } catch {
      setStatus("error");
      setError("Не удалось отправить заявку. Попробуйте ещё раз или напишите на email.");
      track("lead_error", { power });
    }
  }

  return (
    <section
      id="configurator"
      className="scroll-mt-24 border-t border-line bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Подбор"
          title="Подберём ГПУ под ваш объект"
          subtitle="Ответьте на несколько вопросов — инженер получит исходные данные для предварительного подбора."
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8">
            {status === "success" ? (
              <SuccessPanel />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <Stepper step={step} />

                {/* honeypot: скрыто от людей, доступно ботам */}
                <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Не заполняйте это поле
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>

                {step === 1 && (
                  <fieldset className="mt-6">
                    <legend className="text-base font-semibold text-ink">
                      Какая электрическая мощность требуется?
                    </legend>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {configPowerOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-3 text-[15px] transition-colors",
                            power === opt.value
                              ? "border-accent ring-1 ring-accent"
                              : "border-line hover:border-line-strong",
                          )}
                        >
                          <input
                            type="radio"
                            name="power"
                            className="h-4 w-4 accent-accent"
                            checked={power === opt.value}
                            onChange={() => choosePower(opt.value)}
                          />
                          <span className="font-medium text-ink">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset className="mt-6">
                    <legend className="text-base font-semibold text-ink">
                      Как планируется использовать ГПУ?
                    </legend>
                    <p className="mt-1 text-sm text-ink-3">Можно выбрать несколько вариантов.</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {configPurposeOptions.map((opt) => {
                        const checked = purposes.includes(opt.value);
                        return (
                          <label
                            key={opt.value}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-3 text-[15px] transition-colors",
                              checked
                                ? "border-accent ring-1 ring-accent"
                                : "border-line hover:border-line-strong",
                            )}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 accent-accent"
                              checked={checked}
                              onChange={() => togglePurpose(opt.value)}
                            />
                            <span className="font-medium text-ink">{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <div className="mt-6 grid gap-4">
                    <Field id="company" label="Компания" value={form.company} onChange={(v) => setForm({ ...form, company: v })} autoComplete="organization" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="name" label="Имя" value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
                      <Field id="region" label="Город / регион" value={form.region} onChange={(v) => setForm({ ...form, region: v })} autoComplete="address-level1" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="phone" label="Телефон" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} autoComplete="tel" inputMode="tel" hint="телефон или email" />
                      <Field id="email" label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} autoComplete="email" inputMode="email" hint="телефон или email" />
                    </div>
                    <Field id="comment" label="Комментарий об объекте" optional value={form.comment} onChange={(v) => setForm({ ...form, comment: v })} textarea />

                    <label className="mt-1 flex items-start gap-3 text-sm text-ink-2">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 flex-none accent-accent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        Я согласен на обработку персональных данных в соответствии с{" "}
                        <a href={legalLinks[1].href} className="text-accent underline underline-offset-2">
                          политикой обработки данных
                        </a>
                        .
                      </span>
                    </label>
                  </div>
                )}

                {/* aria-live: озвучивает ошибки скринридерам */}
                <div aria-live="polite" className="min-h-[1.25rem]">
                  {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                      {error}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2) : s))}
                      className="min-h-[44px] rounded-lg px-4 text-[15px] font-medium text-ink-2 hover:text-ink"
                    >
                      Назад
                    </button>
                  ) : (
                    <span />
                  )}

                  {step === 1 && (
                    <NextButton onClick={goStep2}>Далее</NextButton>
                  )}
                  {step === 2 && (
                    <NextButton onClick={goStep3}>Далее</NextButton>
                  )}
                  {step === 3 && (
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                    >
                      {status === "loading" ? "Отправляем…" : "Получить расчёт"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Мощность", "Задача", "Контакты"];
  return (
    <div className="flex items-center gap-2" aria-hidden>
      {labels.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const active = n <= step;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold",
                active ? "bg-accent text-white" : "bg-line text-ink-3",
              )}
            >
              {n < step ? <IconCheck width={14} height={14} /> : n}
            </div>
            <span
              className={cn(
                "hidden text-xs font-medium sm:inline",
                active ? "text-ink" : "text-ink-3",
              )}
            >
              {label}
            </span>
            {i < labels.length - 1 && <div className="h-px flex-1 bg-line" />}
          </div>
        );
      })}
    </div>
  );
}

function NextButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
    >
      {children}
      <IconArrowRight width={18} height={18} />
    </button>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  optional,
  textarea,
  hint,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  optional?: boolean;
  textarea?: boolean;
  hint?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
}) {
  const cls =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent-ring";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-ink-3">(необязательно)</span>}
        {hint && <span className="text-xs font-normal text-ink-3">· {hint}</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

function SuccessPanel() {
  return (
    <div className="py-6 text-center" role="status" aria-live="polite">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <IconCheck width={26} height={26} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">Заявка отправлена</h3>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-2">
        Исходные данные переданы для предварительного подбора ГПУ. Инженер свяжется с вами.
      </p>
    </div>
  );
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
