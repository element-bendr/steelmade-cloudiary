 Objective: Create a clean, minimalist website for an office furniture manufacturer using Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Shadcn UI. Incorporate planned enhancements where specified.

Core Requirements:
1.  **Style:** Minimalist, professional, sophisticated. Focus on typography, whitespace, high-quality imagery.
2.  **Color Palette:** Use CSS variables configured via Shadcn `init`. Primary Background: White (#FFFFFF / #FAFAFA mapped to `hsl(var(--background))`). Primary Text/Structure: Dark Gray/Black (#111827 mapped to `hsl(var(--foreground))`). Accent: Red (#B91C1C mapped to a custom variable like `hsl(var(--accent))` or used directly). Use Accent sparingly for CTAs, interactive states, highlights. Use muted grays (`hsl(var(--muted))`) for borders/secondary text.
3.  **Technology Stack:** Next.js 14+ (App Router), TypeScript (strict mode), Tailwind CSS, Shadcn UI components. Use `Framer Motion` for subtle animations. Plan data structures anticipating potential Headless CMS integration (e.g., define TypeScript interfaces for Product, Post, CaseStudy).
4.  **Key Sections Required:**
    *   Homepage (`/`)
    *   About Us (`/about`) (Include structure for interactive timeline/craftsmanship sections)
    *   Products (PLP at `/products`, PDP at `/products/[productId]`) (Include structure for advanced filters/sorting on PLP, enhanced gallery/specs table on PDP)
    *   Case Studies (`/case-studies`, `/case-studies/[studyId]`) (Enhancement)
    *   Blog (`/blog`, `/blog/[postId]`) (Enhancement)
    *   Contact Us (`/contact`) (Include Shadcn form setup)
5.  **UI Components:** Utilize Shadcn UI components extensively (Button, Card, NavigationMenu, Select, Checkbox, Accordion, Table, Input, Textarea, Label, Carousel, Skeleton, Toast, Sheet/DropdownMenu, Form). Install using `npx shadcn-ui@latest add [component]`. Customize via Tailwind classes.
6.  **Key Principles:** Fully Responsive Design, WCAG 2.1 AA Accessibility (use semantic HTML, provide alt text, ensure keyboard navigation), High Performance (`next/image`, code splitting), Good SEO practices (semantic HTML, plan for meta tags & Schema.org JSON-LD).
7.  **Brand Voice:** Professional, trustworthy, emphasizes quality, craftsmanship, heritage.

Initial Task:
1.  Initialize Next.js project: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2.  Initialize Shadcn UI: `npx shadcn-ui@latest init` (Choose appropriate settings, e.g., Default style, CSS Variables: Yes, define color variables based on #FFFFFF/#FAFAFA, #111827, #B91C1C).
3.  Install necessary base Shadcn components: `button`, `navigation-menu`, `card`, `input`, `label`, `textarea`, `select`, `checkbox`, `accordion`, `table`, `carousel`, `skeleton`, `toast`, `sheet`, `dropdown-menu`.
4.  Install Framer Motion: `npm install framer-motion`
5.  Define basic TypeScript interfaces for core data types (`Product`, `Post`, `CaseStudy`) in a `types/` directory.
6.  Create the main `app/layout.tsx` including basic HTML structure, font loading (e.g., Inter from `next/font/google`), and Tailwind integration.
7.  Implement reusable `Header` component (`components/layout/Header.tsx`) using Shadcn `NavigationMenu` with placeholder links (Home, About, Products, Case Studies, Blog, Contact). Include responsive mobile menu logic using `Sheet` or `DropdownMenu`.
8.  Implement reusable `Footer` component (`components/layout/Footer.tsx`) with placeholder links (Copyright, Privacy, Terms).
9.  Create the basic structure for `app/page.tsx` (Homepage) with placeholder sections (Hero, Featured Products, History Snippet) using Shadcn `Card`, `Button`, etc. Use placeholder text and image URLs initially. Apply basic layout styles using Tailwind utilities.

Constraint Checklist:
*   Use App Router.
*   Use TypeScript.
*   Style ONLY with Tailwind utility classes (applied directly or via Shadcn component props/internal modification).
*   Use Shadcn components where applicable.
*   Use `next/image` for images.
*   Use `next/link` for internal navigation.
*   Implement basic responsiveness from the start.
*   Write clean, readable code with comments where necessary.