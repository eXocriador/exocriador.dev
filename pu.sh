#!/bin/bash

# 🚀 eXocriador's Fancy Git Push Script
# Usage: ./pu.sh "your commit message"

# Colors for fancy output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Welcome Banner
echo -e "${CYAN}"
echo "🚀 GIT PUSH SCRIPT 🚀"
echo "by eXocriador"
echo -e "${NC}"

# Check if commit message is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ Error: No commit message provided!${NC}"
    echo -e "${YELLOW}Usage: ./pu.sh \"your commit message\"${NC}"
    echo -e "${BLUE}Example: ./pu.sh \"feat: add new feature\"${NC}"
    exit 1
fi

COMMIT_MESSAGE="$1"

echo -e "${BLUE}📝 Commit Message:${NC} $COMMIT_MESSAGE"
echo -e "${YELLOW}⏳ Starting git operations...${NC}"
echo ""

# Step 1: Git Add
echo -e "${PURPLE}📦 Step 1: Adding files to staging area...${NC}"
if git add .; then
    echo -e "${GREEN}✅ Files added successfully!${NC}"
else
    echo -e "${RED}❌ Failed to add files!${NC}"
    exit 1
fi
echo ""

# Step 2: Git Commit
echo -e "${PURPLE}💾 Step 2: Committing changes...${NC}"
if git commit -m "$COMMIT_MESSAGE"; then
    echo -e "${GREEN}✅ Changes committed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to commit changes!${NC}"
    exit 1
fi
echo ""

# Step 3: Git Push
echo -e "${PURPLE}🚀 Step 3: Pushing to remote repository...${NC}"
if git push; then
    echo -e "${GREEN}✅ Changes pushed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to push changes!${NC}"
    exit 1
fi
echo ""

# Success Message
echo -e "${GREEN}"
echo "🎉 SUCCESS! 🎉"
echo "All git operations completed!"
echo -e "${NC}"

echo -e "${CYAN}✨ Your code is now live on GitHub! ✨${NC}"
echo -e "${YELLOW}🕐 Timestamp: $(date)${NC}"
