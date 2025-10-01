# Relynk - Web3 Link-in-Bio Platform

A comprehensive link-in-bio platform built on Aptos blockchain, combining the simplicity of Linktree with Web3 monetization capabilities.

## 🚀 Features

- **Link-in-Bio Profile** - Create customizable profiles with unlimited links
- **Payment Links** - Monetize content with USDC payments on Aptos
- **Subscription Support** - Recurring billing for premium content
- **Analytics Dashboard** - Track profile views and link clicks
- **Custom Themes** - Personalize your profile with custom colors and gradients
- **Embeddable Widgets** - Share payment links anywhere
- **Content Delivery** - Multiple delivery methods (links, files, access codes, text)

## 📋 Prerequisites

- **Node.js** 20.x (see `.nvmrc`)
- **npm** (comes with Node.js)
- **Git**

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd relynk-aptos
npm install
```

The installation will automatically set up Git hooks via Husky.

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📜 Available Scripts

### Development

```bash
npm run dev              # Start development server with Turbopack
npm start                # Start production server
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run type-check       # Run TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run validate         # Run all checks (type-check + lint + format:check)
```

### Build

```bash
npm run build            # Build production application
```

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Blockchain**: Aptos (via @aptos-labs/ts-sdk)
- **Forms**: React Hook Form + Zod
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React

## 🔄 CI/CD Pipeline

This project uses a comprehensive CI/CD pipeline with automated checks:

### Git Hooks (Husky)

**Pre-commit** (runs on every commit):

- ✅ Lints and formats staged files
- ✅ TypeScript type checking
- ✅ Auto-fixes issues when possible

**Pre-push** (runs before pushing):

- ✅ Full codebase linting
- ✅ TypeScript type checking
- ✅ Production build verification

**Commit-msg** (validates commit messages):

- ✅ Enforces Conventional Commits format

### GitHub Actions Workflow

Automated pipeline runs on push/PR to `dev`, `staging`, and `main`:

1. **Lint & Type Check** - Code quality validation
2. **Build** - Production build verification
3. **Deploy** - Automatic deployment:
   - `dev` → Development environment
   - `staging` → Staging environment
   - `main` → Production environment

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

**Examples**:

```bash
feat: add user authentication
fix: resolve navigation bug
docs: update API documentation
```

## 🌿 Branch Strategy

```
main (production)
  ↑
staging (pre-production)
  ↑
dev (development)
  ↑
feature/* (feature branches)
```

## 📁 Project Structure

```
relynk-aptos/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── [username]/         # Public profile pages
│   │   ├── dashboard/          # Dashboard pages
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── features/           # Feature-specific components
│   │   ├── layouts/            # Layout components
│   │   └── ui/                 # Reusable UI components (shadcn)
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions
├── .github/workflows/          # GitHub Actions CI/CD
├── .husky/                     # Git hooks
├── public/                     # Static assets
└── [config files]
```

## 🧪 Testing Your Changes

Before committing, run:

```bash
npm run validate  # Run all checks
npm run build     # Ensure build works
```

## 🚫 Bypassing Hooks (Emergency Only)

```bash
git commit --no-verify -m "message"
git push --no-verify
```

⚠️ **Warning**: Use only in emergencies. CI pipeline will still catch issues.

## 📚 Documentation

- **[CI/CD Setup](./CI_CD_SETUP.md)** - Detailed CI/CD documentation
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute (if available)

## 🔐 Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_APTOS_NETWORK=testnet
# ... other variables
```

## 🐛 Troubleshooting

### Hooks not running

```bash
npm run prepare
chmod +x .husky/pre-commit .husky/pre-push .husky/commit-msg
```

### Type check failures

```bash
npm run type-check
```

### Build failures

```bash
npm run build
```

### Formatting issues

```bash
npm run format
```

## 📝 License

[Your License Here]

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and follow the commit message conventions.

## 📧 Support

For issues and questions, please open a GitHub issue.

---

Built with ❤️ using Next.js and Aptos
