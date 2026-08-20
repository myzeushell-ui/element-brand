import { Container } from "../ui/Container";
import { Logo } from "../Logo";
import { company, footerNav, nav, phoneHref } from "@/lib/config";

const hrefFor = (label: string) =>
  nav.find((n) => n.label === label)?.href ?? "#main";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-[13px] text-ink-3">{company.copyright}</p>
          </div>

          <nav aria-label="Навигация в подвале" className="md:justify-self-center">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {footerNav.map((label) => (
                <li key={label}>
                  <a href={hrefFor(label)} className="text-[15px] font-medium text-ink hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:text-right">
            <a href={phoneHref} className="block text-lg font-bold text-ink hover:text-accent">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="mt-1 block text-[15px] text-ink-2 hover:text-accent">
              {company.email}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
