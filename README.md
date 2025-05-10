# Aspire Test

A Vue 3 application powered by Vite, TypeScript, and the One Frontend Framework.

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Build Modes](#build-modes)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Testing](#testing)
- [License](#license)

## Installation

Install dependencies:

```bash
npm install
```

## Available Scripts

### Start Development

```bash
npm start
```

Alias for running the development server with linting.

### Development Build

```bash
npm run build:dev
```

Builds the project for development environment.

### UAT Build

```bash
npm run build:uat
```

Builds the project for UAT (User Acceptance Testing) environment.

### Production Build

```bash
npm run build:production
```

Builds the project optimized for production.

### Preview Build Output

```bash
npm run preview
```

Preview the production build locally.

### Lint the Codebase

```bash
npm run lint
```

Runs ESLint on the project files.

### Run Tests

```bash
npm run test
```

Runs the test suite using Vitest and Happy DOM.

## Build Modes

This project uses Vite's environment mode feature to support multiple builds:

- `development`: For local development
- `uat`: For user acceptance testing
- `production`: For production deployment

## Project Structure

- **Vue 3**: Frontend framework
- **TypeScript**: Static typing
- **Vite**: Build tool
- **ESLint**: Code linting
- **Sass**: CSS preprocessor
- **vue-tsc**: Type-checking support for Vue + TS

## Dependencies

### Runtime

- `vue`
- `vue-router`
- `one-frontend-framework`

### Development

Includes tooling for linting, TypeScript support, Vite plugins, and Sass compilation.

## Testing

The test suite is powered by [Vitest](https://vitest.dev/) and [Happy DOM](https://github.com/capricorn86/happy-dom) for simulating a browser environment in Node.js. Vue component testing is enabled via `@vue/test-utils`.

To run the tests:

```bash
npm run test
```

Test files are typically located in the `tests/` directory or placed alongside components using the `.spec.ts` or `.test.ts` naming convention.

## License

This project is private and not licensed for external distribution.