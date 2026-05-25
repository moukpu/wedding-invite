# Свадебное приглашение — Ринат & Динара

Мобильный сайт-приглашение на свадьбу. 28 июня 2026, 16:00.

## Секции

1. **Hero** — "Мы женимся!" + сакура
2. **Приглашение** — текст приглашения
3. **Дата + Календарь** — 28 июня 2026, 16:00
4. **Обратный отсчёт** — живой таймер
5. **Локация** — адрес + кнопка 2GIS
6. **Дресс-код** — палитра цветов
7. **RSVP Анкета** — приду / не приду (заглушка)

## Стек

- Next.js 16 + TypeScript
- Tailwind CSS v4
- Framer Motion (анимации)
- Google Fonts: Cormorant Garamond + Great Vibes

## Запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Деплой на Vercel

1. Подключить этот репозиторий на [vercel.com](https://vercel.com/new)
2. Framework: Next.js (определится автоматически)
3. Deploy

## Что менять

- **Имена**: `src/app/page.tsx` → найти "Ринат" и "Динара"
- **Дата**: `src/app/page.tsx` → `WEDDING_DATE` и текст даты
- **Адрес**: `src/app/page.tsx` → секция "LOCATION SECTION"
- **2GIS ссылка**: `src/app/page.tsx` → `href` в кнопке "Открыть карту"
- **Цвета дресс-кода**: `src/app/page.tsx` → массив `dresscodeColors`
- **RSVP бекенд**: `src/app/page.tsx` → функция `handleRsvpSubmit`
