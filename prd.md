 Okay, let's create a detailed, step-by-step PRD and a Master Prompt tailored for an AI code generator (like GitHub Copilot, Cursor AI, or similar IDE integrations). We'll incorporate the enhancements discussed.

---

## Product Requirements Document (PRD) - Minimalist Office Furniture Website

**Version:** 1.0
**Date:** 2023-10-27
**Author:** [Your Name/Team]

**1. Introduction & Goals**

*   **1.1. Project:** Develop a modern, minimalist corporate website for [Manufacturer Name], an office furniture manufacturer.
*   **1.2. Goals:**
    *   Establish a premium online presence reflecting brand quality, craftsmanship, and rich history.
    *   Effectively showcase the product catalog with high-quality visuals and detailed information.
    *   Generate qualified B2B leads (quote requests, designer inquiries, dealer contacts).
    *   Serve as a primary resource for potential clients, interior designers, architects, and distributors.
    *   Enhance brand storytelling and build trust.
*   **1.3. Target Audience:**
    *   Primary: Businesses (Facility Managers, Purchasing Agents), Interior Designers, Architects, Furniture Dealers/Distributors.
    *   Secondary: End-consumers seeking high-end home office furniture.

**2. Functional Requirements**

*   **2.1. Global Elements:**
    *   **Header:**
        *   Logo (Left-aligned).
        *   Navigation Menu (Center or Right-aligned): Home, About Us, Products, Case Studies (Enhancement), Blog (Enhancement), Contact.
        *   Use Shadcn UI `NavigationMenu` for structure and potential dropdowns.
        *   Minimalist design, clear active/hover states using the red accent.
        *   Responsive: Hamburger menu on mobile/tablet using Shadcn `Sheet` or `DropdownMenu`.
    *   **Footer:**
        *   Simple layout: Copyright, Privacy Policy, Terms of Service links.
        *   Optional: Social media icons, brief address/contact.
        *   Use subtle separators (e.g., light grey border).
    *   **Search (Enhancement - Phase 2/3):**
        *   Initially, a simple icon/link placeholder.
        *   Future implementation: Modal search bar (`Command` or `Dialog` from Shadcn) potentially powered by Algolia or database search.

*   **2.2. Homepage (`/`)**
    *   **Hero Section:**
        *   Full-width high-quality image or background video (Enhancement) showcasing products/brand aesthetic.
        *   Compelling Headline (H1) emphasizing quality/design.
        *   Short descriptive text.
        *   Primary CTA: Shadcn `Button` (Red accent) e.g., "Explore Collections" or "Discover Our Story".
        *   Subtle scroll-down indicator (optional).
    *   **Brand Introduction:**
        *   Short section (~2-3 sentences) on core values/mission.
        *   Minimalist design, clear typography.
    *   **Featured Products/Collections:**
        *   Grid layout (2-4 items).
        *   Use Shadcn `Card` component for each item: High-quality image, Title, Link.
        *   Subtle hover effect (e.g., slight scale, border highlight).
    *   **History Snippet:**
        *   Visually distinct section hinting at the company's heritage.
        *   Small image (historical?), brief text, and CTA Button linking to About Us page.
    *   **Craftsmanship/Materials Teaser (Enhancement):**
        *   Small section linking to a dedicated page/section about quality.
    *   **Testimonials/Client Logos (Optional):**
        *   Clean display of logos or short quotes using Shadcn `Avatar` or simple text blocks.

*   **2.3. About Us Page (`/about`)**
    *   **Company Story:** Detailed narrative of the company's history, evolution, and founding principles.
    *   **Interactive Timeline (Enhancement):**
        *   Vertical or horizontal timeline component showcasing key milestones with text/images. Consider using a library or building custom with Framer Motion for subtle animations on scroll.
    *   **Values Section:** Clearly defined company values (e.g., Quality, Sustainability, Design).
    *   **Materials & Craftsmanship Section (Enhancement):**
        *   Detail the types of materials used (woods, metals, fabrics).
        *   Showcase the manufacturing process (photos/short video clips).
        *   Highlight quality control and attention to detail. Use high-res close-up imagery.
    *   **Team Section (Optional):** Photos/bios of key leadership.

*   **2.4. Products Section**
    *   **2.4.1. Product Listing Page (PLP) (`/products`, `/products/[category]`)**
        *   Clean grid layout displaying products.
        *   Use Shadcn `Card` for each product: Image, Name, Category/Short Description.
        *   **Advanced Filtering (Enhancement):**
            *   Sidebar or dropdown filters using Shadcn `Checkbox`, `Select`, `Accordion`.
            *   Filter by: Category (Chairs, Desks, Storage), Collection, Material, Features (e.g., Ergonomic).
            *   Clear "Apply Filters" and "Reset" buttons.
        *   **Sorting:** Shadcn `Select` dropdown (Sort by Name, Newest).
        *   Pagination or "Load More" button using Shadcn `Pagination` or `Button`.
    *   **2.4.2. Product Detail Page (PDP) (`/products/[productId]`)**
        *   **Product Title (H1).**
        *   **Enhanced Image Gallery (Enhancement):**
            *   Main image with thumbnails below/beside.
            *   Use Shadcn `Carousel` or a library like `react-image-gallery`.
            *   Support multiple high-resolution images, zoom on hover/click.
            *   Potential for 360° View embed (Enhancement - Placeholder initially).
        *   **Product Description:** Detailed text using clear typography.
        *   **Specifications:** Use Shadcn `Table` for structured data (Dimensions, Weight, Materials, Warranty).
        *   **Color/Finish Options:** Visual swatches if possible (clickable elements changing main image).
        *   **CTA:** Prominent Shadcn `Button` (Red accent): "Request a Quote", "Find a Dealer", or "Contact Sales".
        *   **Downloadables (Optional):** Link/Button to download Spec Sheet (PDF).
        *   **Related Products:** Grid of 3-4 related items (using `Card` component).

*   **2.5. Case Studies Page (`/case-studies`) (Enhancement)**
    *   Listing page with previews (Image, Title, Client Name/Industry). Use `Card`.
    *   Individual Case Study Page (`/case-studies/[studyId]`):
        *   Project Overview/Challenge.
        *   Solution provided (featuring manufacturer's products).
        *   High-quality photos of the installation.
        *   Client Testimonial.

*   **2.6. Blog Page (`/blog`) (Enhancement)**
    *   Listing page with blog post previews (Image, Title, Excerpt, Date). Use `Card`.
    *   Individual Blog Post Page (`/blog/[postId]`):
        *   Clean, readable layout for long-form content.
        *   Support for images, headings, lists, blockquotes.

*   **2.7. Contact Us Page (`/contact`)**
    *   **Contact Form:**
        *   Use Shadcn `Form`, `Input`, `Label`, `Textarea`, `Button`.
        *   Fields: Name, Email, Company (Optional), Phone (Optional), Subject/Inquiry Type (Dropdown using `Select`), Message.
        *   Client-side validation (required fields, email format).
        *   Server-side handling (Next.js API Route or Server Action to send email/store data).
        *   Success/Error messages using Shadcn `Toast` or `Alert`.
    *   **Contact Information:** Address, Phone Number, Email Address. Clearly displayed.
    *   **Map (Optional):** Embedded Google Map using `iframe`.

**3. Non-Functional Requirements**

*   **3.1. Performance:** Target LCP < 2.5s, FID < 100ms. Optimize images (`next/image`), leverage Next.js caching (SSR/SSG appropriately), minimize bundle size. Use Skeleton loaders (`Shadcn Skeleton`) for perceived performance.
*   **3.2. SEO:** Semantic HTML (header, nav, main, article, footer), correct heading hierarchy (One H1 per page), unique Meta Titles/Descriptions, Image Alt Text, XML Sitemap generation, **Structured Data (Schema.org - Enhancement)** using JSON-LD for Organization, Product, Article, BreadcrumbList.
*   **3.3. Accessibility:** WCAG 2.1 AA compliance. Keyboard navigation, screen reader compatibility (ARIA attributes where needed - Shadcn helps), sufficient color contrast (Check Red accent carefully), focus indicators.
*   **3.4. Responsiveness:** Fully responsive design adapting cleanly to Mobile, Tablet, Desktop, Large Desktop breakpoints defined in Tailwind.
*   **3.5. Security:** Basic form input sanitization/validation (client & server), CSRF protection (Next.js default), HTTPS.

**4. Design & UI/UX Guidelines**

*   **4.1. Style:** Clean, minimalist, modern, sophisticated, professional. Emphasis on whitespace and typography.
*   **4.2. Color Palette:**
    *   Backgrounds: White (`#FFFFFF` or slightly off-white like `#FAFAFA`).
    *   Text/Structure: Dark Gray/Black (`#111827` or `#0A0A0A`).
    *   Accent: Specific Red (e.g., `#B91C1C` - Claret Red). Use *sparingly* for CTAs, links (hover/active), key highlights, subtle interactive feedback. Avoid large blocks of red.
    *   Maybe a light gray (`#E5E7EB`) for borders, dividers, subtle backgrounds.
    *   *Example Tailwind Config Snippet:*
        ```javascript
        // tailwind.config.js
        theme: {
          extend: {
            colors: {
              border: "hsl(var(--border))", // Shadcn default
              input: "hsl(var(--input))", // Shadcn default
              ring: "hsl(var(--ring))", // Shadcn default
              background: "hsl(var(--background))", // e.g., maps to #FFFFFF or #FAFAFA
              foreground: "hsl(var(--foreground))", // e.g., maps to #111827
              primary: {
                DEFAULT: "hsl(var(--primary))", // Base black/dark grey
                foreground: "hsl(var(--primary-foreground))", // Text on primary bg (likely white)
              },
              secondary: {
                DEFAULT: "hsl(var(--secondary))", // Light grey bg
                foreground: "hsl(var(--secondary-foreground))", // Text on secondary bg
              },
              destructive: { // Can map Red here if appropriate for errors
                DEFAULT: "hsl(var(--destructive))", // e.g., maps to #B91C1C
                foreground: "hsl(var(--destructive-foreground))",
              },
              muted: { // Subtle text/borders
                 DEFAULT: "hsl(var(--muted))",
                 foreground: "hsl(var(--muted-foreground))",
              },
              accent: { // Use this for Red specifically for non-destructive highlights
                DEFAULT: "#B91C1C", // Your chosen Red
                foreground: "#FFFFFF", // Text on accent bg
              },
              // ... other Shadcn defaults (popover, card, etc.)
            },
            // ... other theme extensions (borderRadius, keyframes)
          }
        }
        ```
*   **4.3. Typography:**
    *   Font: Choose a clean, legible Sans-Serif font (e.g., Inter, Manrope - available via Google Fonts or self-host).
    *   Define clear typographic scale (H1-H6 sizes/weights, body text size, line heights) in `tailwind.config.js` or via utility classes. Ensure readability.
*   **4.4. Imagery:** CRITICAL. Use only high-resolution, professionally shot product and lifestyle photos. Consistent style and lighting. Optimize for web.
*   **4.5. Layout:** Use grid layouts for structure. Generous whitespace is key. Consistent spacing/padding using Tailwind's spacing scale.
*   **4.6. Animations (Enhancement):** Use subtle, non-intrusive animations (fade-ins, slight slides) via `Framer Motion` to enhance UX, not distract. Apply on scroll reveal, hover states, page transitions.
    *   *Example Framer Motion Snippet:*
        ```jsx
        import { motion } from 'framer-motion';

        function AnimatedSection({ children }) {
          return (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible, only once
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.section>
          );
        }
        ```
*   **4.7. Components:** Leverage Shadcn UI components extensively. Customize their appearance *only* using Tailwind utility classes passed as props or by modifying the component files within `components/ui`.

**5. Content Strategy**

*   Gather high-quality product data (descriptions, specs, dimensions, materials).
*   Collect/commission high-resolution product photos, lifestyle shots, and potential video assets.
*   Write compelling copy for About Us/History, focusing on brand narrative and quality.
*   Develop content for Case Studies and initial Blog Posts (if implementing enhancements).
*   Define clear CTAs for different user journeys.

**6. Technology Stack**

*   Frontend Framework: Next.js 14+ (App Router)
*   Language: TypeScript
*   Styling: Tailwind CSS
*   UI Components: Shadcn UI
*   Animations: Framer Motion (Enhancement)
*   CMS: Headless CMS (e.g., Sanity, Contentful, Strapi) integration recommended for managing products, blog, case studies (Enhancement - Plan for data structure)
*   Deployment: Vercel / Netlify

**7. Enhancements Summary**

*   Subtle Animations & Micro-interactions (Framer Motion)
*   Hero Video Option
*   Interactive History Timeline
*   Dedicated Materials & Craftsmanship section
*   Case Studies / Portfolio Section
*   Blog / Insights Section
*   Advanced Product Filtering & Sorting
*   Enhanced PDP Image Gallery (Carousel/Zoom)
*   360° Product View / 3D Model potential (Placeholder/Future)
*   Structured Data (Schema.org)
*   Potential for CMS Integration
*   Potential for Advanced Search (Phase 2/3)

**8. Future Considerations**

*   E-commerce functionality (direct sales)
*   User accounts (for designers saving projects/wishlists)
*   Full Internationalization (i18n)
*   Deeper CMS integration for all site content.
*   Live chat support.

---

## Master Prompt for AI Code Generator (IDE Integration)

```prompt
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
```

---

**How to Use with an AI IDE:**

1.  **Feed the PRD:** While the AI might not "read" the PRD file directly in one go, keep it open. Use it to guide your requests. Copy specific sections or requirements from the PRD when asking the AI to implement a particular feature (e.g., "Implement the Product Detail Page gallery based on section 2.4.2 of the PRD, using the Shadcn Carousel component").
2.  **Use the Master Prompt:** Copy the "Master Prompt for AI Code Generator" and paste it as your initial instruction or context-setting prompt within the AI chat/tool. This gives the AI the overall picture and the critical starting steps.
3.  **Iterate Step-by-Step:** Don't ask the AI to build the entire site at once. Follow the "Initial Task" in the prompt. Then, ask for subsequent pieces based on the PRD and the Planner you created earlier (e.g., "Now, build the structure for the About Us page (`/about`) including placeholders for the interactive timeline and craftsmanship sections", "Implement the product grid on the PLP using Shadcn Card and mock data").
4.  **Provide Code Context:** When asking for modifications or additions, ensure the AI has access to the relevant existing code files, or paste snippets into the prompt.
5.  **Review and Refine:** AI-generated code needs careful review. Check it against the PRD requirements, your design sense, and best practices. Debug and refine as needed. Use the AI for boilerplate, component structure, and logic, but maintain control over the final quality and nuance.

This detailed approach provides the necessary structure and specific instructions for both guiding your own development process and effectively leveraging an AI coding assistant. Remember to replace placeholders like `[Manufacturer Name]` and confirm the exact hex code for your red accent.