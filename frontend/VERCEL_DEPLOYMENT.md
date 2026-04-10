# 🚀 Deploy to Vercel

Your dashboard is ready to deploy to Vercel for free. It takes 2 minutes.

## Step 1: Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Connect your GitHub account if prompted

## Step 2: Import Your Project

1. Click **"Add New"** → **"Project"**
2. Select **"Import Git Repository"**
3. Paste: `https://github.com/deadlyripper-ai/dash.git`
4. Click **"Import"**

## Step 3: Configure & Deploy

1. **Framework:** Next.js (auto-detected)
2. **Root Directory:** `frontend/` (important!)
3. **Build Command:** `next build`
4. **Output Directory:** `.next`
5. Click **"Deploy"**

Vercel will build and deploy. Takes ~1-2 minutes.

## Step 4: Share the Link

Once deployed, Vercel gives you a URL like:
```
https://dash-deadlyripper-ai.vercel.app
```

Share this with your team. They just click the link and see the dashboard.

---

## Environment Variables (Optional)

If you need environment variables:

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add any needed `.env` variables
3. Re-deploy

---

## Automatic Deployments

Now when you:
- Push to `main` branch → Vercel auto-deploys to production
- Push to other branches → Vercel creates preview deployments

---

## 🎯 That's It!

Your dashboard is live on the internet. Share the link with your team.

No downloads, no setup, everyone just visits the URL.

---

## Troubleshooting

**Build fails?**
- Check that `Root Directory` is set to `frontend/`
- Check `package.json` exists in that folder

**Pages show 404?**
- Vercel recognized the Next.js app correctly
- Should work automatically

**Want custom domain?**
- Vercel has free custom domain setup
- Go to Project Settings → Domains
