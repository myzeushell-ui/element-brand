# ЭЛЕМЕНТ — SEO-лендинг ГПУ 65–230 кВт

Отдельный конверсионный лендинг газопоршневых установок ЭЛЕМЕНТ.
Главное действие страницы — передать исходные данные объекта и получить
инженерный подбор ГПУ (мини-конфигуратор в 3 шага).

## Стек

- Next.js 15 (App Router, RSC) + TypeScript
- Tailwind CSS 3
- Server-rendered SEO-контент, серверный endpoint приёма заявок `/api/lead`
- Без тяжёлых UI-библиотек и лишних зависимостей

## Запуск

```bash
npm install
cp .env.example .env.local   # заполнить значения
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint                 # ESLint
npm run typecheck            # tsc --noEmit
```

## Переменные окружения

| Переменная | Назначение | Обязательна |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Домен для canonical / OG / sitemap / robots | да (для prod) |
| `LEAD_WEBHOOK_URL` | Куда пересылать заявки (CRM/Telegram/Sheets/n8n) | желательно |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID Яндекс.Метрики | нет |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 | нет |

## Структура

- `src/app` — layout (SEO-мета, JSON-LD, аналитика), `page.tsx`, `robots.ts`, `sitemap.ts`, `api/lead`
- `src/components/sections` — секции лендинга (Hero, UseCases, PowerRange, Economics, Capabilities, Configurator, Process, Faq, FinalCta, Footer)
- `src/components` — Header, Cta, Reveal, StickyCta, Analytics, JsonLd, icons
- `src/lib` — `config` (реквизиты, навигация), `data` (мощности, FAQ, шаги), `analytics`, `utm`, `types`
- `public/images/gpu-hero.svg` — изображение установки (векторное, инлайнится в hero)

## Требует бизнес/юридического подтверждения перед публикацией

- Реальное фото ГПУ (WebP/AVIF) вместо векторного hero — заменить `public/images/gpu-hero.svg` и, при желании, перевести Hero на `next/image`.
- Production-домен (`NEXT_PUBLIC_SITE_URL`) и self-referencing canonical.
- Растровый OG-образ 1200×630 (сейчас OG ссылается на SVG — для максимальной совместимости соцсетей нужен PNG/JPG).
- Коммерческий телефон — если появится, добавить в `src/lib/config.ts` (`company.phone`), он подхватится в footer и JSON-LD.
- Финальные тексты «Политики конфиденциальности» и «Согласия на обработку ПДн» — согласовать с юристом.
- Endpoint приёма заявок: задать `LEAD_WEBHOOK_URL`; для нескольких инстансов заменить in-memory rate-limit на внешний стор (Upstash/Redis).
