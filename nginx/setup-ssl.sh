#!/bin/bash

# SSL Setup Script for exocriador.dev
# This script helps you set up SSL certificates using Let's Encrypt

set -e

echo "🔒 SSL Setup for exocriador.dev"
echo "================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root (use sudo)"
    exit 1
fi

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx is not installed. Please install nginx first."
    exit 1
fi

# Create directory for Let's Encrypt verification
mkdir -p /var/www/certbot

# Copy nginx configuration (without SSL first)
echo "📝 Setting up initial Nginx configuration..."
cp exocriador.dev.conf /etc/nginx/sites-available/exocriador.dev

# Create symlink if it doesn't exist
if [ ! -L /etc/nginx/sites-enabled/exocriador.dev ]; then
    ln -s /etc/nginx/sites-available/exocriador.dev /etc/nginx/sites-enabled/
fi

# Test nginx configuration
echo "🔍 Testing Nginx configuration..."
nginx -t

# Reload nginx
echo "🔄 Reloading Nginx..."
systemctl reload nginx

# Obtain SSL certificate
echo ""
echo "🔐 Obtaining SSL certificate from Let's Encrypt..."
echo "   You will be prompted to enter your email and agree to the terms."
echo ""

certbot --nginx -d exocriador.dev -d www.exocriador.dev

# Set up auto-renewal
echo "⏰ Setting up auto-renewal..."
systemctl enable certbot.timer
systemctl start certbot.timer

# Test auto-renewal
echo "🧪 Testing auto-renewal..."
certbot renew --dry-run

echo ""
echo "✅ SSL setup complete!"
echo ""
echo "📊 Certificate information:"
certbot certificates

echo ""
echo "🎉 Your site is now available at:"
echo "   https://exocriador.dev"
echo ""
echo "ℹ️  Certificates will auto-renew before expiration."
echo "ℹ️  You can check renewal status with: certbot renew --dry-run"
