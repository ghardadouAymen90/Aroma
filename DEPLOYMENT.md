# Deployment Guide - Aroma E-commerce App

This guide will walk you through deploying the Aroma e-commerce application to **Vercel**.

**Note:** The app currently uses mock data and external image URLs, so no additional services (MongoDB, Cloudinary) are required.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Vercel Deployment](#vercel-deployment)
3. [Post-Deployment](#post-deployment)
4. [Future Enhancements](#future-enhancements)

---

## Prerequisites

- GitHub account (for deploying with Vercel)
- Git installed

---

## Vercel Deployment

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial Aroma project setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aroma.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Paste your GitHub repo URL
5. Click **"Import"**
6. Configure environment variables (optional - see below)
7. Click **"Deploy"**

### Step 3: Environment Variables (Optional)
Only needed if you add API keys later. Currently not required.

**Optional variables:**
```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
NODE_ENV=production
```

To add:
1. Go to your Vercel project → **Settings**
2. Click **"Environment Variables"**
3. Add any variables you need
4. Click **"Deploy"** to redeploy

---

## Post-Deployment

### Step 1: Verify Deployment
1. Go to your Vercel project dashboard
2. Check deployment status is "Ready"
3. Visit your domain (e.g., `https://aroma.vercel.app`)

### Step 2: Test the App
- Browse products
- Test authentication (uses mock data)
- Add items to cart
- Test filters and search

### Step 3: Enable Custom Domain (Optional)
1. In Vercel settings, click **"Domains"**
2. Add your custom domain
3. Update DNS records as instructed

---

## Cost

**Completely FREE!** ✅
- Vercel: Free tier for Next.js
- Images: External URLs (no storage cost)
- Database: In-memory mocks (no database cost)

---

## Future Enhancements

When you're ready to move to production, add:

### 1. **Real Database** (MongoDB Atlas)
- Current: Mock data in memory
- Future: Persistent data storage
- Cost: Free tier available

### 2. **Image Uploads** (Cloudinary)
- Current: External URLs only
- Future: User/admin uploads
- Cost: Free tier available

### 3. **Email Service**
- Current: None
- Future: Order notifications, password reset
- Cost: Free tier services available

### 4. **Payment Processing** (Stripe)
- Current: Mock checkout
- Future: Real payments
- Cost: 2.9% + $0.30 per transaction

---

## Troubleshooting

### Deployment Fails
- Check build logs in Vercel dashboard
- Run `npm run build` locally to test
- Ensure Node.js 18+ is specified

### App Shows 404
- Verify all imports use correct paths
- Check that pages are in `/app` directory
- Restart deployment

---

## Quick Deploy Button

Add this to README for one-click deploy:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Faroma)
```

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub: Add issues for problems

