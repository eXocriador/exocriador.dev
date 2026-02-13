#!/bin/bash

# Deployment script for exocriador.dev
# This script pulls latest changes and rebuilds services

set -e

echo "🚀 Deploying exocriador.dev"
echo "============================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running in the correct directory
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Error: docker-compose.yml not found!${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Pull latest changes from git
echo -e "${YELLOW}📥 Pulling latest changes from git...${NC}"
git pull origin main

# Stop services
echo -e "${YELLOW}⏹️  Stopping services...${NC}"
docker-compose down

# Rebuild and start services
echo -e "${YELLOW}🔨 Building and starting services...${NC}"
docker-compose up -d --build

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check service status
echo -e "${YELLOW}📊 Checking service status...${NC}"
docker-compose ps

# Show logs
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${YELLOW}📝 To view logs:${NC}"
echo "   docker-compose logs -f"
echo ""
echo -e "${YELLOW}🔍 To check health:${NC}"
echo "   curl http://localhost:3001/api/health"
echo "   curl http://localhost:3002/health"
echo ""
echo -e "${YELLOW}🌐 Visit:${NC}"
echo "   https://exocriador.dev"
echo ""
