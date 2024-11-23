# Password Generator

A simple web application built using Remix to generate secure passwords with customizable options.

## Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Remix CLI](https://remix.run/docs/en/main/installation)

## Installation

1. **Clone the Repository**  
   If you have not cloned the repository already, do so:

   ```bash
   git clone <repository-url>
   cd bolt-password-generator
   ```

2. **Install Dependencies**  
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```
   Or if you use `pnpm`:
   ```bash
   pnpm install
   ```

## Development Server

To start the development server and begin working on the application:

```bash
pnpm run dev
```

This will start the Remix development server. By default, the app will be available at [http://localhost:5173](http://localhost:5173).

## Build for Production

To build the application for production:

```bash
pnpm run build
```

The build output will be generated in the `build/` directory.

## Start the Production Server

After building the application, you can start the production server:

```bash
npm run start
```

By default, the app will be available at [http://localhost:5173](http://localhost:5173).
