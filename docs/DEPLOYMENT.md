# Deployment Instructions for steelmade.co.in
**Related Issue:** steelmade-e6o (Visual inconsistency investigation)  
**Date:** 2026-03-04

## Context

Recent analysis identified deployment cache inconsistency causing visual/asset mismatch across routes. The root cause was:
- Timestamp-based build IDs causing unstable asset hashes
- Active PWA service worker caching stale HTML/assets
- Mixed cache generations serving simultaneously at edge

## Pre-Deploy Checklist

✅ Code changes committed:
- `next.config.js`: Removed timestamp build ID, made PWA opt-in
- Test suite normalized and tagged properly
- All tests passing (13/13), typecheck clean

## Deployment Steps

### Option 1: Netlify CLI (Recommended for Cache Control)

```bash
# 1. Ensure you're on latest main with fixes
git pull origin main

# 2. Clear local Next.js cache
rm -rf .next

# 3. Deploy with production flag and trigger cache invalidation
netlify deploy --prod --build

# 4. After successful deploy, manually trigger cache purge (if available)
# Netlify Dashboard → Site Settings → Build & Deploy → Post Processing → Clear Cache
```

### Option 2: Git Push (Auto-deploy)

```bash
# 1. Push commits to trigger auto-deploy
git push origin main

# 2. Monitor deployment in Netlify dashboard
# Watch for successful build completion

# 3. Manually clear CDN cache via Netlify UI after deploy completes
# Navigate to: Site Settings → Build & Deploy → Post Processing → Asset Optimization
# Or use Netlify API to purge cache programmatically
```

### Option 3: Netlify Dashboard (Manual Trigger)

1. Navigate to your site in Netlify dashboard
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Clear cache and deploy site**
4. Wait for build to complete (~3-5 minutes)

## Post-Deploy Verification

### Immediate Checks (Manual)

1. **Visit critical routes in incognito/private window:**
   - `https://steelmade.co.in/`
   - `https://steelmade.co.in/chairs`
   - `https://steelmade.co.in/desks`
   - `https://steelmade.co.in/chairs/director-series`

2. **Open browser DevTools → Network tab:**
   - Verify CSS files return `200` (not `404`)
   - Check JS chunks return `200`
   - Confirm no console errors

3. **Visual inspection:**
   - Homepage hero should display properly
   - Navigation should work
   - All category pages should render with consistent styling

### Automated Verification Script

```bash
# Run the verification script to check asset consistency
node scripts/verify-deployment.mjs

# Expected output: ✅ PASS with no 404 assets
# If FAIL: Review deployment-verification-results.json for details
```

### What to Look For

**✅ Good Signs:**
- All routes return HTTP 200
- CSS/JS assets from `/_next/static/` return 200
- Cache-Control headers present on static assets
- Cache age relatively fresh (< 1 hour after deploy)
- Visual consistency across all pages

**❌ Warning Signs:**
- Any `/_next/static/` assets returning 404
- Dramatically different cache ages between routes (e.g., / has age=350000, /chairs has age=100)
- Console errors about failed chunk loading
- Unstyled or partially styled pages
- Mixed styling between routes

## Rollback Plan

If post-deploy verification fails:

```bash
# 1. Revert to previous deployment via Netlify UI
# Deploys tab → Find last known good deploy → Click menu → "Publish deploy"

# 2. Or revert commits locally and redeploy
git revert HEAD~2..HEAD  # Reverts last 2 commits
git push origin main

# 3. Alert team and document issue in steelmade-e6o
bd update steelmade-e6o --append-notes "Deploy failed verification: [details]"
```

## Known Issues & Workarounds

### Issue: Service Worker Still Active for Some Users

**Symptoms:** Users still seeing old cached content even after fresh deploy

**Fix:**
1. Confirm PWA is disabled (check `ENABLE_PWA` not set in deployment env)
2. Users may need to:
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   - Clear browser cache manually
   - Service worker will unregister itself on next visit since PWA is now disabled

### Issue: Stale CDN Cache

**Symptoms:** Assets still 404 even though build succeeded

**Fix:**
```bash
# Use Netlify API to purge cache (if you have API token)
curl -X POST \
  https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/deploys/DEPLOY_ID/cache \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Environment Variables

**Optional - PWA Re-enable:**

If you want to re-enable PWA after confirming stability:

```bash
# In Netlify: Site Settings → Environment Variables
ENABLE_PWA=true
```

Then trigger a new deployment.

## Success Criteria

Deployment is successful when:

- [ ] Verification script returns `✅ PASS`
- [ ] All critical routes load with proper styling
- [ ] No 404 errors in browser console
- [ ] Cache ages are consistent and fresh
- [ ] Manual testing confirms visual consistency
- [ ] beads issue steelmade-e6o updated with verification results

## Support

If deployment issues persist:
- Check beads issue: `bd show steelmade-e6o`
- Review verification results: `cat deployment-verification-results.json`
- Check Netlify deploy logs for build errors
- Verify all environment variables are set correctly in Netlify UI
