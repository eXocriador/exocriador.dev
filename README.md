# ExoCriador.dev Portfolio

Full-stack portfolio website with contact form, email notifications, and Telegram bot integration.

## 🏗️ Project Structure

```
exocriador.dev/
├── frontend/                    # React 19 + TypeScript + Vite
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/                     # Node.js + Express + MongoDB
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── telegram-notifier-bot/       # Telegram notifications
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── nginx/                       # Nginx configuration
│   ├── exocriador.dev.conf
│   └── setup-ssl.sh
├── docker-compose.yml           # Docker orchestration
├── .env.example                 # Environment variables template
└── README.md
```

## 🚀 Tech Stack

### Frontend
- React 19 with TypeScript
- Vite 7 for blazing-fast builds
- CSS Modules for styling
- Web Vitals for performance monitoring
- TSParticles for animations
- WCAG 2.1 AA accessibility compliant

### Backend
- Node.js + Express + TypeScript
- MongoDB for data storage
- Nodemailer for email notifications
- Zod for validation
- RESTful API architecture

### Telegram Bot
- node-telegram-bot-api
- HTTP endpoint for notifications
- Formatted message templates

### Infrastructure
- Docker + Docker Compose
- Nginx reverse proxy
- Let's Encrypt SSL
- Health checks for all services

## 📋 Prerequisites

- Node.js 20+ (for local development)
- Docker & Docker Compose (for deployment)
- Nginx (for production)
- Domain name pointing to your VPS
- Gmail account (for email notifications)
- Telegram account (for bot notifications)

## 🛠️ Setup Instructions

### Step 1: Clone the Repository

```bash
cd /home/exocriador/apps
git clone git@github.com:eXocriador/exocriador.dev.git
cd exocriador.dev
```

### Step 2: Create Telegram Bot

1. Open Telegram and find [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Name: "ExoCriador Portfolio Notifier"
4. Username: `exocriador_portfolio_bot` (or any unique name)
5. Copy the bot token

Get your Chat ID:
1. Send `/start` to your new bot
2. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
3. Find `"chat":{"id":123456789}` and copy the ID

### Step 3: Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Fill in your actual values:
- `EMAIL_USER` and `EMAIL_PASS` (Gmail App Password)
- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
- Other settings as needed

### Step 4: Install Dependencies (Local Development)

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Telegram Bot
cd ../telegram-notifier-bot
npm install
```

## 🧪 Local Development

### Option 1: Run Each Service Separately

Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Terminal 2 - Backend:
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm run dev
# Runs on http://localhost:3001
```

Terminal 3 - Telegram Bot:
```bash
cd telegram-notifier-bot
cp .env.example .env
# Edit .env with your bot token and chat ID
npm run dev
# Runs on http://localhost:3002
```

Terminal 4 - MongoDB:
```bash
# Install MongoDB locally or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:7-jammy
```

### Option 2: Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Telegram Bot: http://localhost:3002

## 🌐 Production Deployment on VPS

### Step 1: Prepare VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Configure Environment

```bash
cd /home/exocriador/apps/exocriador.dev
cp .env.example .env
nano .env
```

Make sure to set:
```env
FRONTEND_URL=https://exocriador.dev
```

### Step 3: Start Docker Services

```bash
# Build and start all services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Step 4: Configure Nginx & SSL

```bash
cd nginx

# Run SSL setup script
sudo bash setup-ssl.sh
```

This script will:
1. Install certbot if needed
2. Copy Nginx configuration
3. Obtain SSL certificate from Let's Encrypt
4. Set up auto-renewal
5. Configure HTTPS

### Step 5: Configure DNS

Point your domain to your VPS IP:
```
A     exocriador.dev      →  YOUR_VPS_IP
A     www.exocriador.dev  →  YOUR_VPS_IP
```

### Step 6: Verify Deployment

1. Visit https://exocriador.dev
2. Test contact form
3. Check Telegram for notification
4. Check email inbox

## 🔧 Useful Commands

### Docker

```bash
# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f telegram-bot

# Restart a service
docker-compose restart backend

# Rebuild a service
docker-compose up -d --build backend

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v

# Access MongoDB shell
docker exec -it portfolio-mongodb mongosh
```

### Nginx

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/exocriador.dev.access.log
sudo tail -f /var/log/nginx/exocriador.dev.error.log
```

### SSL Certificate

```bash
# Renew certificates manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates
```

### Git

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart services
docker-compose up -d --build

# Or rebuild specific service
docker-compose up -d --build backend
```

## 📊 Monitoring

### Health Checks

All services have health check endpoints:
- Frontend: `http://localhost:3000/` (should return 200)
- Backend: `http://localhost:3001/api/health`
- Telegram Bot: `http://localhost:3002/health`

### View Service Status

```bash
# Docker health status
docker-compose ps

# Resource usage
docker stats

# MongoDB status
docker exec portfolio-mongodb mongosh --eval "db.serverStatus()"
```

## 🔒 Security

- ✅ SSL/TLS encryption (HTTPS)
- ✅ CORS configured for specific origin
- ✅ Security headers (HSTS, XSS Protection, etc.)
- ✅ Input validation with Zod
- ✅ MongoDB not exposed externally
- ✅ Non-root Docker containers
- ✅ Environment variables for secrets
- ✅ Rate limiting ready (TODO: implement)

## 🐛 Troubleshooting

### Frontend not loading
```bash
docker-compose logs frontend
# Check if build succeeded and nginx is running
```

### Backend API errors
```bash
docker-compose logs backend
# Check MongoDB connection and environment variables
```

### Telegram notifications not working
```bash
docker-compose logs telegram-bot
# Verify bot token and chat ID in .env
# Make sure you sent /start to the bot
```

### SSL certificate issues
```bash
sudo certbot renew --dry-run
# Check nginx configuration
sudo nginx -t
```

### MongoDB connection issues
```bash
docker-compose logs mongodb
# Ensure MongoDB is healthy
docker exec -it portfolio-mongodb mongosh --eval "db.adminCommand('ping')"
```

## 📝 API Endpoints

### Backend API

**Health Check**
```
GET /api/health
```

**Submit Contact Form**
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I'd like to discuss a project."
}
```

### Telegram Bot

**Health Check**
```
GET /health
```

**Send Notification**
```
POST /notify
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Project inquiry",
  "timestamp": "2024-01-15T12:00:00Z"
}
```

## 🔄 Update Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Rebuild services
docker-compose up -d --build

# 3. Check logs
docker-compose logs -f

# 4. Verify site is working
curl -I https://exocriador.dev
```

## 📦 Backup

### MongoDB Backup

```bash
# Create backup
docker exec portfolio-mongodb mongodump --out=/data/backup

# Copy backup to host
docker cp portfolio-mongodb:/data/backup ./mongodb-backup-$(date +%Y%m%d)

# Restore backup
docker exec -i portfolio-mongodb mongorestore /data/backup
```

## 📄 License

This project is private and proprietary.

## 👤 Author

**eXocriador**

- Website: [exocriador.dev](https://exocriador.dev)
- GitHub: [@eXocriador](https://github.com/eXocriador)
- Email: exocriador@gmail.com
- Telegram: [@exocriador](https://t.me/exocriador)

## 🙏 Acknowledgments

- React & Vite teams
- Express.js community
- MongoDB team
- Telegram Bot API
- Let's Encrypt
- Nginx team
