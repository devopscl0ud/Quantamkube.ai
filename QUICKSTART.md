# Quick Start Guide - QuantamKube AI

## 🚀 Get Running in 5 Minutes

### Step 1: Install & Setup (2 min)

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create .env.local file
cp .env.example .env.local
```

### Step 2: Get Your API Keys (2 min)

**Gemini API:**
1. Visit https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste in `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY`

**NextAuth Secret:**
```bash
# Generate a secure secret
openssl rand -base64 32
# Paste as NEXTAUTH_SECRET in .env.local
```

### Step 3: Database Setup (1 min)

#### Option A: Use Supabase (Easiest)
1. Go to https://supabase.com
2. Create project
3. Copy connection string to `DATABASE_URL`

#### Option B: Local PostgreSQL
```bash
# macOS
brew install postgresql
brew services start postgresql
createdb quantamkube

# Linux
sudo apt-get install postgresql
sudo -u postgres createdb quantamkube

# Windows
# Download and install from https://www.postgresql.org/download/windows/
```

### Step 4: Initialize Database

```bash
npx prisma migrate dev --name init
```

### Step 5: Start!

```bash
npm run dev
```

Visit `http://localhost:3000` and sign up!

---

## 📋 Minimal `.env.local` Template

```env
# Must have
DATABASE_URL=postgresql://...
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Optional but recommended
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret
```

---

## 🐛 Common Issues

**"Module not found: Can't resolve..."**
```bash
npm install
npx prisma generate
```

**"Database connection refused"**
```bash
# Check if PostgreSQL is running
psql -U postgres -d quantamkube -c "SELECT 1"

# Or use Supabase instead (easier)
```

**"Gemini API returns 401"**
- Verify `NEXT_PUBLIC_GEMINI_API_KEY` is correct
- Check quota at https://console.cloud.google.com

---

## 🚀 First Steps After Login

1. Go to `/settings`
2. Add your Gemini API key (optional - can use env variable)
3. Go to `/dashboard/new`
4. Try: "Create a Kubernetes Deployment for a Node.js app"
5. Watch the magic happen! ✨

---

## 📚 Next Steps

- Read full docs: `INSTALLATION.md`
- Deploy with Docker: `docker-compose up`
- Deploy to Kubernetes: `kubectl apply -f k8s/`
- Setup GitHub Actions: Already included!

---

## 🆘 Need Help?

- GitHub Issues: https://github.com/devopscl0ud/Quantamkube.ai/issues
- Discussions: https://github.com/devopscl0ud/Quantamkube.ai/discussions

---

**Happy Kuberneting! 🚀**
