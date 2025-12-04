# Contributing to HydroSync

Thank you for your interest in contributing to HydroSync! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   
   Click the "Fork" button on GitHub to create your own copy.

2. **Clone your fork**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/hydrosync.git
   cd hydrosync
   \`\`\`

3. **Add upstream remote**
   \`\`\`bash
   git remote add upstream https://github.com/hydrosync/hydrosync.git
   \`\`\`

4. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

5. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Making Changes

### Branch Naming

Use descriptive branch names following this convention:

\`\`\`
feature/description    # New features
fix/description        # Bug fixes
docs/description       # Documentation
refactor/description   # Code refactoring
test/description       # Test additions
\`\`\`

Examples:
\`\`\`bash
git checkout -b feature/dark-mode
git checkout -b fix/notification-badge
git checkout -b docs/api-reference
\`\`\`

### Keeping Your Fork Updated

\`\`\`bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
\`\`\`

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type when possible

\`\`\`typescript
// Good
interface UsageData {
  date: string
  usage: number
  cost: number
}

const data: UsageData[] = []

// Avoid
const data: any[] = []
\`\`\`

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

\`\`\`typescript
// Good
export function UsageCard({ usage, date }: UsageCardProps) {
  return (
    <Card>
      <CardContent>
        <p>{usage} gallons</p>
        <p>{date}</p>
      </CardContent>
    </Card>
  )
}

// Avoid - too much logic in component
export function UsageCard() {
  const [data, setData] = useState()
  // 100+ lines of logic...
}
\`\`\`

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic color tokens

\`\`\`typescript
// Good
<div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6">

// Avoid - arbitrary values
<div className="flex flex-col gap-[17px] p-[13px]">
\`\`\`

### File Organization

\`\`\`
components/
├── component-name/
│   ├── index.tsx         # Main component
│   ├── component-name.tsx
│   ├── component-name.test.tsx
│   └── types.ts          # Component-specific types
\`\`\`

## Commit Guidelines

### Commit Message Format

\`\`\`
type(scope): subject

body (optional)

footer (optional)
\`\`\`

### Types

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Formatting, missing semicolons, etc. |
| refactor | Code refactoring |
| test | Adding tests |
| chore | Maintenance tasks |

### Examples

\`\`\`bash
# Feature
git commit -m "feat(dashboard): add water usage goal tracker"

# Bug fix
git commit -m "fix(notifications): correct badge count on mark as read"

# Documentation
git commit -m "docs(readme): add installation instructions"
\`\`\`

### Guidelines

- Use present tense: "add feature" not "added feature"
- Keep subject line under 50 characters
- Include issue reference when applicable: "fix(auth): resolve login error (#123)"

## Pull Request Process

### Before Submitting

1. **Update your branch**
   \`\`\`bash
   git fetch upstream
   git rebase upstream/main
   \`\`\`

2. **Run checks**
   \`\`\`bash
   npm run lint        # Check for linting errors
   npm run type-check  # Check TypeScript
   npm run test        # Run tests
   npm run build       # Ensure it builds
   \`\`\`

3. **Test your changes**
   - Verify all features work as expected
   - Test on different screen sizes
   - Check for accessibility issues

### PR Template

When creating a pull request, include:

\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test these changes?

## Screenshots (if applicable)
Add screenshots of visual changes

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have tested my changes
- [ ] I have updated documentation as needed
- [ ] My changes don't introduce new warnings
\`\`\`

### Review Process

1. Submit your PR
2. Automated checks will run
3. A maintainer will review your code
4. Address any feedback
5. Once approved, your PR will be merged

## Reporting Issues

### Bug Reports

Include:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

### Feature Requests

Include:
- Clear description of the feature
- Use case / problem it solves
- Any implementation ideas
- Mockups if applicable

### Issue Labels

| Label | Description |
|-------|-------------|
| bug | Something isn't working |
| feature | New feature request |
| documentation | Documentation improvements |
| good first issue | Good for newcomers |
| help wanted | Extra attention needed |

## Questions?

- Open a [GitHub Discussion](https://github.com/hydrosync/hydrosync/discussions)
- Join our [Discord community](https://discord.gg/hydrosync)
- Email: contributors@hydrosync.com

---

Thank you for contributing to HydroSync! Your efforts help make water management more accessible for everyone.
