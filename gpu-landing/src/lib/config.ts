/**
 * Единый источник контактов, навигации и настроек лендинга.
 *
 * ВНИМАНИЕ (на бизнес-подтверждение): значения контактов взяты из ТЗ/референса
 * и НЕ подтверждены источником фактов (df2597.creatium.site — там контактов нет).
 * Проверить перед публикацией.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://element-power.ru"
).replace(/\/$/, "");

export const company = {
  brand: "ЭЛЕМЕНТ",
  legalName: "ООО «ЭЛЕМЕНТ»",
  inn: "1218002079",
  // Контакты из ТЗ (референс). Требуют подтверждения.
  phone: "8 800 500-39-65",
  email: "info@element-power.ru",
  copyright: "© 2024 «ЭЛЕМЕНТ». Все права защищены.",
};

/** Навигация как в референсе; на одностраничнике ведёт к ближайшим секциям. */
export const nav: { label: string; href: string }[] = [
  { label: "Оборудование", href: "#power" },
  { label: "Решения", href: "#applications" },
  { label: "Проекты", href: "#workflow" },
  { label: "Сервис", href: "#workflow" },
  { label: "Компания", href: "#specs" },
  { label: "Контакты", href: "#contact" },
];

export const footerNav = [
  "Оборудование",
  "Решения",
  "Проекты",
  "Сервис",
  "Компания",
  "Контакты",
];

export const legalLinks: { href: string; label: string }[] = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/consent", label: "Пользовательское соглашение" },
];

export const CTA = {
  request: "Запросить расчёт",
  choose: "Подобрать решение",
  catalog: "Скачать каталог",
  submit: "Отправить запрос",
} as const;

export const CONTACT_ID = "contact";
export const phoneHref = `tel:${company.phone.replace(/[^+\d]/g, "")}`;
