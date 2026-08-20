import { Container } from "../ui/Container";
import { Logo } from "../Logo";
import { company, legalLinks } from "@/lib/config";

export function Footer() {
  const year = 2025; // фиксируем, чтобы SSG-вывод был детерминирован

  return (
    <footer className="border-t border-line bg-paper py-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo className="flex items-center gap-2" />
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              {company.legalName}
              <br />
              ИНН: {company.inn}
            </p>
            <p className="mt-3 text-sm text-ink-2">
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-ink hover:text-accent"
              >
                {company.email}
              </a>
            </p>
            {company.phone && (
              <p className="mt-1 text-sm text-ink-2">
                <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`} className="hover:text-accent">
                  {company.phone}
                </a>
              </p>
            )}
          </div>

          <nav aria-label="Правовая информация">
            <ul className="flex flex-col gap-2 text-sm md:items-end">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-2 hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs text-ink-3">
          © {year} {company.legalName}. Газопоршневые установки для предприятий.
        </div>
      </Container>
    </footer>
  );
}
