# Aspire Test

A Vue 3 application powered by Vite, TypeScript, and the One Frontend Framework.

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Build Modes](#build-modes)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
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

## License

This project is private and not licensed for external distribution.
