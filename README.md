# Autoscribe AI – Project Setup Guide

## 🧩 Overview

This project is a **monorepo** powered by **Turborepo**, containing multiple applications and packages. It is built with:

- **TypeScript** for static type checking
- **ESLint** for linting
- **Prettier** for formatting
- **pnpm** as the package manager

## 🚀 Prerequisites

Ensure you have the following installed:

- **Node.js** v18 or higher
- **pnpm** v9.0.0 or higher

## 🔧 Initial Setup

1. **Clone the repository**  
   Replace `<repository-url>` with your actual repo URL:
   ```bash
   git clone <repository-url>
   cd autoscribe-ai
   ```

2. **Install dependencies**  
   At the root of the project, run:
   ```bash
   pnpm install
   ```

## 🛠 Development

To start the development servers for all apps and packages:
```bash
pnpm dev
```

## 🏗 Build

To build all apps and packages:
```bash
pnpm build
```

## 🧹 Linting and Formatting

- **Lint your code**:
  ```bash
  pnpm lint
  ```

- **Format your code**:
  ```bash
  pnpm format
  ```

## 🧪 Type Checking

Check types across the entire monorepo:
```bash
pnpm check-types
```

## ☁️ Remote Caching with Turborepo

Turborepo supports remote caching to speed up builds across machines and CI/CD pipelines.

1. **Login to Turborepo with Vercel**:
   ```bash
   npx turbo login
   ```

2. **Link your project to enable remote caching**:
   ```bash
   npx turbo link
   ```

## 📦 Apps and Packages

This monorepo includes the following:

### Applications (`apps/`)
- `docs`: A Next.js documentation site
- `web`: The main Next.js web application

### Packages (`packages/`)
- `@autoscribe/ui`: Shared React UI components
- `@autoscribe/eslint-config`: Shared ESLint config (extends `eslint-config-next`, `eslint-config-prettier`)
- `@autoscribe/typescript-config`: Shared `tsconfig.json` setups

> 💡 Each app/package is 100% written in **TypeScript**.

## 🗂 Directory Structure

```
apps/                     → Next.js apps (web, docs, etc.)
packages/                 → Shared libraries (UI, config, etc.)
pnpm-workspace.yaml       → Workspace setup for pnpm
turbo.json                → Turborepo configuration
.gitignore                → Ignored files for git
```

## 🔗 Useful Links

Explore Turborepo features:
- [Turborepo Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/monorepos/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filters)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
