# Contributing

Thank you for your interest in contributing to this project! This guide will help you understand our development workflow and standards.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Branch Management](#branch-management)
- [Commit Standards](#commit-standards)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Documentation](#documentation)

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm** (comes with Node.js)
- **Git**

### Initial Setup

1. **Fork the repository** and clone your fork:

   ```shell
   git clone https://github.com/your-username/framework.git
   cd framework
   ```

2. **Install dependencies**:

   ```shell
   npm ci
   ```

3. **Verify setup** by running a full build:

   ```shell
   npm run dist
   ```

## Development Workflow

### Building the Project

To build all packages in the monorepo:

```shell
npm run dist
```

This command performs the following operations in sequence:

1. **Clean** - Removes existing build artifacts
2. **Build** - Compiles TypeScript to JavaScript
3. **Test** - Runs the complete test suite
4. **Package** - Creates distribution packages
5. **Generate Docs** - Creates API documentation

### Build Output Structure

Each package will have a `dist` folder containing:

- **`esm/`** - ES Module format for modern bundlers and Node.js
- **`cjs/`** - CommonJS format for Node.js compatibility
- **`types/`** - TypeScript declaration files (`.d.ts`)
- **`docs/`** - Auto-generated API documentation in Markdown format

### Development Commands

```shell
# Format code with Prettier
npm run format

# Run ESLint checks
npm run lint

# Run tests only
npm run test

# Build without tests (faster during development)
npm run build

# Clean build artifacts
npm run clean
```

## Code Standards

### Quality Requirements

Before committing code, ensure it meets our quality standards:

1. **Format your code:**

   ```shell
   npm run format
   ```

2. **Fix linting issues:**

   ```shell
   npm run lint
   ```

3. **Run tests:**

   ```shell
   npm run test
   ```

### Code Style Guidelines

- Use **TypeScript** for all new code
- Follow the existing code style (enforced by Prettier)
- Add **JSDoc comments** for public APIs
- Use **meaningful variable and function names**
- Keep functions **small and focused**
- Write **comprehensive tests** for new features

## Branch Management

### Branch Strategy

We use a **dual-branch strategy**:

- **`main`** - Production-ready code with stable, published versions
- **`next`** - Development branch where all PRs are merged for testing

### Branch Naming Convention

We follow the [Conventional Branch](https://conventional-branch.github.io/) specification.

Use descriptive names with appropriate prefixes:

| Type          | Format                | Example                         |
| ------------- | --------------------- | ------------------------------- |
| **Features**  | `feat/description`    | `feat/user-authentication`      |
| **Bug Fixes** | `bugfix/description`  | `bugfix/memory-leak-fix`        |
| **Hot Fixes** | `hotfix/description`  | `hotfix/security-vulnerability` |
| **Chores**    | `chore/description`   | `chore/update-dependencies`     |
| **Releases**  | `release/description` | `release/v1.2.0`                |

### Branch Workflow

1. **Create a branch** from `next`:

   ```shell
   git checkout next
   git pull origin next
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** and commit following our [commit standards](#commit-standards)

3. **Push your branch** and create a Pull Request targeting `next`

## Commit Standards

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```commit
<type>: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type         | Description                  | Example                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| **feat**     | New feature                  | `feat: add user authentication`              |
| **fix**      | Bug fix                      | `fix: resolve memory leak in data processor` |
| **docs**     | Documentation changes        | `docs: update API reference`                 |
| **style**    | Code style changes           | `style: fix formatting in utils`             |
| **refactor** | Code refactoring             | `refactor: simplify error handling`          |
| **perf**     | Performance improvements     | `perf: optimize database queries`            |
| **test**     | Test additions/modifications | `test: add unit tests for validator`         |
| **build**    | Build system changes         | `build: update webpack config`               |
| **ci**       | CI configuration changes     | `ci: add automated testing`                  |
| **chore**    | Maintenance tasks            | `chore: update dependencies`                 |
| **revert**   | Revert previous commit       | `revert: revert commit abc123`               |

### Commit Examples

```shell
# Good commit messages
git commit -m "feat: add JWT token validation"
git commit -m "fix: prevent endless loop in data lookup"
git commit -m "docs: update installation instructions"

# Bad commit messages (avoid these)
git commit -m "fix stuff"
git commit -m "WIP"
git commit -m "changes"
```

## Pull Request Process

### PR Requirements

- **Target Branch**: Always target `next` branch
- **Title**: Follow commit message format (e.g., `feat: add new feature`)
- **Description**: Provide clear description of changes and motivation
- **Tests**: Include tests for new functionality
- **Documentation**: Update docs if needed

### PR Checklist

Before submitting your PR:

- [ ] Code builds successfully (`npm run dist`)
- [ ] All tests pass (`npm run test`)
- [ ] Code is formatted (`npm run format`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions
- [ ] PR title follows commit message format

### Review Process

1. **Automated Checks**: CI will run tests and quality checks
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged to `next`

## Release Process

### Next (Prerelease) Versions

For development/beta releases from the `next` branch:

1. **Prepare Release**:

   - Run `Prepare Release` GitHub Action on `next` branch
   - Set semver type to `prerelease`
   - This creates a PR with version bumps and changelog updates

2. **Review & Merge**:

   - Review the generated PR carefully
   - Merge the PR to `next` branch

3. **Publish**:
   - Run `Publish Release` GitHub Action
   - Publishes packages to NPM with `next` tag
   - Creates GitHub releases marked as prerelease

### Production Versions

For stable releases to the `main` branch:

1. **Prepare Main Branch**:

   - Run `Versions Prepare` on `main` branch
   - Set type to `production`
   - Creates PR merging `next` to `main`

2. **Merge to Main**:

   - Review and merge the preparation PR

3. **Prepare Release**:

   - Run `Prepare Release` GitHub Action on `main` branch
   - Choose semver type: `major`, `minor`, or `patch`
   - Creates PR with version bumps and changelog updates

4. **Merge Release**:

   - Review and merge the release PR

5. **Publish**:

   - Run `Publish Release` GitHub Action
   - Publishes packages to NPM with `latest` tag
   - Creates stable GitHub releases

6. **Update Next Branch**:
   - Run `Versions Prepare` on `next` branch
   - Updates `next` branch versions to reflect published version

If running `Prepare Release` fails it will most likely leave a PR in a state where it is impossible to generate a new release. If this happens then look for a PR (might be closed) that is tagged with `autorelease: pending` and remove the tag.

### Version Strategy

| Branch | Purpose             | NPM Tag  | GitHub Release |
| ------ | ------------------- | -------- | -------------- |
| `next` | Development/Testing | `next`   | Prerelease     |
| `main` | Production          | `latest` | Stable         |

## Documentation

### API Documentation

Documentation is auto-generated from TypeScript comments using **TypeDoc**:

### Documentation Structure

- **Source Comments**: JSDoc comments in TypeScript source files
- **Package Docs**: Additional content in each package's `docs/` folder
- **Auto-Generation**: Built documentation is merged into the main docs site

### Development Tips

1. **Use meaningful commit messages** - they become part of the changelog
2. **Write comprehensive tests** - helps prevent regressions
3. **Keep PRs focused** - smaller PRs are easier to review and merge
4. **Update documentation** - help others understand your changes
5. **Follow conventions** - consistency makes the codebase maintainable
6. **Test locally** - run the full build before pushing

---

**Thank you for contributing!** Your efforts help make this project better for everyone. 🚀
