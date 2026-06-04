# REPORT — ЭЛЕМЕНТ brandbook

Дата: **2026-06-04**

## Итог

| Параметр | Значение |
|----------|----------|
| Репозиторий | **`myzeushell-ui/element-brand`** (имя не менялось, уже существовало) |
| GitHub | https://github.com/myzeushell-ui/element-brand |
| Прод-URL Vercel | _ещё не задеплоено из этой среды — см. раздел «Vercel» ниже_ |
| Рабочая ветка агента | `claude/trusting-hypatia-NGu5Q` (запушена) |
| Релизная схема | `main` = прод · `develop` = работа |

## Важно: среда выполнения ≠ Windows

Задание написано под **Windows 10** (winget, `C:\projects`, папка «Загрузки»,
`gh`, `vercel` CLI). Фактически агент работает в **облачном Linux-контейнере**
Claude Code:

- ОС — Linux, не Windows. `winget`/`C:\` неприменимы; `git`, `node 22`, `npx`
  уже установлены.
- Репозиторий `myzeushell-ui/element-brand` **уже существовал** и был склонирован
  в контейнер. Шаг `gh repo create` не требовался — имя сохранено как
  `element-brand`.
- `gh` CLI отсутствует — для GitHub использовался GitHub MCP (авторизован как
  `myzeushell-ui`).
- **npm-registry недоступен** из песочницы (сетевая политика): `npx vercel …`
  не запускается, интерактивный `vercel login` (браузерный flow) в автономном
  контейнере невозможен. Поэтому деплой на Vercel оформлен как готовая
  инструкция (ниже), а не выполнен автоматически.
- Папки «Загрузки» с исходными файлами в контейнере нет — все материалы
  созданы заново (см. «Отсутствовавшие файлы»).

## Ветки

Жёсткое правило среды: разработка и пуш — только в служебную ветку
`claude/trusting-hypatia-NGu5Q`; пуш в `main`/`develop` без явного разрешения
запрещён. Поэтому:

- Весь брендбук закоммичен и запушен в **`claude/trusting-hypatia-NGu5Q`**.
- Целевая релизная схема **`main` (прод) / `develop` (работа)** разворачивается
  слиянием служебной ветки (ниже).

```bash
# из локальной машины / CI с правами на репозиторий
git fetch origin
git checkout main && git merge --ff-only origin/claude/trusting-hypatia-NGu5Q
git push origin main
git checkout -b develop main && git push -u origin develop
```

## Файлы

```
element-brand/
├── index.html                 светлая презентация (+ навигация Светлая|Тёмная|3D)
├── dark.html                  тёмная презентация (+ навигация)
├── 3d.html                    интерактивный 3D-концепт GPU (three.js через CDN)
├── vercel.json                статика: framework=Other, output=корень, cleanUrls
├── README.md                  описание проекта
├── REPORT.md                  этот отчёт
├── .gitignore
├── assets/
│   ├── badge.svg              эмблема (вектор) — настоящая
│   ├── badge.png              эмблема (растр) — ПЛЕЙСХОЛДЕР
│   ├── gpu_white.png          белый GPU — ПЛЕЙСХОЛДЕР
│   ├── gpu_white_copper.png   белый GPU + медь — ПЛЕЙСХОЛДЕР
│   └── gpu_white_badged.png   белый GPU + эмблема — ПЛЕЙСХОЛДЕР
├── viewer/
│   └── .gitkeep               задел под Hunyuan: сюда лягут gpu_element.glb + viewer.html
└── tools/
    └── genassets.js           генератор PNG-плейсхолдеров (чистый Node, без зависимостей)
```

## Отсутствовавшие файлы (создано заново)

Исходных файлов из задания в контейнере не было — ни одного. Вместо них:

| Ожидалось (Downloads) | Что сделано |
|-----------------------|-------------|
| `element-brandbook-light.html` → `index.html` | Написан новый светлый брендбук с нуля |
| `element-brandbook.html` → `dark.html` | Написан новый тёмный брендбук с нуля |
| `element-gpu-3d.html` → `3d.html` | Написан 3D-концепт на three.js (процедурная модель GPU) |
| `badge.svg` | Создана настоящая векторная эмблема |
| `badge.png`, `gpu_white.png`, `gpu_white_copper.png`, `gpu_white_badged.png` | Сгенерированы плейсхолдеры (`tools/genassets.js`) |

**Чем заменить плейсхолдеры:** положить финальные файлы в `assets/` под теми же
именами (PNG переэкспортировать командой `node tools/genassets.js` не нужно —
просто перезаписать файлы). Пути в HTML менять не требуется.

## Локальная проверка (выполнена)

Статический сервер + `curl` — все ресурсы отвечают `200`:

```
index.html                  200    dark.html                   200
3d.html                     200    assets/badge.svg            200
assets/badge.png            200    assets/gpu_white.png        200
assets/gpu_white_copper.png 200    assets/gpu_white_badged.png 200
vercel.json                 200    README.md                   200
```

PNG-ассеты — валидные RGBA-изображения (проверено `file` + визуальный рендер).

## Vercel — пошагово (выполнить там, где есть сеть и браузер)

Аккаунт: **myzeushell-8337**. Проект статический, билд не нужен.

```bash
# 1. установить CLI (если нет)
npm i -g vercel

# 2. логин (web-flow в браузере)
vercel login

# 3. в корне проекта — привязать новый проект
vercel link            # Set up? Y → Scope: myzeushell-8337 → name: element-brand

# 4. первый прод-деплой
vercel --prod
#    Framework Preset: Other
#    Output Directory: . (корень)

# 5. git-интеграция: пуш в main → автодеплой прод
vercel git connect     # подтвердить репозиторий myzeushell-ui/element-brand
```

После деплоя прод-URL будет вида `https://element-brand.vercel.app` (или
`element-brand-<hash>-myzeushell-8337.vercel.app`). Впишите его в таблицу
«Итог» и проверьте 200 на `/`, `/dark`, `/3d` (cleanUrls включён в `vercel.json`).

Альтернатива без CLI: на vercel.com → **Add New… → Project → Import**
`myzeushell-ui/element-brand`, Framework = *Other*, Root = `/`, Deploy. Это
сразу включает автодеплой при пуше в `main`.

## Шпаргалка повседневной работы

```bash
git checkout develop          # рабочая ветка
# …правки…
git add -A
git commit -m "feat: …"
git push origin develop
# релиз в прод:
#   PR develop → main  (или)  git checkout main && git merge develop && git push
# пуш в main = автодеплой прода на Vercel
```

---

ЭЛЕМЕНТ · Брендбук v1 · 2026
