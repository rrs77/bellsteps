# Fixing Vercel Server Error

## Common Causes & Fixes

### 1. Missing NEXTAUTH_SECRET

**Error:** Server configuration error

**Fix:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `NEXTAUTH_SECRET` = (generate with: `openssl rand -base64 32`)
3. Make sure it's set for **Production**, **Preview**, and **Development**

### 2. Missing NEXTAUTH_URL

**Fix:**
1. Add environment variable: `NEXTAUTH_URL` = `https://your-app-name.vercel.app`
2. Get your exact URL from Vercel dashboard

### 3. Database Migrations Not Run

**Fix:**
After setting up Vercel Postgres, you need to run migrations:

**Option A: Via Admin Page (Easiest)**
1. Make sure `ADMIN_EMAILS` env var includes your email
2. Visit: `https://your-app.vercel.app/admin/seed`
3. Click "Run Seed Script"
4. This will run migrations AND seed data

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel login
cd bellsteps
vercel link
vercel env pull .env.local
npm run migrate
npm run seed
```

### 4. Database Connection Issue

**Check:**
- Vercel Postgres is created in Storage tab
- `POSTGRES_URL` is automatically added (check Environment Variables)
- Connection string format is correct

### 5. Providers Array Empty

If you see "No providers configured" error:

**Fix:** The Credentials provider should always be available. Check `lib/auth.ts` - it should have the providers array with Credentials.

## Quick Checklist

- [ ] `NEXTAUTH_URL` = your Vercel URL
- [ ] `NEXTAUTH_SECRET` = random 32+ character string
- [ ] `ADMIN_EMAILS` = your email
- [ ] Vercel Postgres created in Storage tab
- [ ] `POSTGRES_URL` exists in env vars (auto-added)
- [ ] Migrations run (via `/admin/seed` page)
- [ ] Database seeded (via `/admin/seed` page)

## Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **Functions** tab
4. Look for errors mentioning:
   - "database"
   - "POSTGRES"
   - "NEXTAUTH"
   - "connection"

## Test After Fixes

1. Visit: `https://your-app.vercel.app`
2. Should see landing page
3. Go to `/login`
4. Try to sign in
5. Check for errors in browser console (filter out extension errors)
