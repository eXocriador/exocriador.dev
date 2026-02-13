# Quick Setup Guide

Швидкий посібник з налаштування exocriador.dev на VPS.

## 🚀 Швидкий старт

### 1. Створення Telegram бота (5 хв)

1. Відкрийте [@BotFather](https://t.me/botfather) в Telegram
2. Відправте команду `/newbot`
3. Назва: `ExoCriador Portfolio Notifier`
4. Username: `exocriador_portfolio_bot`
5. Збережіть токен бота

**Отримання Chat ID:**
```bash
# Відправте /start вашому боту, потім:
curl https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
# Знайдіть "chat":{"id":123456789}
```

### 2. Налаштування Gmail (3 хв)

1. Перейдіть в Google Account → Security
2. Увімкніть 2-Step Verification
3. Створіть App Password:
   - Security → App passwords
   - Select app: Mail
   - Select device: Other (Custom name)
   - Назва: "Portfolio Backend"
4. Збережіть згенерований пароль

### 3. Налаштування проєкту (5 хв)

```bash
# Клонування
cd /home/exocriador/apps
git clone git@github.com:eXocriador/exocriador.dev.git
cd exocriador.dev

# Створення .env
cp .env.example .env
nano .env
```

Заповніть `.env`:
```env
FRONTEND_URL=https://exocriador.dev

# Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=exocriador@gmail.com

# Telegram
TELEGRAM_BOT_TOKEN=1234567890:ABCdef...
TELEGRAM_CHAT_ID=123456789
```

### 4. Запуск сервісів (2 хв)

```bash
# Запуск всіх сервісів
docker-compose up -d --build

# Перевірка статусу
docker-compose ps

# Перегляд логів
docker-compose logs -f
```

### 5. Налаштування Nginx + SSL (5 хв)

```bash
cd nginx
sudo bash setup-ssl.sh
```

Скрипт автоматично:
- Встановить certbot (якщо потрібно)
- Налаштує Nginx
- Отримає SSL сертифікат
- Налаштує автооновлення

### 6. DNS налаштування

В панелі керування доменом (Porkbun):
```
A     exocriador.dev      →  YOUR_VPS_IP
A     www.exocriador.dev  →  YOUR_VPS_IP
```

Зачекайте 5-10 хвилин для пропагації DNS.

### 7. Перевірка

```bash
# Здоров'я сервісів
curl http://localhost:3001/api/health
curl http://localhost:3002/health

# Перевірка сайту
curl -I https://exocriador.dev
```

Відкрийте https://exocriador.dev та протестуйте форму контактів!

## 🔧 Типові проблеми

### Telegram бот не надсилає повідомлення

```bash
# Перевірте логи
docker-compose logs telegram-bot

# Перевірте чи відправили /start боту
# Перевірте TOKEN та CHAT_ID в .env
```

### Email не надсилаються

```bash
# Перевірте логи
docker-compose logs backend

# Перевірте App Password (не звичайний пароль!)
# Перевірте EMAIL_USER та EMAIL_PASS в .env
```

### SSL сертифікат не отримується

```bash
# Перевірте DNS
nslookup exocriador.dev

# Перевірте чи порт 80 відкритий
sudo ufw status

# Спробуйте вручну
sudo certbot --nginx -d exocriador.dev
```

## 📝 Корисні команди

```bash
# Перезапуск після змін
docker-compose restart

# Повна перебудова
docker-compose down
docker-compose up -d --build

# Оновлення після git pull
./deploy.sh

# Перегляд логів
docker-compose logs -f backend
docker-compose logs -f telegram-bot

# Backup MongoDB
docker exec portfolio-mongodb mongodump --out=/data/backup
docker cp portfolio-mongodb:/data/backup ./backup-$(date +%Y%m%d)
```

## ✅ Checklist

- [ ] Telegram бот створено та налаштовано
- [ ] Gmail App Password створено
- [ ] .env файл заповнено
- [ ] Docker сервіси запущено
- [ ] Nginx налаштовано
- [ ] SSL сертифікат отримано
- [ ] DNS записи налаштовано
- [ ] Сайт доступний через HTTPS
- [ ] Форма контактів працює
- [ ] Приходять Telegram оповіщення
- [ ] Приходять Email листи

## 🎉 Готово!

Ваш портфоліо сайт тепер працює на https://exocriador.dev!

Для оновлення просто запустіть:
```bash
cd /home/exocriador/apps/exocriador.dev
./deploy.sh
```
