.PHONY: help install dev build start stop restart logs clean deploy backup

# Default target
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies for all services"
	@echo "  make dev        - Start all services in development mode"
	@echo "  make build      - Build all Docker images"
	@echo "  make start      - Start all Docker containers"
	@echo "  make stop       - Stop all Docker containers"
	@echo "  make restart    - Restart all Docker containers"
	@echo "  make logs       - View logs from all containers"
	@echo "  make clean      - Remove all containers and volumes"
	@echo "  make deploy     - Deploy (pull, build, start)"
	@echo "  make backup     - Backup MongoDB database"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	cd frontend && npm install
	cd backend && npm install
	cd telegram-notifier-bot && npm install

# Development mode
dev:
	@echo "🚀 Starting development servers..."
	@echo "This will open 3 terminals. Make sure you have MongoDB running!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:3001"
	@echo "Telegram Bot: http://localhost:3002"

# Build Docker images
build:
	@echo "🔨 Building Docker images..."
	docker-compose build

# Start containers
start:
	@echo "▶️  Starting Docker containers..."
	docker-compose up -d

# Stop containers
stop:
	@echo "⏹️  Stopping Docker containers..."
	docker-compose down

# Restart containers
restart:
	@echo "🔄 Restarting Docker containers..."
	docker-compose restart

# View logs
logs:
	@echo "📝 Viewing logs..."
	docker-compose logs -f

# Clean everything
clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v
	@echo "⚠️  All containers and volumes removed!"

# Deploy
deploy:
	@echo "🚀 Deploying..."
	./deploy.sh

# Backup database
backup:
	@echo "💾 Backing up MongoDB..."
	@mkdir -p ./backups
	docker exec portfolio-mongodb mongodump --out=/data/backup
	docker cp portfolio-mongodb:/data/backup ./backups/mongodb-$(shell date +%Y%m%d-%H%M%S)
	@echo "✅ Backup saved to ./backups/"
