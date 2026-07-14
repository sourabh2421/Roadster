# Vercel 404 API Issue - Diagnosis

## Problem
All API calls return 404 on Vercel deployment, but work fine locally.

---

## Current Setup Analysis

### 1. API Folder Structure
```
/api/
├── availability.js           ← Serverless function format
├── bookings.js              ← Serverless function format
├── bookings/
│   └── [id].js              ← Dynamic route serverless function
├── reviews.js               ← Serverless function format
└── reviews/
    └── [id].js              ← Dynamic route serverless function
```

**✅ Structure is CORRECT** - Files are in Vercel serverless function format

---

### 2. API Handler File Structure (Example: availability.js)

```javascript
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ... handler logic
}
```

**✅ Format is CORRECT** - Using Vercel serverless function signature

---

### 3. vercel.json Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**❌ PROBLEM FOUND:**
- Only builds static files (`@vercel/static-build`)
- Doesn't tell Vercel to treat `/api` files as serverless functions
- Missing `@vercel/node` build configuration

---

### 4. server.js Structure

```javascript
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import availabilityHandler from './api/availability.js';
import bookingsHandler from './api/bookings.js';
// ... routes setup

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

**❌ PROBLEM:**
- `server.js` is an Express server for LOCAL development only
- Vercel doesn't run `server.js` - it expects serverless functions
- Having both Express + serverless functions creates confusion

---

### 5. package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

**Status:** 
- Only builds frontend (Vite)
- No backend build/start script (correct for serverless)
- But vercel.json needs updating to recognize API functions

---

## Root Cause

### Why 404 Happens on Vercel

1. **vercel.json only builds static frontend**
   - `@vercel/static-build` only handles React/Vite build
   - No configuration for `/api` directory as serverless functions

2. **Vercel doesn't auto-detect API functions**
   - Even though files are in `/api` folder with correct structure
   - Needs explicit build configuration in vercel.json

3. **server.js is ignored by Vercel**
   - Vercel doesn't run Express servers
   - `server.js` only works locally with `node server.js`
   - On Vercel, each file in `/api` should be standalone

---

## Architecture Mismatch

### Local Development
```
Frontend (Vite:5173)
    ↓ Proxy
Backend (Express server.js:3000)
    ↓ Routes to
API Handlers (imported as modules)
```

### Vercel Production (Current - BROKEN)
```
Frontend (Static files) ✅
    ↓ Calls /api/*
API Handlers (NOT RECOGNIZED) ❌
    → 404 Not Found
```

### Vercel Production (Should Be)
```
Frontend (Static files) ✅
    ↓ Calls /api/*
API Handlers (Serverless functions) ✅
    → Handled by @vercel/node
```

---

## Why It Works Locally

1. **Vite dev server proxies API calls:**
   ```javascript
   // vite.config.js
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000',
         changeOrigin: true,
       }
     }
   }
   ```

2. **Express server runs separately:**
   ```bash
   npm run dev    # Starts Vite on :5173
   node server.js # Starts Express on :3000
   ```

3. **Proxy forwards all `/api/*` to Express**
   - Frontend at `:5173/api/bookings`
   - Gets proxied to `:3000/api/bookings`
   - Express handles it

---

## File Structure Status

### ✅ What's Correct

1. **API handlers are serverless-ready:**
   - Using `export default async function handler(req, res)`
   - CORS headers set correctly
   - No Express-specific code in handlers

2. **Folder structure matches Vercel conventions:**
   - `/api/*.js` for routes
   - `/api/[folder]/[id].js` for dynamic routes

3. **MongoDB connection uses serverless pattern:**
   - Connection pooling with reuse
   - No persistent connections

### ❌ What's Wrong

1. **vercel.json missing API build config:**
   - No `@vercel/node` for API functions
   - Routes config doesn't enable serverless functions

2. **server.js exists but unused on Vercel:**
   - Confusing dual setup
   - Should be documented as "local dev only"

---

## Required Changes

### 1. Fix vercel.json
Need to add API functions build configuration

### 2. Keep server.js for local dev
Document it's only for development

### 3. Environment variables on Vercel
Must be set in Vercel dashboard:
- `MONGODB_URI`
- `VITE_ADMIN_PASSWORD`

---

## Summary

**Current State:**
- ✅ API handlers: Correct serverless format
- ✅ Folder structure: Correct Vercel layout
- ❌ vercel.json: Missing API build config
- ⚠️  server.js: Only for local, ignored by Vercel

**Why 404:**
Vercel doesn't know `/api` folder contains serverless functions because `vercel.json` only builds the static frontend.

**Solution:**
Update `vercel.json` to:
1. Add `@vercel/node` build for API functions
2. Configure rewrites properly
3. Or remove explicit builds and let Vercel auto-detect

---

## Next Steps

Ready to fix? Here's what needs to change:

1. **Update vercel.json** to recognize API functions
2. **Optionally:** Create `.vercelignore` to exclude dev files
3. **Verify** environment variables on Vercel dashboard
4. **Redeploy** and test

Would you like me to show the corrected vercel.json configuration?
