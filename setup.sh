#!/bin/bash

# QuantamKube AI - Quick Setup Script
# Automated setup for development environment

echo "🚀 QuantamKube AI - Automated Setup"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "⚠️  .env.local not found. Creating from template..."
  cp .env.example .env.local
  echo "✓ .env.local created. Please edit with your credentials:"
  echo "  - Supabase credentials"
  echo "  - Gemini API key"
  echo "  - NextAuth secret"
  echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma
echo "🔧 Generating Prisma client..."
npx prisma generate

# Initialize database
echo "🗄️  Initializing database..."
npx prisma db push --skip-generate

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your actual credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Full Setup: INSTALLATION.md"
echo "   - Supabase Setup: SUPABASE_SETUP.md"
echo ""
