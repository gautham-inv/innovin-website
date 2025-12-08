# Vercel Deployment & Sanity Integration Setup

This guide walks you through deploying the website to Vercel and configuring Sanity CMS integration with live preview and webhook-triggered rebuilds.

## Prerequisites

- Vercel account
- Sanity project deployed (using `npx sanity deploy` from sanity-template folder)
- Sanity project ID and dataset name

## Step 1: Deploy to Vercel

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Setup Sanity integration"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure build settings**
   - Framework Preset: Next.js
   - Root Directory: `Innovin/demo/website` (if monorepo) or leave empty if standalone
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Step 2: Set Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add:

### Required Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-25
SANITY_API_READ_TOKEN=your-read-token
```

### Optional (but recommended)

```env
SANITY_REVALIDATE_SECRET=your-random-secret-string
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio.sanity.studio
```

### How to get these values:

1. **Project ID & Dataset**: 
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Project ID is visible in the URL or project settings
   - Dataset is usually `production`

2. **API Read Token**:
   - In Sanity dashboard: **API → Tokens**
   - Click **Add API token**
   - Name: "Website Read Token"
   - Permissions: **Read** (or **Editor** for draft content)
   - Copy the token

3. **Webhook Secret**:
   - Generate a random string (e.g., use `openssl rand -hex 32`)
   - Use the same value in Sanity webhook configuration

4. **Studio URL**:
   - After deploying Sanity Studio: `https://your-project.sanity.studio`

## Step 3: Deploy and Get Your Site URL

1. After setting environment variables, Vercel will trigger a new deployment
2. Wait for deployment to complete
3. Copy your site URL (e.g., `https://your-site.vercel.app`)

## Step 4: Configure Sanity Webhook for Revalidation

1. **Go to Sanity Dashboard**
   - Navigate to: [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Go to **API → Webhooks**

2. **Create New Webhook**
   - Click **Create webhook**
   - **Name**: "Vercel Revalidation"
   - **URL**: `https://your-site.vercel.app/api/revalidate`
   - **HTTP method**: `POST`
   - **Dataset**: `production` (or your dataset)
   - **Trigger on**: 
     - ✅ `document.publish`
     - ✅ `document.unpublish`
   - **Filter**: `_type == "job"`
   - **Secret** (optional but recommended):
     - Header name: `x-sanity-webhook-secret`
     - Secret: (same value as `SANITY_REVALIDATE_SECRET` in Vercel)

3. **Save the webhook**

## Step 5: Configure Sanity Studio for Live Preview

1. **Update Sanity Studio config** (in `sanity-template/studio/sanity.config.ts`):
   ```typescript
   const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://your-site.vercel.app'
   ```

2. **Set environment variable in Sanity Studio** (if using Sanity Cloud):
   - In Sanity dashboard: **Settings → Environment variables**
   - Add: `SANITY_STUDIO_PREVIEW_URL=https://your-site.vercel.app`

3. **Or update locally** (if running studio locally):
   - Create `.env.local` in `sanity-template/studio/`:
     ```env
     SANITY_STUDIO_PREVIEW_URL=https://your-site.vercel.app
     ```

## Step 6: Test the Integration

### Test Webhook Revalidation

1. **Create/update a job in Sanity Studio**
2. **Publish the job**
3. **Check Vercel logs**:
   - Go to Vercel dashboard → Your project → Deployments
   - Click on the latest deployment → Functions → `/api/revalidate`
   - You should see logs showing revalidation

4. **Verify the page updated**:
   - Visit `https://your-site.vercel.app/careers/[job-slug]`
   - Content should reflect the changes

### Test Live Preview

1. **Open Sanity Studio** (cloud or local)
2. **Open a job document**
3. **Click "Preview" button** (top right)
4. **You should see**:
   - Draft mode enabled
   - Visual editing overlay
   - Real-time updates as you edit

## Troubleshooting

### Webhook not triggering

- Check Vercel function logs for errors
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure filter `_type == "job"` is correct

### Live preview not working

- Verify `SANITY_API_READ_TOKEN` is set correctly
- Check CORS settings in Sanity dashboard
- Verify `SANITY_STUDIO_PREVIEW_URL` points to your Vercel site
- Check browser console for errors

### Build errors

- Ensure all environment variables are set
- Check that Sanity project ID and dataset are correct
- Verify `next-sanity` package is installed

## Architecture Summary

```
┌─────────────────┐
│  Sanity Studio  │
│  (Cloud/Local)  │
└────────┬────────┘
         │
         ├─► Edit Job ──► Publish ──► Webhook ──► /api/revalidate ──► Rebuild Page
         │
         └─► Preview ──► Draft Mode ──► SSR ──► Live Updates
```

**Rendering Strategy:**
- **Static Pages** (Home, About, Why Us): SSG (never update)
- **CMS Pages** (Careers): SSG + Webhook revalidation (update on publish)
- **Live Preview**: SSR (real-time draft content)

## Next Steps

- Monitor webhook calls in Vercel function logs
- Set up error alerts for failed revalidations
- Consider adding webhook retry logic if needed
- Test with multiple job updates to ensure scalability

