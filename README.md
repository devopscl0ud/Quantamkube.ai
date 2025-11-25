# QuantamKube AI

Kubernetes manifests in seconds – powered by Gemini

## Prerequisites

- Node.js 18+ (prefer 20+)
- npm or yarn
- PostgreSQL database (Supabase free tier works great)
- Google Gemini API key (get it from https://makersuite.google.com/app/apikey)

## Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/devopscl0ud/Quantamkube.ai.git
cd Quantamkube.ai
npm install
npx prisma generate
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here (generate with: openssl rand -base64 32)

# Database
DATABASE_URL=your_postgres_connection_string
```

### 3. Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and sign up!

## Features

✨ **AI Capabilities**
- Generate production-ready Kubernetes manifests
- Create Dockerfiles, docker-compose files, GitHub Actions
- Explain Kubernetes errors and configurations
- Convert between formats (Helm → YAML, etc.)
- Multi-turn conversation with full context

🎨 **Beautiful UI**
- Dark theme with electric cyan accents
- Glassmorphism design with glowing borders
- Smooth animations and micro-interactions
- Fully responsive (mobile, tablet, desktop)
- Real-time streaming responses with typing animation

🔐 **Authentication**
- Email + password login
- Google OAuth integration
- Magic links (email sign-in)
- Secure sessions with NextAuth.js

💾 **Persistent Storage**
- Chat history saved per user
- Rename/delete conversations
- Auto-save messages
- Supabase PostgreSQL backend

⚙️ **API Key Management**
- Secure settings page
- Update Gemini API key in real-time
- Environment variable fallback

## Deployment

### Docker

```bash
docker build -t quantamkube-ai .
docker run -p 3000:3000 --env-file .env.local quantamkube-ai
```

### Kubernetes

```bash
kubectl apply -f k8s/
```

### Vercel

```bash
vercel deploy
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Auth**: NextAuth.js v5
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 1.5 Pro/Flash
- **State**: Zustand, TanStack Query
- **Code**: Shiki, React Markdown

## Project Structure

```
├── app/
│   ├── (auth)/          # Login, signup, forgot-password
│   ├── (dashboard)/     # Protected dashboard routes
│   ├── api/             # API routes (auth, chat)
│   ├── settings/        # Settings page
│   └── globals.css      # Global styles & animations
├── src/
│   ├── components/      # React components
│   ├── lib/             # Utilities, services, helpers
│   └── types/           # TypeScript types
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
├── k8s/                 # Kubernetes manifests
├── Dockerfile           # Docker configuration
└── docker-compose.yml   # Docker compose
```

## Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Prisma commands
npx prisma generate         # Generate Prisma client
npx prisma migrate dev      # Create migration
npx prisma db push          # Push schema to database
npx prisma studio          # Open Prisma Studio GUI
```

## Troubleshooting

**Issue**: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Issue**: Database connection error
- Check `DATABASE_URL` in `.env.local`
- Ensure Supabase project is running
- Run `npx prisma db push` to sync schema

**Issue**: Gemini API errors
- Verify `NEXT_PUBLIC_GEMINI_API_KEY` is correct
- Check API quota at https://makersuite.google.com/app/billing

## License

Proprietary - QuantamKube AI

## Support

For issues and feature requests, please open an issue on GitHub.

---

Built with ❤️ by the QuantamKube AI team.