# Rollback Procedures - Template Refactoring

**Project:** SteelMade Cloudiary Chairs - Template-Based Architecture Refactoring  
**Created:** September 27, 2025  

## Overview

This document provides comprehensive rollback procedures for the template-based refactoring, ensuring safe recovery from any issues that may arise during or after migration. All procedures are designed to minimize downtime and preserve data integrity.

---

## Rollback Levels

### Level 1: Immediate Emergency Rollback (Critical Production Issues)
**Timeline**: 5-15 minutes  
**Scope**: Complete system rollback  
**Trigger**: Critical functionality broken, site down, major security issue

### Level 2: Component-Specific Rollback (Isolated Issues)
**Timeline**: 15-30 minutes  
**Scope**: Specific component or category  
**Trigger**: Issues affecting specific functionality but not entire system

### Level 3: Feature-Level Rollback (Gradual Reversion)
**Timeline**: 1-4 hours  
**Scope**: Specific features or improvements  
**Trigger**: Performance degradation, user experience issues

### Level 4: Partial Rollback (Selective Reversion)
**Timeline**: 4-8 hours  
**Scope**: Individual files or configurations  
**Trigger**: Minor issues, optimization needs, specific bugs

---

## Pre-Rollback Checklist

### Before Initiating Any Rollback
- [ ] **Identify Issue Scope**: Document what's broken and impact level
- [ ] **Check Monitoring**: Review error logs, performance metrics, user reports
- [ ] **Verify Rollback Target**: Confirm which version/commit to roll back to
- [ ] **Notify Stakeholders**: Alert team and stakeholders of rollback initiation
- [ ] **Backup Current State**: Create snapshot of current state before rollback
- [ ] **Test Rollback Plan**: Verify rollback target is stable and accessible

---

## Level 1: Emergency Rollback Procedures

### Complete System Rollback

#### Git-Based Emergency Rollback
```bash
# EMERGENCY ROLLBACK - Complete system reversion
# Execute immediately for critical production issues

# 1. Navigate to repository root
cd /path/to/steelmade-cloudiary-chairs

# 2. Identify last known good commit  
git log --oneline -10
# Look for: "release: production deployment v[version]" or similar

# 3. Hard reset to last stable version
STABLE_COMMIT="[commit-hash-of-last-stable-release]"
git reset --hard $STABLE_COMMIT

# 4. Force push to main branch (USE WITH EXTREME CAUTION)
git push --force-with-lease origin main

# 5. Trigger immediate deployment
# This depends on your deployment system
# Examples:
# - Vercel: Auto-deploy triggered by push
# - Custom: ./deploy.sh --emergency
# - Docker: docker-compose up -d --force-recreate
```

#### Deployment-Level Emergency Rollback
```bash
# If using deployment platforms with rollback features

# Vercel
vercel rollback [previous-deployment-url]

# Netlify  
netlify api rollbackSiteDeploy --site-id [site-id] --deploy-id [deploy-id]

# AWS/Custom deployment
aws elbv2 modify-target-group --target-group-arn [arn] --health-check-path /health
kubectl rollout undo deployment/steelmade-app --to-revision=1
```

### Emergency Rollback Validation
```bash
# Verify rollback success (run these immediately after rollback)

# 1. Check site accessibility
curl -I https://steelmade.com
# Should return 200 OK

# 2. Test critical paths
curl https://steelmade.com/chairs
curl https://steelmade.com/desks  
curl https://steelmade.com/api/health

# 3. Verify database connectivity (if applicable)
npm run db:health-check

# 4. Check error rates
# Monitor error tracking dashboard for 15 minutes
```

---

## Level 2: Component-Specific Rollback

### Category-Specific Rollback
Use when issues affect specific product categories but not the entire system.

```bash
# Rollback specific category pages
# Example: Rolling back chairs category due to display issues

# 1. Identify problematic category
CATEGORY="chairs"

# 2. Restore from backup
git checkout feature/template-refactoring-backup -- app/${CATEGORY}/

# 3. Restore associated components if needed
git checkout feature/template-refactoring-backup -- components/products/ChairCard.tsx
git checkout feature/template-refactoring-backup -- components/chairs/

# 4. Commit the rollback
git add .
git commit -m "rollback: revert ${CATEGORY} category to stable version

- Issues with template implementation affecting ${CATEGORY} pages
- Restored from backup branch
- Temporary fix while investigating template issues

Refs: emergency-rollback-$(date +%Y%m%d-%H%M)"

# 5. Push changes
git push origin feature/template-refactoring

# 6. Deploy specific changes
npm run build
npm run deploy
```

### Template Component Rollback
Use when specific template components are causing issues.

```bash
# Rollback specific template component
# Example: CategoryPageTemplate causing render issues

COMPONENT="CategoryPageTemplate"

# 1. Remove problematic template
rm components/templates/${COMPONENT}.tsx

# 2. Restore original components that were replaced
git checkout feature/template-refactoring-backup -- app/chairs/page.tsx
git checkout feature/template-refactoring-backup -- app/desks/page.tsx
git checkout feature/template-refactoring-backup -- app/storage-solutions/page.tsx

# 3. Update imports in affected files
# This may require manual editing to remove template imports
find app/ -name "*.tsx" -exec sed -i 's/CategoryPageTemplate/OriginalChairsPage/g' {} \;

# 4. Commit rollback
git add .
git commit -m "rollback: remove ${COMPONENT} and restore original components

- Template component causing rendering issues
- Restored individual category page components
- All functionality preserved with original implementation

Refs: component-rollback-$(date +%Y%m%d-%H%M)"

# 5. Test and deploy
npm run test
npm run build
git push origin feature/template-refactoring
```

---

## Level 3: Feature-Level Rollback

### Configuration System Rollback
Use when the configuration system is causing issues but templates work.

```bash
# Rollback configuration system while keeping templates

# 1. Restore hardcoded configurations
git checkout feature/template-refactoring-backup -- lib/config/
git checkout feature/template-refactoring-backup -- lib/styles/

# 2. Update template components to use hardcoded values temporarily
# Manual editing required in template files:
# - Replace dynamic configuration with hardcoded values
# - Comment out configuration imports
# - Add fallback values for theme system

# 3. Create temporary configuration override
cat > lib/config/rollback-config.ts << 'EOF'
// Temporary rollback configuration
export const FALLBACK_CATEGORIES = {
  chairs: {
    title: "Chairs",
    description: "Explore our chair collection",
    theme: { primary: "red-600", accent: "red-100" }
  },
  desks: {
    title: "Desks", 
    description: "Discover our desk range",
    theme: { primary: "blue-600", accent: "blue-100" }
  }
  // Add other categories as needed
};
EOF

# 4. Update template imports
find components/templates/ -name "*.tsx" -exec sed -i 's/PRODUCT_CATEGORIES/FALLBACK_CATEGORIES/g' {} \;

# 5. Commit and deploy
git add .
git commit -m "rollback: temporarily disable dynamic configuration system"
git push origin feature/template-refactoring
```

### Theme System Rollback
Use when theme system is causing visual issues.

```bash
# Rollback to hardcoded themes while keeping templates

# 1. Remove dynamic theme system
rm lib/styles/category-themes.ts

# 2. Create static theme override
cat > lib/styles/static-themes.ts << 'EOF'
// Static theme fallback
export const getStaticTheme = (category: string) => {
  const themes = {
    chairs: "text-red-600 bg-red-50",
    desks: "text-blue-600 bg-blue-50",
    'storage-solutions': "text-green-600 bg-green-50"
  };
  return themes[category] || "text-gray-600 bg-gray-50";
};
EOF

# 3. Update template components
find components/templates/ -name "*.tsx" -exec sed -i 's/useCategoryTheme/getStaticTheme/g' {} \;

# 4. Test and commit
npm run test
git add .
git commit -m "rollback: replace dynamic themes with static implementation"
git push origin feature/template-refactoring
```

---

## Level 4: Partial Rollback

### Single File Rollback
Use for reverting specific files that are causing isolated issues.

```bash
# Rollback single problematic file

FILE_PATH="components/templates/ConfigurableCard.tsx"

# 1. Check file history
git log --oneline -- $FILE_PATH

# 2. Rollback to specific commit
GOOD_COMMIT="[commit-hash]"
git checkout $GOOD_COMMIT -- $FILE_PATH

# 3. Test the change
npm run test:unit -- --testPathPattern=ConfigurableCard

# 4. Commit if tests pass
git add $FILE_PATH
git commit -m "rollback: revert $FILE_PATH to stable version $GOOD_COMMIT"
git push origin feature/template-refactoring
```

### Configuration Value Rollback
Use for reverting specific configuration changes.

```bash
# Rollback specific configuration values

# 1. Edit configuration file
nano lib/config/product-categories.ts

# 2. Revert problematic values to known good state
# Example: Change description back to original
# Before: description: "New problematic description"
# After:  description: "Original working description"

# 3. Test configuration
npm run test:config

# 4. Commit change
git add lib/config/product-categories.ts
git commit -m "rollback: revert problematic configuration values"
git push origin feature/template-refactoring
```

---

## Database Rollback Procedures

### If Database Migrations Were Involved
```bash
# Rollback database changes (if any were made during refactoring)

# 1. Check migration status
npm run db:migration:status

# 2. Rollback to specific migration
npm run db:migration:down --to=[migration-timestamp]

# 3. Verify data integrity
npm run db:health-check
npm run db:verify-data

# 4. Update application configuration if needed
```

### Data Consistency Checks
```bash
# Verify data consistency after rollback

# 1. Check product data
npm run data:verify:products

# 2. Check category mappings  
npm run data:verify:categories

# 3. Verify search indices (if applicable)
npm run search:reindex

# 4. Clear caches
npm run cache:clear
```

---

## Environment-Specific Rollback

### Development Environment
```bash
# Safe rollback for development
git reset --hard [stable-commit]
npm ci
npm run dev
# Test locally before pushing
```

### Staging Environment
```bash
# Rollback staging for testing
git checkout main
git pull origin main
npm run build:staging
npm run deploy:staging
# Verify staging works before production rollback
```

### Production Environment
```bash
# Production rollback with maximum safety
# 1. Enable maintenance mode (if available)
curl -X POST https://api.steelmade.com/admin/maintenance/enable

# 2. Perform rollback
git reset --hard [stable-commit]
npm run build:production
npm run deploy:production

# 3. Verify deployment
npm run test:production:smoke

# 4. Disable maintenance mode
curl -X POST https://api.steelmade.com/admin/maintenance/disable
```

---

## Monitoring During Rollback

### Real-Time Monitoring
```bash
# Monitor during rollback process
watch -n 5 'curl -s -o /dev/null -w "%{http_code}" https://steelmade.com'
tail -f /var/log/nginx/access.log | grep -E "5[0-9]{2}"
```

### Post-Rollback Validation
```bash
# Validate after rollback completion

# 1. Automated tests
npm run test:e2e:critical-path

# 2. Performance check  
npm run lighthouse:critical-pages

# 3. Accessibility check
npm run a11y:validate

# 4. SEO validation
npm run seo:check

# 5. Error monitoring
# Check error tracking dashboard for 30 minutes
```

---

## Communication Protocols

### During Emergency Rollback
1. **Immediate Notification**: Alert team via Slack/emergency channel
2. **Status Updates**: Every 15 minutes during rollback process
3. **Stakeholder Communication**: Notify key stakeholders of impact and ETA
4. **Documentation**: Log all actions taken for post-mortem

### Post-Rollback Communication
```markdown
# Rollback Notification Template

## Rollback Completed - [TIMESTAMP]

**Issue**: [Description of problem that triggered rollback]
**Scope**: [What was rolled back]
**Impact**: [User/business impact]
**Duration**: [How long issue persisted]
**Resolution**: [What was done to resolve]
**Current Status**: [System status after rollback]
**Next Steps**: [Investigation/fix plans]

**Timeline**:
- [TIME] Issue detected
- [TIME] Rollback initiated  
- [TIME] Rollback completed
- [TIME] System validated

**Lessons Learned**: [Brief notes for improvement]
```

---

## Prevention Measures

### Pre-Deployment Safeguards
- [ ] **Feature Flags**: Always deploy with killswitch capability
- [ ] **Gradual Rollout**: Deploy to percentage of traffic first
- [ ] **Monitoring Setup**: Ensure monitoring is in place before deployment
- [ ] **Rollback Testing**: Test rollback procedures in staging
- [ ] **Backup Verification**: Verify backups are complete and accessible

### Automated Rollback Triggers
```yaml
# Example GitHub Actions workflow for automated rollback
name: Auto Rollback on Critical Errors
on:
  deployment_status:
    
jobs:
  monitor-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Monitor Error Rate
        run: |
          ERROR_RATE=$(curl -s "https://api.monitoring.com/error-rate")
          if [ "$ERROR_RATE" -gt 5 ]; then
            echo "Error rate exceeded threshold, triggering rollback"
            gh workflow run rollback.yml
          fi
```

This comprehensive rollback procedure ensures that any issues during the template refactoring can be quickly and safely resolved, minimizing downtime and preserving system integrity.