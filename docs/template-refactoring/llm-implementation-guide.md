# LLM Implementation Guide - Template Refactoring

**Project:** SteelMade Cloudiary Chairs - Template-Based Architecture Refactoring  
**Created:** September 27, 2025  
**For:** LLM Implementation Assistance

## Quick Start Instructions for LLM

This guide provides step-by-step instructions that can be fed to any LLM to ensure consistent, safe, and traceable implementation of the template-based refactoring.

---

## Phase-by-Phase LLM Prompts

### Phase 1 Prompt: Foundation Setup

```
I need you to help me set up the foundation for template-based refactoring. Follow these exact steps:

1. **Git Branch Setup**:
   - Create branch: `feature/template-refactoring`
   - Create backup branch: `feature/template-refactoring-backup`  
   - Set up branch protection rules
   - Document all git commands used

2. **Documentation Structure**:
   - Create `docs/template-refactoring/` directory
   - Set up all documentation files from the provided templates
   - Ensure each file has proper headers and structure
   - Track time spent on each task

3. **Production Standards Compliance**:
   - All code must be TypeScript
   - Maximum 350 lines per file
   - Functional and declarative programming style
   - No sample or demo code
   - Document all changes

4. **Validation**:
   - Verify all branches created successfully
   - Confirm all documentation files exist
   - Test git workflow commands
   - Update time log with actual duration

Please provide git commands, file structures, and time estimates for each task.
```

### Phase 2 Prompt: Configuration System

```
Create the core configuration system for template-based architecture. Requirements:

1. **Category Configuration** (`lib/config/product-categories.ts`):
   - Define CategoryConfig interface with all required properties
   - Map these existing categories: chairs, desks, storage-solutions, hospital-furniture, school-furniture, racking-systems, modular-furniture, office-accessories
   - Include metadata, themes, routes for each category
   - Add validation functions
   - Keep under 350 lines
   - Use functional programming style

2. **Theme System** (`lib/styles/category-themes.ts`):
   - Create CategoryTheme interface
   - Extract color schemes: chairs(red), desks(blue), storage(green)
   - Implement theme application functions
   - Performance optimization required
   - Keep under 350 lines

3. **Type Safety**:
   - Ensure compile-time validation
   - Add proper TypeScript interfaces
   - No any types allowed
   - Export all necessary types

4. **Testing**:
   - Create unit tests for configuration
   - Validate all categories load correctly
   - Test theme application performance
   - Measure loading times

Document all decisions, track time spent, and ensure production standards compliance.
```

### Phase 3 Prompt: Template Components

```
Create the core template components that will replace repetitive code. Requirements:

1. **CategoryPageTemplate** (`components/templates/CategoryPageTemplate.tsx`):
   - Replace 8+ individual category page components
   - Accept categoryId prop and load configuration dynamically
   - Support customization points for edge cases
   - Implement proper SEO and metadata handling
   - Include breadcrumb generation
   - Keep under 350 lines

2. **ProductPageTemplate** (`components/templates/ProductPageTemplate.tsx`):
   - Consolidate ProductDetailLayout, ChairPageLayout, ProductPageLayout
   - Accept productId, categoryId, seriesId props
   - Apply category theming dynamically
   - Support layout overrides
   - Maintain all existing functionality
   - Keep under 350 lines

3. **ConfigurableCard** (`components/templates/ConfigurableCard.tsx`):
   - Replace ChairCard, ProductCard, SeriesCardStatic, SeriesCardInteractive, EnhancedSeriesCard, FeaturedProduct
   - Support variants: series, product, featured
   - Apply category theming
   - Maintain visual parity with originals
   - Add hover effects and interactions
   - Keep under 350 lines

4. **Requirements**:
   - Functional programming style only
   - TypeScript with full type safety
   - No hardcoded values - use configuration
   - Proper error handling and loading states
   - Maintain accessibility standards
   - Performance optimized

5. **Testing**:
   - Test each template with all categories
   - Visual regression testing
   - Performance benchmarking
   - Accessibility validation

Provide complete implementation, test each component, document configuration patterns used.
```

### Phase 4 Prompt: Migration Implementation

```
Migrate existing components to use new templates. Critical requirements:

1. **Safety First**:
   - Backup all original files to `temp-backup/` before changes
   - Migrate one category at a time starting with 'chairs'
   - Test thoroughly before proceeding to next category
   - Keep rollback plan ready

2. **Category Migration Order**:
   - chairs (test category - highest usage)
   - desks (second most important)
   - storage-solutions
   - hospital-furniture, school-furniture, racking-systems, modular-furniture, office-accessories

3. **Migration Steps per Category**:
   - Copy original to temp-backup
   - Replace with CategoryPageTemplate instance
   - Update all imports and exports
   - Test functionality completely
   - Validate SEO metadata preserved
   - Check performance impact
   - Document any issues found

4. **Validation Requirements**:
   - All existing functionality works
   - Visual appearance identical
   - Performance maintained or improved
   - SEO metadata preserved
   - Accessibility maintained
   - No broken links or errors

5. **Rollback Procedure**:
   - Document rollback steps for each migration
   - Test rollback procedure before proceeding
   - Keep original branch available as backup

For each category migrated, provide:
- Backup confirmation
- New implementation
- Test results
- Performance measurements
- Issue log with resolutions

Stop migration if any category fails validation. Proceed only when previous category fully validated.
```

### Phase 5 Prompt: Route Optimization

```
Optimize routing to use dynamic parameters instead of static routes. Requirements:

1. **Dynamic Route Structure**:
   - Replace individual category routes with `app/[category]/page.tsx`
   - Implement `generateStaticParams` for all categories
   - Ensure SEO preservation with proper metadata
   - Maintain URL structure exactly as before

2. **Product Routes**:
   - Update to `app/[category]/[seriesId]/[productId]/page.tsx`
   - Test all existing product URLs still work
   - Verify breadcrumb generation
   - Maintain proper SEO metadata

3. **Sitemap Updates**:
   - Update `app/sitemap.ts` to use configuration
   - Generate URLs dynamically from category config
   - Ensure all URLs included and accessible
   - Test sitemap XML generation

4. **Static Generation**:
   - Implement proper `generateStaticParams`
   - Test build process completes successfully
   - Verify all pages generate at build time
   - Check build performance impact

5. **Validation**:
   - All existing URLs work (no 404s)
   - SEO metadata identical to before
   - Static generation working
   - Sitemap complete and accurate
   - Performance maintained

Document all route changes, test thoroughly, provide rollback plan for routing changes.
```

### Phase 6 Prompt: Cleanup & Optimization

```
Clean up deprecated components and optimize the codebase. Requirements:

1. **Component Removal**:
   - Move deprecated components to `temp-backup/`
   - Remove only after confirming no usage anywhere
   - Update all export/import statements
   - Remove unused type definitions

2. **Bundle Optimization**:
   - Remove unused imports across all files
   - Optimize component exports
   - Tree-shake unused code
   - Measure bundle size impact

3. **Performance Optimization**:
   - Implement proper React.memo where needed
   - Optimize re-renders in templates
   - Lazy load heavy components
   - Measure performance improvements

4. **Code Quality**:
   - Ensure all code meets production standards
   - No code smells or anti-patterns
   - Proper TypeScript throughout
   - Consistent formatting and style

5. **Validation**:
   - Application builds successfully
   - No import/export errors
   - Bundle size reduced significantly
   - Performance improved or maintained

Document all removed components, measure bundle size changes, ensure no functionality lost.
```

### Phase 7 Prompt: Testing & Validation

```
Comprehensive testing of the refactored system. Requirements:

1. **Automated Testing**:
   - Unit tests for all template components
   - Integration tests for template system
   - E2E tests for critical user paths
   - Visual regression tests for all categories

2. **Performance Testing**:
   - Core Web Vitals measurement
   - Bundle size analysis
   - Loading time comparisons
   - Memory usage monitoring

3. **Functionality Testing**:
   - All existing features work identically
   - Navigation and breadcrumbs correct
   - Search and filtering functional
   - Contact forms and interactions work

4. **Cross-Browser Testing**:
   - Test in Chrome, Firefox, Safari, Edge
   - Mobile responsiveness maintained
   - Accessibility standards met
   - SEO functionality preserved

5. **User Acceptance Testing**:
   - Stakeholder review and approval
   - User experience validation
   - Performance acceptance
   - Feature completeness confirmation

Provide comprehensive test results, identify any regressions, document all validation steps.
```

### Phase 8 Prompt: Documentation & Deployment

```
Complete documentation and prepare for production deployment. Requirements:

1. **Documentation Completion**:
   - Architecture documentation updated
   - Developer guide for future maintenance
   - Troubleshooting guide created
   - Migration report completed

2. **Production Deployment**:
   - Staging environment testing
   - Production deployment plan
   - Rollback procedures ready
   - Monitoring and alerting setup

3. **Knowledge Transfer**:
   - Document all configuration patterns
   - Provide examples for adding new categories
   - Create troubleshooting guide
   - Update team onboarding materials

4. **Success Metrics**:
   - Code reduction percentage achieved
   - Performance improvements measured
   - Bundle size reduction documented
   - Development velocity improvements

Ensure all documentation is complete, production deployment successful, and team is trained on new system.
```

---

## LLM Execution Checklist

### Before Each Phase
- [ ] Read production instructions thoroughly
- [ ] Understand phase requirements completely
- [ ] Check previous phase completion
- [ ] Prepare rollback plan
- [ ] Set up time tracking

### During Each Phase
- [ ] Follow production standards strictly (TypeScript, functional, ≤350 lines, etc.)
- [ ] Document all decisions and changes
- [ ] Track time spent on each task
- [ ] Test thoroughly before proceeding
- [ ] Update relevant documentation files

### After Each Phase
- [ ] Validate all requirements met
- [ ] Update time log with actual duration
- [ ] Document any issues encountered
- [ ] Create git commits with proper messages
- [ ] Push changes to feature branch
- [ ] Update task-master-ai.json status

---

## Quality Gates

Each phase must pass these gates before proceeding:

### Code Quality Gates
- [ ] **TypeScript**: No type errors, proper interfaces used
- [ ] **File Size**: All files ≤350 lines
- [ ] **Style**: Functional, declarative, modular code
- [ ] **Standards**: Production instructions followed
- [ ] **Documentation**: All changes documented

### Functionality Gates
- [ ] **Preservation**: All existing functionality works
- [ ] **Performance**: No regression in key metrics
- [ ] **Accessibility**: WCAG standards maintained
- [ ] **SEO**: Metadata and structure preserved
- [ ] **Testing**: Comprehensive tests pass

### Process Gates
- [ ] **Git Workflow**: Proper branching and commits
- [ ] **Time Tracking**: Accurate time logging
- [ ] **Documentation**: Updated architecture docs
- [ ] **Rollback**: Tested rollback procedures
- [ ] **Validation**: Stakeholder approval

---

## Emergency Procedures

### If LLM Encounters Issues
1. **Stop immediately** - Don't continue with broken code
2. **Document the issue** - Record exact error and context
3. **Check rollback options** - Ensure safe reversion possible
4. **Seek guidance** - Consult documentation or team
5. **Resume safely** - Only continue when issue resolved

### Critical Failure Response
1. **Immediate rollback** to last known good state
2. **Document failure** with complete context
3. **Analyze root cause** before attempting again
4. **Update procedures** to prevent recurrence
5. **Test rollback** before resuming work

---

## Success Validation

### Final Acceptance Criteria
- [ ] **70% code reduction** achieved
- [ ] **All functionality preserved** exactly as before
- [ ] **Performance maintained** or improved
- [ ] **Production standards** fully complied with
- [ ] **Documentation complete** and accurate
- [ ] **Team trained** on new system
- [ ] **Rollback tested** and ready
- [ ] **Monitoring active** for production deployment

This guide ensures any LLM can implement the template refactoring safely, consistently, and in compliance with all production standards while maintaining full traceability and rollback capabilities.