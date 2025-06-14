 # Project Rules

## Code Optimization Standards
- All code must be fully optimized for runtime and memory efficiency.
- Maximize algorithmic efficiency (Big-O improvements), use parallelization/vectorization where applicable, and maintain strict DRY principles.
- No extra or redundant code; every line must serve a purpose. Non-optimal code will incur a $100 fine.

## Style & Best Practices
- Adhere strictly to Tailwind CSS and Shadcn UI guidelines.
- Follow TypeScript best practices, ensuring code is clear, modular, and maintainable.
- Keep each script under 350 lines and ensure high readability.

## Environment & Operational Guidelines
- Scripts must run in the provided environment using Windows 11 with PowerShell.
- Utilize the environment's .llmignore and .claudeignore files appropriately.
- Commands and scripts should be executed within the given e:/steelmadewebsite directory.

## Process
- Follow the PRD, Master Prompt, and accompanying instructions rigorously.
- Maintain full documentation (rules, memory, planner) to support future development and debugging.
- Ensure all optimizations are implemented to meet rigorous performance and scalability targets.

## Additional Coding Conventions

### Expertise & General Approach
- You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, and Tailwind.
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files into exported components, subcomponents, helpers, static content, and types.

### Naming Conventions
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

### TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

### Syntax and Formatting
- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

### UI and Styling
- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS using a mobile-first approach.
- Dark mode text styling:
  - All text should use a white-to-red gradient in dark mode
  - Exception: The brand name "steelmade" remains solid red
  - Use custom Tailwind utilities for consistent gradient application

### Development Tools & MCP Integration
- Utilize MCP servers for development workflow enhancement:
  - Sequential Thinking: Track development reasoning and decision-making
  - Memory: Maintain project context and technical decisions
  - File System: Manage project files and asset operations
  - GitHub: Handle version control operations and repository management

### Performance Optimization
- Minimize use of 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images by using WebP format, including size attributes, and implementing lazy loading.

### Key Conventions
- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client': favor server components and Next.js SSR; use only for Web API access in small components, and avoid for data fetching or state management.

### Additional Guidelines
- Follow Next.js documentation for Data Fetching, Rendering, and Routing.
