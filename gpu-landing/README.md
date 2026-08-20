# ЭЛЕМЕНТ — SEO-лендинг ГПУ 65–230 кВт

Конверсионный лендинг газопоршневых установок «ЭЛЕМЕНТ», собранный по выбранному
светлому техническому референсу. Ведёт к заявке на расчёт/подбор под объект.

## Стек

- Next.js 15 (App Router, RSC) + TypeScript
- Tailwind CSS 3
- Server-rendered SEO-контент, серверный endpoint приёма заявок `/api/lead`
- Без тяжёлых UI-библиотек

## Запуск

```bash
npm install
cp .env.example .env.local   # заполнить значения
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint                 # ESLint
npm run typecheck            # tsc --noEmit
```

## Структура секций (порядок как в референсе)

Header → Hero → PowerRange (линейка мощностей) → SpecsStrip (характеристики) →
Applications (где применяются) → Workflow (как мы работаем) → ContactForm → Footer.

- `src/app` — layout (SEO-мета, JSON-LD, аналитика), `page.tsx`, `robots.ts`, `sitemap.ts`, `api/lead`, правовые страницы
- `src/components/sections` — секции лендинга
- `src/components` — Header, Cta, Reveal, Logo, InlineSvg, Analytics, JsonLd, icons
- `src/lib` — `config` (контакты, навигация), `data` (мощности, характеристики, применения, этапы), `analytics`, `utm`, `types`
- `public/images` — `gpu-hero.svg` (продуктовый визуал с габаритами), `gpu-unit.svg` (карточки), `gpu-blueprint.svg` (фон формы)

## Переменные окружения

| Переменная | Назначение | Обязательна |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Домен для canonical / OG / sitemap / robots | да (для prod) |
| `LEAD_WEBHOOK_URL` | Куда пересылать заявки (CRM/Telegram/Sheets/n8n) | желательно |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID Яндекс.Метрики | нет |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 | нет |

## Ассеты

Применены реальные PNG (в `public/images/`): `genset.png` (продуктовое фото ГПУ —
hero и карточки), `blueprint.png` (чертёж — фон формы), `logo.png` (лого ЭЛЕМЕНТ).
Иконки преимуществ и применений — векторные (inline SVG), совпадают со стилем набора.

## Требует бизнес/юридического подтверждения перед публикацией

1. **Фотографии применений** (промышленность, нефтегаз, стройка, ЦОД, медицина)
   вместо тонированных плиток в блоке «Где применяются» — если появятся, положить в
   `public/images/` и подставить в `Applications.tsx`.
2. **Технические характеристики** в полосе (50 Гц, 400/230 В, 1500 об/мин, IP23, ISO 8528,
   гарантия) — взяты из ТЗ/референса и **НЕ подтверждены** источником фактов. Сверить с
   паспортами ГПУ; неподтверждённые убрать (формат полосы сохранится). См. `src/lib/data.ts`.
4. **Контакты**: телефон `8 800 500-39-65`, email `info@element-power.ru`, домен
   `element-power.ru` — из ТЗ, требуют подтверждения (`src/lib/config.ts`).
5. **Каталог PDF**: кнопка «Скачать каталог» сейчас ведёт в форму — подключить реальный файл.
6. **Финальные тексты** «Политики» и «Согласия на обработку ПДн» — согласовать с юристом.
7. **Приём заявок**: задать `LEAD_WEBHOOK_URL`; для мультиинстанса заменить in-memory
   rate-limit на внешний стор (Upstash/Redis).
