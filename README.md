# SteelMade Cloudiary

Production furniture brand website for SteelMade, focused on responsive product discovery and enquiry flows.

- **Live demo:** [steelmade.co.in](https://steelmade.co.in)

## Tech stack

- **Next.js 15** (App Router, static generation, on-demand revalidation)
- **Sanity CMS** — content for products, collections, and series
- **Cloudinary** — image hosting and delivery
- **TypeScript**, **Tailwind CSS**
- **Netlify** — hosting and edge rendering

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Required environment variables are listed in `.env.example`. The Sanity project ID and dataset are public (already embedded in the live bundle); the token and revalidation secret are placeholders — replace them with your own.

## Production build

```bash
npm run build
```

This typechecks (`tsc --noEmit`) and statically generates all pages.

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages and routes |
| `components/` | UI and feature components |
| `lib/` | Data access, API helpers, and product logic |
| `sanity/` | Sanity schema definitions and config |
| `public/` | Static assets |

## License

All rights reserved. No license is granted for reuse or redistribution.
