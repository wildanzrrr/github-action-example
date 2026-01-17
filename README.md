# TokenMinds Backend Template

Fill project description here

## Introduction

Fill project description here

## Features

Fill project features here

## Installation

### Prerequisites

- **Node.js** (v22 or higher)
- **pnpm** (recommended package manager)
- **PostgreSQL** (v12 or higher)
- **Git**

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd africa-strategy/backend
```

2. **Install dependencies**

```bash
# Install project dependencies
pnpm install
```

3. **Database Setup**

```bash
# Initialize Prisma
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev
```

### Configuration

#### Environment Setup

1. **Copy the environment template**

```bash
cp .env.example .env
```

2. **Fill in the environment variables**

## Usage

### Development Commands

#### Building

```bash
# Build the application
pnpm build

# Build and watch for changes
pnpm start:dev
```

#### Running the Application

```bash
# Development mode with hot reload
pnpm start:dev

# Debug mode
pnpm start:debug

# Production mode
pnpm start:prod
```

#### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run end-to-end tests
pnpm test:e2e

# Debug tests
pnpm test:debug
```

#### Database Operations

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Reset database
pnpm prisma migrate reset

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Check migration status
pnpm prisma migrate status
```

#### Code Quality

```bash
# Format code
pnpm format

# Lint code
pnpm lint
```

### API Documentation

Once the application is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:2000/api/v1/docs`

## Testing

The project includes comprehensive testing with Jest:

### Test Structure

- **Unit Tests**: Individual component testing (services, controllers)
- **Integration Tests**: Module integration testing
- **E2E Tests**: End-to-end application testing
- **Coverage Reports**: Detailed coverage analysis

### Test Files

- `*.spec.ts` - Unit and integration tests
- `*.e2e-spec.ts` - End-to-end tests

### Coverage Exclusions

The following files are excluded from coverage reports:

- Module files (`.module.ts`)
- DTOs (`.dto.ts`)
- Main entry point (`main.ts`)
- Prisma service
- Test files themselves
- Utility files

## Development Tools

- **NestJS**: Backend framework with TypeScript support
- **Prisma**: Modern database toolkit and ORM
- **Jest**: Testing framework with coverage reporting
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting
- **Swagger**: API documentation generation
- **TypeScript**: Type-safe development
- **VS Code**: Recommended IDE with extensions

### Recommended VS Code Extensions

- NestJS Files
- Prisma
- TypeScript Importer
- ESLint
- Prettier
- REST Client

### Development Guidelines

- Follow TypeScript and ESLint rules
- Write comprehensive tests for new features
- Update documentation as needed
- Use conventional commit messages
- Maintain test coverage above 80%

## License

This project is licensed under the MIT License - see the package.json file for details.

---

**TokenMinds Africa Strategy Backend** - Built with ❤️ using NestJS
