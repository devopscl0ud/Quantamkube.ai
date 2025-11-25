#!/bin/bash

echo "🔍 QuantamKube AI Project Structure Verification"
echo "=================================================="

# Core files
files=(
  "package.json"
  "tsconfig.json"
  "next.config.js"
  "tailwind.config.js"
  "postcss.config.js"
  ".env.example"
  ".eslintrc.json"
  "Dockerfile"
  "docker-compose.yml"
  "middleware.ts"
  "README.md"
  "QUICKSTART.md"
  "INSTALLATION.md"
  ".nvmrc"
)

echo -e "\n📋 Core Configuration Files:"
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (MISSING)"
  fi
done

# Directories
dirs=(
  "app/(auth)"
  "app/(dashboard)"
  "app/api/auth/[...nextauth]"
  "app/api/chat"
  "src/components"
  "src/lib"
  "src/types"
  "prisma"
  "public"
  "k8s"
  ".github/workflows"
)

echo -e "\n📁 Core Directories:"
for dir in "${dirs[@]}"; do
  if [ -d "$dir" ]; then
    echo "✅ $dir"
  else
    echo "❌ $dir (MISSING)"
  fi
done

# Count files
echo -e "\n📊 File Statistics:"
echo "TypeScript/TSX files: $(find . -name '*.tsx' -o -name '*.ts' | grep -v node_modules | wc -l)"
echo "CSS files: $(find . -name '*.css' | wc -l)"
echo "Configuration files: $(find . -maxdepth 1 -type f -name '.*' | wc -l)"

echo -e "\n✨ Verification Complete!"
