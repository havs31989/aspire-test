
# Vue 3 + TypeScript + Vite - Frontend Project Structure with One-Frontend-Framework

This document provides an overview of the folder and file structure for the frontend of the project. The structure is designed to be clean, maintainable, and scalable as the project grows.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
  - [src](#src)
  - [public](#public)
  - [config](#config)
  - [package.json](#packagejson)
- [Setup and Installation](#setup-and-installation)
- [Development](#development)
- [Build and Deployment](#build-and-deployment)

## Overview

This project uses **Vue 3** for the user interface, **TypeScript** for static typing, and **Vite** for fast development and build processes. The project is structured to support modular development practices, allowing easy collaboration and scaling.

- **Vue 3**: Modern JavaScript framework for building UIs.
- **TypeScript**: Superset of JavaScript providing static typing.
- **Vite**: A fast build tool optimized for modern frontend frameworks like Vue.
- **One-Frontend-Framework**: https://www.npmjs.com/package/one-frontend-framework

## Project Structure

Here is an overview of the project directory structure:


### `src/`

The `src` directory contains all of the source code for the application. This is where most of the development takes place. It is further divided into several subdirectories:

- **`/assets`**: Contains static assets like images, fonts, and other resources that are bundled during the build process..

- **`/views`**: Contains Vue components that represent whole pages or views. These components are mapped to routes using the Vue Router.

- **`/styles`**: Global or shared styles, such as CSS or SCSS files for themes, variables, or base styles.

- **`/commons`**: Utility functions or helper functions that are used throughout the app, such as data formatting or calculation utilities.

- **`/services`**: API calls or services that interact with external systems. This can include authentication, data fetching, etc.

### `public/`

The `public` folder contains static assets that are directly served by the server. Files like `index.html`, icons, fonts, and other publicly accessible resources go here. In a React project, the `index.html` file is where the app is rendered.


### `config/`

The `config` folder is where configuration files for the application are stored. This can include environment variables, build configurations, API URLs, etc.

### `package.json`

This file contains metadata about the project, such as its dependencies, scripts, and other configuration details. It is essential for managing project dependencies and build processes.

## Setup and Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/vosonha89/vuejs-one-frontend-framework-struct.git <your-project-name>
  
2. Navigate into the project directory:

   ```bash
   cd <your-project-name>

3. Install dependencies:

    ```bash
    npm install


## Development

1. To run the project in development mode, use the following command:

    ```bash
    npm start

This will launch a development server, usually at http://localhost:5173, where you can preview your work.

## Build and Deployment

1. To build the project for production, run:

    ```bash
    npm run build

This will create an optimized build in the build/ (or dist/) directory that can be deployed to production servers.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.