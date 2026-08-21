import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { company } from "@/lib/config";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-prose">
          <Link href="/" className="text-sm font-medium text-accent hover:text-accent-strong">
            ← На главную
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-ink">{title}</h1>
          <div className="mt-4 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink-2">
            {company.legalName} · ИНН {company.inn} ·{" "}
            <a href={`mailto:${company.email}`} className="text-accent">
              {company.email}
            </a>
          </div>
          <div className="prose-legal mt-8 space-y-4 text-[15px] leading-relaxed text-ink-2 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
          <p className="mt-10 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Шаблонный текст. Перед публикацией финальную редакцию должен согласовать
            юрист компании.
          </p>
        </div>
      </Container>
    </article>
  );
}
