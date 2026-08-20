/**
 * Единый источник контактных данных, ссылок и настроек площадки.
 * Ничего не выдумываем: телефон не подтверждён — оставлен null.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://elementkb.ru"
).replace(/\/$/, "");

export const company = {
  brand: "ЭЛЕМЕНТ",
  legalName: "ООО «ЭЛЕМЕНТ»",
  inn: "1218002079",
  email: "sales@elementkb.ru",
  /** Подтверждённого коммерческого телефона в проекте нет — не показываем. */
  phone: null as string | null,
  regionNote: "Россия",
};

export const nav: { id: string; label: string }[] = [
  { id: "use-cases", label: "Задачи" },
  { id: "power", label: "Мощности" },
  { id: "economics", label: "Экономика" },
  { id: "configurator", label: "Подбор" },
  { id: "faq", label: "FAQ" },
];

export const legalLinks: { href: string; label: string }[] = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/consent", label: "Согласие на обработку персональных данных" },
];

export const CTA = {
  primary: "Рассчитать ГПУ для моего объекта",
  primaryShort: "Рассчитать ГПУ",
  secondary: "Обсудить задачу с инженером",
} as const;

/** Якорь, к которому ведут все CTA (мини-конфигуратор). */
export const CONFIGURATOR_ID = "configurator";
