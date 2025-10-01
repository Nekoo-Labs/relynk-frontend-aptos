# CI/CD Setup Documentation

## Overview

This project uses a comprehensive CI/CD pipeline with Git hooks and GitHub Actions to ensure code quality from development to production.

## Git Hooks (Husky)

### Pre-commit Hook

Runs automatically before each commit:

- ✅ **Lint-staged**: Lints and formats only staged files
- ✅ **Type checking**: Validates TypeScript types
- ✅ **Auto-fix**: Automatically fixes linting and formatting issues

### Pre-push Hook

Runs automatically before pushing to remote:

- ✅ **Full linting**: Checks entire codebase
- ✅ **Type checking**: Validates all TypeScript files
- ✅ **Build verification**: Ensures the app builds successfully

## Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint and auto-fix issues
npm run type-check       # Run TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run validate         # Run all checks (type-check + lint + format:check)

# Build & Deploy
npm run build            # Build production application
npm run start            # Start production server
```

## CI/CD Pipeline (GitHub Actions)

### Workflow Triggers

- **Push** to `dev`, `staging`, or `main` branches
- **Pull requests** targeting `dev`, `staging`, or `main` branches

### Pipeline Stages

#### 1. Lint & Type Check

- Runs ESLint on all files
- Performs TypeScript type checking
- Validates code formatting with Prettier

#### 2. Build

- Builds the Next.js application
- Uploads build artifacts for deployment
- Only runs if lint and type check pass

#### 3. Deploy (Branch-specific)

- **dev branch** → Development environment
- **staging branch** → Staging environment
- **main branch** → Production environment

## Branch Strategy

```
main (production)
  ↑
staging (pre-production)
  ↑
dev (development)
  ↑
feature/* (feature branches)
```

### Workflow

1. Create feature branch from `dev`
2. Make changes and commit (pre-commit hooks run)
3. Push to remote (pre-push hooks run)
4. Create PR to `dev` (CI runs)
5. Merge to `dev` → Auto-deploy to development
6. Create PR from `dev` to `staging` → Auto-deploy to staging
7. Create PR from `staging` to `main` → Auto-deploy to production

## Setup Instructions

### Initial Setup

```bash
# Install dependencies (includes Husky setup)
npm install

# Husky hooks are automatically installed via the prepare script
```

### Manual Hook Installation

If hooks don't work, run:

```bash
npm run prepare
chmod +x .husky/pre-commit .husky/pre-push
```

## Configuration Files

- **`.husky/`**: Git hook scripts
- **`.lintstagedrc.json`**: Lint-staged configuration
- **`.prettierrc.json`**: Prettier formatting rules
- **`.prettierignore`**: Files to ignore for formatting
- **`eslint.config.mjs`**: ESLint configuration
- **`.github/workflows/ci.yml`**: GitHub Actions workflow

## Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

⚠️ **Warning**: Only use `--no-verify` in emergencies. The CI pipeline will still catch issues.

## Troubleshooting

### Hooks not running

```bash
# Reinstall Husky
npm run prepare
chmod +x .husky/pre-commit .husky/pre-push
```

### Type check failures

```bash
# Run type check to see errors
npm run type-check
```

### Build failures

```bash
# Test build locally
npm run build
```

### Formatting issues

```bash
# Auto-fix formatting
npm run format
```

## Best Practices

1. **Commit often**: Small, focused commits are easier to review
2. **Write meaningful commit messages**: Use conventional commits format
3. **Test locally**: Run `npm run validate` before pushing
4. **Keep branches updated**: Regularly merge from parent branch
5. **Review CI logs**: Check GitHub Actions for any warnings

## Environment Variables

For deployment, ensure these secrets are configured in GitHub:

- `VERCEL_TOKEN` (if using Vercel)
- `NEXT_PUBLIC_*` environment variables
- Any API keys or secrets needed for deployment

## Monitoring

- **GitHub Actions**: View pipeline status in the Actions tab
- **Build artifacts**: Available for 7 days after each build
- **Deployment logs**: Check environment-specific logs

## Support

If you encounter issues with the CI/CD pipeline:

1. Check the GitHub Actions logs
2. Verify all dependencies are installed
3. Ensure Git hooks are executable
4. Run `npm run validate` locally to reproduce issues
