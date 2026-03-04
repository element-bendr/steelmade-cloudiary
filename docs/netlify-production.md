# Netlify Production Contract

This deployment keeps Sanity live in production for content and Cloudinary as the permanent image provider.

## Required Netlify variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `REVALIDATION_SECRET`

## Optional variables

- `SANITY_REVALIDATE_SECRET`
  - Compatibility alias for webhook auth. The app prefers `REVALIDATION_SECRET`, but accepts this alias to avoid production drift during secret rotation.
- `NEXT_PUBLIC_GA_ID`

## Not required for the production website

- `SANITY_API_TOKEN`
- `GMAIL_USER`
- `GMAIL_PASS`
- AWS credentials

## Production behavior

- Sanity remains the live content source.
- Cloudinary remains the canonical image origin.
- Netlify only needs the website runtime and the environment variables above.
- `/api/revalidate` accepts a bearer token from either `REVALIDATION_SECRET` or `SANITY_REVALIDATE_SECRET`.
- If `Authorization: Bearer ...` is rewritten by upstream infrastructure, `/api/revalidate` also accepts `x-revalidation-secret: ...`.

## Deployment check

Run these before promoting a deploy:

```bash
npm run build
npm run lint
npm test
npx --yes --package netlify-cli netlify env:list --context production
npx --yes --package netlify-cli netlify deploy --prod
```
