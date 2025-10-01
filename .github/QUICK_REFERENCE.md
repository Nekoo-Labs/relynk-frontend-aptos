# Quick Reference Guide

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm start                # Start production server

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run type-check       # Check TypeScript types
npm run format           # Format all files
npm run format:check     # Check formatting
npm run validate         # Run all checks

# Build
npm run build            # Build for production
```

## 📝 Commit Message Format

```
<type>: <description>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `perf` - Performance
- `test` - Tests
- `chore` - Maintenance
- `ci` - CI/CD
- `build` - Build system

### Examples

```bash
git commit -m "feat: add payment integration"
git commit -m "fix: resolve login issue"
git commit -m "docs: update README"
```

## 🌿 Branch Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add feature"

# Push to remote
git push origin feature/my-feature

# Create PR on GitHub
```

## 🔍 Pre-commit Checks

Runs automatically on `git commit`:

- ✅ Lint staged files
- ✅ Format staged files
- ✅ Type check

## 🚀 Pre-push Checks

Runs automatically on `git push`:

- ✅ Lint entire codebase
- ✅ Type check all files
- ✅ Build application

## 🚫 Bypass Hooks (Emergency)

```bash
git commit --no-verify -m "message"
git push --no-verify
```

## 🐛 Troubleshooting

### Hooks not working

```bash
npm run prepare
chmod +x .husky/pre-commit .husky/pre-push .husky/commit-msg
```

### Type errors

```bash
npm run type-check
```

### Build errors

```bash
npm run build
```

### Format errors

```bash
npm run format
```

## 📊 CI/CD Pipeline

**Triggers**: Push or PR to `dev`, `staging`, `main`

**Jobs**:

1. Lint & Type Check
2. Build
3. Deploy (branch-specific)

## 🔗 Useful Links

- [CI/CD Setup](../CI_CD_SETUP.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Setup Summary](../SETUP_SUMMARY.md)
