# QuantamKube AI - Complete Installation & Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Variables](#environment-variables)
5. [Supabase Setup](#supabase-setup)
6. [Google OAuth Setup](#google-oauth-setup)
7. [Gemini API Setup](#gemini-api-setup)
8. [Running Locally](#running-locally)
9. [Docker Setup](#docker-setup)
10. [Kubernetes Deployment](#kubernetes-deployment)
11. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required
- **Node.js**: v18+ (v20 recommended)
- **npm** or **yarn**: Latest version
- **Git**: For version control
- **PostgreSQL**: v14+ (or use Supabase)

### Optional
- **Docker**: For containerized deployment
- **Kubernetes**: For production deployment
- **ngrok** or **Expose**: For testing webhooks locally

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/devopscl0ud/Quantamkube.ai.git
cd Quantamkube.ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

## Database Configuration

### Option A: Local PostgreSQL

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
createdb quantamkube
```

Update `.env.local`:
```env
DATABASE_URL=postgresql://localhost/quantamkube
```

### Option B: Supabase (Recommended for Free Tier)

1. Visit [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

Update `.env.local`:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]
```

### Option C: Docker PostgreSQL

```bash
docker run --name quantamkube-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quantamkube \
  -p 5432:5432 \
  -d postgres:16-alpine
```

## Environment Variables

Create `.env.local` in the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/quantamkube

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Generate NEXTAUTH_SECRET with:
# openssl rand -base64 32

# Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

## Supabase Setup

### Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to initialize (2-3 minutes)

### Step 2: Get Connection Details

1. Go to Settings → Database
2. Copy connection string
3. Copy anon key and service role key

### Step 3: Update Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
```

## Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "QuantamKube AI"
3. Enable Google+ API

### Step 2: Create OAuth 2.0 Credentials

1. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
2. Application type: Web Application
3. Add Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```

### Step 3: Update Environment Variables

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

## Gemini API Setup

### Step 1: Get API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 2: Update Environment Variables

```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
```

### Step 3: Set API Quotas

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to APIs & Services → Quotas
4. Search for "Generative Language API"
5. Set appropriate quotas for your tier

## Running Locally

### Start Development Server

```bash
npm run dev
```

Server starts at `http://localhost:3000`

### Initialize Database

```bash
# Create initial migration
npx prisma migrate dev --name init

# Or push schema directly
npx prisma db push
```

### Open Prisma Studio

```bash
npx prisma studio
```

Browser opens at `http://localhost:5555`

## Docker Setup

### Build Docker Image

```bash
docker build -t quantamkube-ai:1.0.0 .
```

### Run with Docker Compose

```bash
# Copy example env file
cp .env.example .env.docker

# Edit with your actual values
nano .env.docker

# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Access Application

- App: `http://localhost:3000`
- Database: `localhost:5432`

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (minikube, EKS, GKE, etc.)
- kubectl configured
- Docker image in registry

### Step 1: Push Image to Registry

```bash
# Docker Hub
docker tag quantamkube-ai:1.0.0 yourusername/quantamkube-ai:1.0.0
docker push yourusername/quantamkube-ai:1.0.0

# Google Container Registry
docker tag quantamkube-ai:1.0.0 gcr.io/your-project/quantamkube-ai:1.0.0
docker push gcr.io/your-project/quantamkube-ai:1.0.0
```

### Step 2: Update Kubernetes Manifests

Edit `k8s/deployment.yaml`:

```yaml
image: yourusername/quantamkube-ai:1.0.0  # Update image
```

Edit `k8s/ingress.yaml`:

```yaml
- host: quantamkube.example.com  # Your domain
```

### Step 3: Create Secrets

```bash
kubectl create namespace quantamkube

kubectl create secret generic quantamkube-secrets \
  --from-literal=database-url='postgresql://...' \
  --from-literal=nextauth-secret='your-secret' \
  --from-literal=gemini-api-key='AIzaSy...' \
  -n quantamkube
```

### Step 4: Deploy

```bash
# Deploy database and app
kubectl apply -f k8s/deployment.yaml

# Deploy ingress
kubectl apply -f k8s/ingress.yaml

# Check status
kubectl get pods -n quantamkube
kubectl get svc -n quantamkube

# View logs
kubectl logs -f deployment/quantamkube-app -n quantamkube
```

### Step 5: Setup Ingress Controller

```bash
# Nginx Ingress (if not already installed)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

# Wait for LoadBalancer IP
kubectl get svc ingress-nginx-controller -n ingress-nginx

# Update DNS to point to LoadBalancer IP
```

## Troubleshooting

### Issue: Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### Issue: Database Connection Error

```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Push schema again
npx prisma db push
```

### Issue: Gemini API Not Working

1. Verify API key: `echo $NEXT_PUBLIC_GEMINI_API_KEY`
2. Check quota: https://console.cloud.google.com
3. Ensure API is enabled
4. Check rate limits

### Issue: NextAuth Session Issues

1. Verify NEXTAUTH_SECRET is set
2. Clear browser cookies
3. Restart dev server
4. Check NextAuth logs: `NEXTAUTH_DEBUG=true npm run dev`

### Issue: Google OAuth Failing

1. Verify redirect URIs in Google Cloud Console
2. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
3. Ensure Google+ API is enabled

### Issue: Docker Build Fails

```bash
# Clear build cache
docker system prune -a

# Build again
docker build -t quantamkube-ai:1.0.0 --no-cache .
```

### Issue: Kubernetes Pod CrashLoopBackOff

```bash
# Check pod logs
kubectl logs pod/quantamkube-app-xxx -n quantamkube

# Check pod events
kubectl describe pod/quantamkube-app-xxx -n quantamkube

# Check resource limits
kubectl top pod -n quantamkube
```

### Enable Debug Logging

```env
# Local development
DEBUG=quantamkube:* npm run dev

# Next Auth
NEXTAUTH_DEBUG=true npm run dev
```

## Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Use HTTPS everywhere
- [ ] Enable database backups
- [ ] Setup log aggregation
- [ ] Configure monitoring and alerts
- [ ] Setup auto-scaling
- [ ] Enable rate limiting
- [ ] Setup CDN for static assets
- [ ] Enable CORS properly
- [ ] Regular security updates
- [ ] Database connection pooling (PgBouncer)
- [ ] Implement secrets rotation

## Support & Resources

- GitHub: https://github.com/devopscl0ud/Quantamkube.ai
- Documentation: https://docs.quantamkube.ai
- Issues: https://github.com/devopscl0ud/Quantamkube.ai/issues
- Discussions: https://github.com/devopscl0ud/Quantamkube.ai/discussions

## License

Proprietary - QuantamKube AI

---

Built with ❤️ by the QuantamKube AI team
