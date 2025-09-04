# Змінні середовища для фронтенду

Цей документ описує змінні середовища, які використовуються у фронтенд додатку.

## Створення файлу .env

Скопіюйте `env.example` в `.env` та налаштуйте значення:

```bash
cp env.example .env
```

## API Configuration

| Змінна                          | Опис                   | Приклад                    |
| ------------------------------- | ---------------------- | -------------------------- |
| `VITE_API_BASE_URL_PRODUCTION`  | URL продакшн бекенду   | `https://your-backend.com` |
| `VITE_API_BASE_URL_DEVELOPMENT` | URL локального бекенду | `http://localhost:10000`   |

## Використання в коді

```typescript
// Отримання значення змінної
const apiUrl = import.meta.env.VITE_API_BASE_URL_PRODUCTION;
```

## Важливі зауваження

1. **Тільки змінні з префіксом `VITE_`** доступні у фронтенд коді
2. **Файл `.env` не комітиться** в Git (додано в .gitignore)
3. **Змініть значення** в `.env` відповідно до вашого середовища
4. **Перезапустіть dev сервер** після зміни змінних

## Приклад .env файлу

```env
# API Configuration
VITE_API_BASE_URL_PRODUCTION=https://your-production-backend.com
VITE_API_BASE_URL_DEVELOPMENT=http://localhost:10000
```
