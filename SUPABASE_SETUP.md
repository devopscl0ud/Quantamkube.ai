# QuantamKube AI - Supabase Setup Guide

## Your Supabase Project Details

- **Project URL**: https://sznqfjjjedcxbiyeiozd.supabase.co
- **Anon Key**: Already configured in `.env.local`
- **Region**: Check Supabase Dashboard

## ✅ Step 1: Get Your Database Password

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Find the "Connection string" section
5. Copy the password from the connection string or reset it if needed

**Format**: `postgresql://postgres:[PASSWORD]@db.sznqfjjjedcxbiyeiozd.supabase.co:5432/postgres`

Update in `.env.local`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.sznqfjjjedcxbiyeiozd.supabase.co:5432/postgres
```

## ✅ Step 2: Get Service Role Key

1. Go to Supabase Dashboard
2. Go to **Settings** → **API**
3. Under "Project API Keys", find **service_role** key
4. Copy it

Update in `.env.local`:
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## ✅ Step 3: Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create tables in Supabase
npx prisma db push
```

This will create all tables:
- `users` - User accounts
- `accounts` - OAuth connections
- `sessions` - User sessions
- `verification_tokens` - Email verification
- `chats` - Conversation history
- `messages` - Chat messages

## ✅ Step 4: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

Update in `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy_YOUR_KEY_HERE
```

## ✅ Step 5: Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and update in `.env.local`:
```env
NEXTAUTH_SECRET=your-generated-secret
```

## ✅ Step 6: Start Development Server

```bash
npm install
npx prisma generate
npm run dev
```

Visit `http://localhost:3000`

## 🔍 Verify Everything Works

### Test Database Connection
```bash
npx prisma db seed  # Optional: seed with test data
npx prisma studio  # Opens GUI at http://localhost:5555
```

### Test Gemini Integration
1. Sign up at http://localhost:3000
2. Go to `/settings`
3. Paste your Gemini API key
4. Create a new chat and try: "Create a Kubernetes Deployment"

## 🛠️ Troubleshooting

### "Database connection refused"
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Check if you can connect
psql $DATABASE_URL -c "SELECT 1"
```

### "Service role key error"
- Ensure you copied the correct key from Settings → API
- It should start with `eyJhbGciOi...`

### "Gemini API 401 error"
- Go to https://makersuite.google.com/app/apikey
- Create a new key if needed
- Verify key doesn't have typos

### Tables not created
```bash
# Check connection string format
npx prisma db push --skip-generate

# If still failing, check Supabase status at https://status.supabase.com
```

## 📚 Useful Supabase Links

- Dashboard: https://app.supabase.com
- Documentation: https://supabase.com/docs
- Status Page: https://status.supabase.com
- Help: https://supabase.com/support

## 🚀 Next Steps

1. ✅ Update `.env.local` with all credentials
2. ✅ Run `npm install && npx prisma generate`
3. ✅ Initialize database with `npx prisma db push`
4. ✅ Start dev server: `npm run dev`
5. ✅ Sign up and test at http://localhost:3000

---

**You're all set! Start creating Kubernetes manifests with AI! 🚀**
