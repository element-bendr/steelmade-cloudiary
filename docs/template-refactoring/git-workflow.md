# Git Workflow for Template Refactoring

**Project:** SteelMade Cloudiary Chairs - Template-Based Architecture Refactoring  
**Created:** September 27, 2025  

## Branch Strategy

### Primary Branches
- `main` - Production-ready code (protected)
- `feature/template-refactoring` - Main development branch for refactoring
- `feature/template-refactoring-backup` - Safety backup before major changes
- `feature/template-refactoring-staging` - Pre-production testing

### Branch Protection Rules
```bash
# Main branch protection (GitHub repository settings)
# - Require pull request reviews
# - Require status checks to pass
# - Require up-to-date branches
# - Include administrators in restrictions
# - Restrict pushes
```

## Git Commands Reference

### Initial Setup
```bash
# 1. Create and switch to main development branch
git checkout -b feature/template-refactoring
git push -u origin feature/template-refactoring

# 2. Create backup branch for rollback safety
git checkout -b feature/template-refactoring-backup
git push -u origin feature/template-refactoring-backup

# 3. Create staging branch for pre-production testing
git checkout feature/template-refactoring
git checkout -b feature/template-refactoring-staging
git push -u origin feature/template-refactoring-staging

# 4. Return to main development branch
git checkout feature/template-refactoring
```

### Daily Workflow

#### Before Starting Work
```bash
# Update local branches with remote changes
git fetch origin
git checkout feature/template-refactoring
git pull origin feature/template-refactoring

# Create backup of current state (daily)
git checkout feature/template-refactoring-backup
git reset --hard feature/template-refactoring
git push --force-with-lease origin feature/template-refactoring-backup
git checkout feature/template-refactoring
```

#### During Development
```bash
# Make atomic commits with descriptive messages
git add [specific-files]
git commit -m "feat: implement CategoryPageTemplate with configuration injection

- Create core template component for category pages
- Add configuration-driven theming system
- Implement customization points for edge cases
- Update documentation with usage examples

Refs: #template-refactoring-phase-3.1"

# Push regularly to remote
git push origin feature/template-refactoring
```

#### End of Day
```bash
# Create checkpoint with current progress
git tag -a "checkpoint-$(date +%Y%m%d)" -m "Daily checkpoint: $(date +%Y-%m-%d)"
git push origin --tags
```

### Phase Completion Workflow

#### Phase Completion
```bash
# 1. Complete all phase tasks and tests
git add .
git commit -m "feat: complete Phase [X] - [Phase Name]

- All phase deliverables implemented
- Tests passing and validated
- Documentation updated
- Performance benchmarks met

Phase [X] Status: COMPLETE"

# 2. Update staging branch
git checkout feature/template-refactoring-staging
git merge feature/template-refactoring
git push origin feature/template-refactoring-staging

# 3. Tag phase completion
git tag -a "phase-[X]-complete" -m "Phase [X]: [Phase Name] - Complete"
git push origin --tags
```

### Emergency Rollback Procedures

#### Immediate Rollback (Critical Issues)
```bash
# Option 1: Revert to last known good state
git log --oneline -10  # Find last good commit
git reset --hard [commit-hash]
git push --force-with-lease origin feature/template-refactoring

# Option 2: Use backup branch
git reset --hard origin/feature/template-refactoring-backup
git push --force-with-lease origin feature/template-refactoring
```

#### Partial Rollback (Specific Files/Components)
```bash
# Rollback specific files from backup
git checkout feature/template-refactoring-backup -- [file-path]
git commit -m "fix: rollback [component-name] due to [issue-description]"
git push origin feature/template-refactoring
```

#### Phase Rollback
```bash
# Rollback to specific phase tag
git reset --hard phase-[X]-complete
git push --force-with-lease origin feature/template-refactoring
```

### Production Deployment Workflow

#### Pre-Production Testing
```bash
# 1. Merge to staging for final testing
git checkout feature/template-refactoring-staging
git merge feature/template-refactoring
git push origin feature/template-refactoring-staging

# 2. Run comprehensive tests on staging
npm run test:full
npm run test:e2e
npm run build:production
```

#### Production Release
```bash
# 1. Create release branch
git checkout main
git pull origin main
git checkout -b release/template-refactoring-v1.0.0

# 2. Merge development branch
git merge feature/template-refactoring

# 3. Final testing and validation
npm run test:full
npm run build:production

# 4. Create release tag
git tag -a "v1.0.0-template-refactoring" -m "Template-based architecture refactoring v1.0.0

Major Changes:
- Implemented template-based architecture
- Reduced codebase size by 70%
- Unified product category system
- Improved performance and maintainability

Migration Guide: docs/template-refactoring-guide.md"

# 5. Push release
git push origin release/template-refactoring-v1.0.0
git push origin --tags
```

#### Post-Deployment Cleanup
```bash
# After successful production deployment
git branch -d feature/template-refactoring-backup
git push origin --delete feature/template-refactoring-backup

# Keep main development and staging branches for future work
```

## Commit Message Standards

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature implementation
- `fix`: Bug fixes
- `docs`: Documentation updates
- `style`: Code style changes (no logic changes)
- `refactor`: Code refactoring without feature changes
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
# Feature implementation
git commit -m "feat(templates): implement ConfigurableCard component

- Replace multiple card components with single configurable component
- Add category-specific theming support
- Implement variant system for different card types
- Maintain visual parity with existing components

Performance: Bundle size reduced by 15KB
Refs: #template-refactoring-phase-3.3"

# Bug fix
git commit -m "fix(templates): resolve category theme loading issue

- Fix async loading of category configurations
- Add proper error handling for missing themes
- Implement fallback theme system
- Update tests for error scenarios

Fixes: Category pages showing default theme instead of configured theme
Refs: #template-refactoring-phase-2.2"

# Documentation
git commit -m "docs(architecture): update template system documentation

- Add component relationship diagrams
- Document configuration patterns
- Include troubleshooting guide
- Update developer onboarding guide

Refs: #template-refactoring-phase-8.1"
```

## Branch Naming Conventions

### Feature Branches
- `feature/template-refactoring` - Main development
- `feature/template-refactoring-[component]` - Specific component work
- `feature/template-refactoring-[phase]` - Phase-specific branches

### Hotfix Branches
- `hotfix/template-refactoring-[issue]` - Emergency fixes

### Release Branches
- `release/template-refactoring-v[version]` - Production releases

## Merge Strategy

### Development Merges
```bash
# Use merge commits for feature branches (preserve history)
git merge --no-ff feature/template-refactoring-[component]
```

### Production Merges
```bash
# Use squash merges for clean production history
git merge --squash feature/template-refactoring
```

## Conflict Resolution

### Common Conflicts
1. **Configuration Changes**: Multiple developers updating category configs
2. **Component Imports**: Changes in component export/import paths
3. **Type Definitions**: Updates to TypeScript interfaces

### Resolution Process
```bash
# 1. Identify conflict files
git status

# 2. Open conflict files and resolve
# Look for conflict markers: <<<<<<< ======= >>>>>>>

# 3. Test resolution
npm run build
npm run test

# 4. Complete merge
git add .
git commit -m "resolve: merge conflicts in [affected-components]"
```

## Backup and Recovery

### Automated Backups
```bash
# Create daily backup script
#!/bin/bash
# backup-daily.sh
DATE=$(date +%Y%m%d)
git checkout feature/template-refactoring-backup
git reset --hard feature/template-refactoring
git tag -a "backup-$DATE" -m "Daily backup $DATE"
git push --force-with-lease origin feature/template-refactoring-backup
git push origin --tags
git checkout feature/template-refactoring
```

### Recovery Procedures
```bash
# List available backups
git tag -l "backup-*" --sort=-version:refname

# Restore from specific backup
git reset --hard backup-[date]
git push --force-with-lease origin feature/template-refactoring
```

## Monitoring and Alerts

### GitHub Actions Workflow
```yaml
# .github/workflows/template-refactoring-ci.yml
name: Template Refactoring CI
on:
  push:
    branches: [ feature/template-refactoring* ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test:full
      - name: Build production
        run: npm run build:production
      - name: Performance benchmark
        run: npm run benchmark
```

This git workflow ensures safe, traceable, and recoverable development throughout the template refactoring process.