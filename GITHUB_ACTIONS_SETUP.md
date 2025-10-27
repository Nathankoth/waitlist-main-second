# GitHub Actions Setup Guide

## Required GitHub Secrets

To fix the `vercel-token` error, you need to add the following secrets to your GitHub repository:

### 1. VERCEL_TOKEN
- **Purpose**: Authentication token for Vercel API
- **How to get it**:
  1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
  2. Click "Create Token"
  3. Give it a name (e.g., "GitHub Actions")
  4. Copy the generated token

### 2. VERCEL_ORG_ID
- **Purpose**: Your Vercel organization/team ID
- **How to get it**:
  1. Go to your Vercel project settings
  2. Look for "Project ID" or "Organization ID" in the General tab
  3. Or run: `vercel link` locally and check `.vercel/project.json`

### 3. VERCEL_PROJECT_ID
- **Purpose**: Your specific Vercel project ID
- **How to get it**:
  1. Go to your Vercel project settings
  2. Find "Project ID" in the General tab
  3. Or run: `vercel link` locally and check `.vercel/project.json`

## How to Add Secrets to GitHub

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the exact names:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` 
   - `VERCEL_PROJECT_ID`

## Alternative: Get IDs from Vercel CLI

If you have Vercel CLI installed locally:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (run this in your project directory)
vercel link

# This will create .vercel/project.json with your IDs
cat .vercel/project.json
```

## Workflow Features

The created workflow will:
- ✅ Trigger on pushes to main/master branches
- ✅ Trigger on pull requests to main/master branches
- ✅ Install dependencies with `npm ci`
- ✅ Build your project with `npm run build`
- ✅ Deploy to Vercel production
- ✅ Use proper caching for faster builds

## Troubleshooting

### Error: "Input required and not supplied: vercel-token"
- **Solution**: Make sure you've added the `VERCEL_TOKEN` secret to your GitHub repository

### Error: "Invalid vercel-org-id"
- **Solution**: Check that `VERCEL_ORG_ID` is correct (usually your username for personal accounts)

### Error: "Project not found"
- **Solution**: Verify `VERCEL_PROJECT_ID` matches your actual Vercel project

## Security Notes

- ✅ All secrets are encrypted by GitHub
- ✅ Secrets are only available to GitHub Actions
- ✅ Never commit these values to your repository
- ✅ Use environment variables for sensitive data in your app
