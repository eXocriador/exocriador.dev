# Промт для виправлення exocriador.dev

Привіт! Мені потрібно виправити TypeScript помилки в проєкті exocriador.dev і запустити його через Traefik.

## 📋 Контекст

У мене налаштована production інфраструктура з Traefik v2.11 як reverse proxy:
- **tavern.exocriador.dev** - ✅ працює з auto-SSL
- **tyusha.love** - ✅ працює з auto-SSL
- **exocriador.dev** - ❌ не збирається через TypeScript помилки

Всі проєкти в `/home/exocriador/apps/`

## ❌ Проблема

Docker build проєкту exocriador.dev падає з помилками TypeScript:

```
src/middleware/errorHandler.ts(13,3): error TS6133: 'next' is declared but its value is never read.
src/middleware/errorHandler.ts(36,3): error TS6133: 'next' is declared but its value is never read.

src/routes/contact.ts(27,15): error TS2345: Argument of type '(success: boolean) => Promise<void> | Promise<...>' is not assignable to parameter of type '(value: boolean) => void | PromiseLike<void>'.

src/routes/contact.ts(35,15): error TS2345: [та сама помилка]
```

## 🎯 Що потрібно зробити

### 1. Виправити TypeScript помилки

**Файли що потрібно виправити:**

#### `/home/exocriador/apps/exocriador.dev/backend/src/middleware/errorHandler.ts`
- Додати `_` до невикористаних параметрів `next` (на лініях 13 і 36)
- Або видалити їх якщо не використовуються

#### `/home/exocriador/apps/exocriador.dev/backend/src/routes/contact.ts`
- Лінії 26-32 і 33-39: виправити типи Promise
- Проблема: `.then()` повертає `Promise<Document>` замість `Promise<void>`
- Потрібно приведення типів або використання `.then(() => void 0)`

#### `/home/exocriador/apps/exocriador.dev/backend/src/index.ts`
- Лінія 17: параметр `req` не використовується
- Додати `_` до назви: `_req`

### 2. Після виправлення - зібрати і запустити

```bash
cd /home/exocriador/apps/exocriador.dev

# Зібрати всі сервіси
docker compose build

# Запустити
docker compose up -d

# Перевірити статус
docker compose ps

# Перевірити логи якщо щось не так
docker compose logs backend
docker compose logs frontend
```

### 3. Перевірити що все працює

```bash
# Перевірити статус всієї інфраструктури
/home/exocriador/apps/check-status.sh

# Або перевірити вручну
curl -I https://exocriador.dev
```

## 📝 Важлива інформація

### Docker Compose конфігурація
Проєкт вже налаштований для Traefik з правильними labels в:
`/home/exocriador/apps/exocriador.dev/docker-compose.yml`

### Traefik автоматично:
- ✅ Виявить новий сервіс після запуску
- ✅ Отримає SSL сертифікат від Let's Encrypt
- ✅ Налаштує роутинг для `exocriador.dev` та `www.exocriador.dev`
- ✅ Зробить редірект з www на non-www

### Структура проєкту:
```
exocriador.dev/
├── backend/           # Express API (Node.js + TypeScript)
├── frontend/          # React SPA (Vite)
├── telegram-notifier-bot/  # Telegram bot
└── docker-compose.yml # Конфігурація з Traefik labels
```

### Dockerfiles вже оновлені:
- ✅ Використовують `npm install` замість `npm ci`
- ✅ telegram-notifier-bot вже виправлений і збирається
- ✅ frontend вже виправлений і збирається
- ❌ **Тільки backend** має проблеми

## 🎯 Очікуваний результат

Після виправлення і запуску:

```bash
/home/exocriador/apps/check-status.sh
```

Повинно показати:
```
✅ https://tavern.exocriador.dev - OK (200)
✅ https://tyusha.love - OK (200)
✅ https://exocriador.dev - OK (200)  # <-- Це має запрацювати!
```

## 💡 Підказки

1. **Невикористані параметри:** додайте `_` на початку назви: `next` → `_next`
2. **Promise типи:** використайте `.then(() => void 0)` або `.then(result => { ... })` з явним return
3. **Якщо складно:** можна тимчасово додати `// @ts-ignore` перед проблемними лініями
4. **Перевірка:** після кожного виправлення запускайте `docker compose build backend` щоб перевірити

## 📂 Файли для роботи

Головні файли що треба відкрити:
- `/home/exocriador/apps/exocriador.dev/backend/src/middleware/errorHandler.ts`
- `/home/exocriador/apps/exocriador.dev/backend/src/routes/contact.ts`
- `/home/exocriador/apps/exocriador.dev/backend/src/index.ts`
- `/home/exocriador/apps/exocriador.dev/backend/tsconfig.json` (вже налаштований)

---

**Будь ласка, виправ ці TypeScript помилки і запусти exocriador.dev через Docker Compose. Після запуску Traefik автоматично налаштує SSL і роутинг!**
