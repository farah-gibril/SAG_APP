# Project Name

This README provides an overview of the project structure and how to set up and run the project.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Project](#running-the-project)
- [Prisma and tRPC](#prisma-and-trpc)
- [Neon Database](#neon-database)
- [Additional Information](#additional-information)

## Project Structure

The main directories and files are:

- `src`: Contains the source code of the project.
  - `app`: Contains the Next.js app directory structure.
    - `api`: Contains API routes.
    - `auth-callback`: Contains the authentication callback page.
    - `dashboard`: Contains the dashboard page.
    - `pricing`: Contains the pricing page.
  - `components`: Contains reusable components used in the project.
  - `lib`: Contains utility functions.
  - `trpc`: Contains tRPC-related files.
- `public`: Contains public assets such as images and favicon.
- `prisma`: Contains the Prisma schema file.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `tsconfig.json`: TypeScript configuration file.

## Technologies Used

The project utilizes the following technologies:

- React: A JavaScript library for building user interfaces.
- Next.js 14: A React framework for server-side rendering and building full-stack applications.
- Kinde: An authentication and user management solution.
- Prisma: A modern database toolkit for TypeScript and Node.js.
- tRPC: A TypeScript-first RPC framework for building scalable and type-safe APIs.
- Neon: A serverless PostgreSQL database platform.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- shadcn/ui: A component library built with Radix UI and Tailwind CSS.

## Getting Started

### Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (version 18)
- npm
- Tailwind CSS
- Kinde
- Prisma CLI

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-project.git
   ```

2. Navigate to the project directory:

   ```
   cd your-project
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set up the `.env` file with the required environment variables, including the database URL for Neon.

## Running the Project

To run the project, use the following command:

```
npm run dev
```

This will start the development server and the project will be accessible at `http://localhost:3000`.

## Prisma and tRPC

The project utilizes Prisma and tRPC for database management and building type-safe APIs. Prisma is a modern database toolkit that simplifies database access and management. It provides a type-safe and intuitive way to interact with the database.

tRPC is used in conjunction with Prisma to build scalable and type-safe APIs. It allows for easy creation of server-side APIs that are consumed by the client-side application. tRPC ensures type safety between the client and server, reducing the chances of runtime errors.

To work with Prisma, you can use the following commands:

- `npx prisma migrate dev`: Runs database migrations to update the database schema.
- `npx prisma studio`: Opens the Prisma Studio interface to view and manage the database.

The project also leverages tRPC for the Kinde authentication callback. tRPC provides a seamless way to handle authentication and authorization within the application.

## Neon Database

The project uses Neon as the database provider. Neon is a serverless PostgreSQL database platform that offers easy setup and configuration. It allows for seamless integration with Prisma and provides a scalable and managed database solution.

To configure Neon with Prisma, you need to set the `DATABASE_URL` environment variable in the `.env` file. This URL should point to your Neon database instance.

## Additional Information

- The project uses Kinde for authentication. Make sure to set up the necessary Kinde configuration in the `.env` file.
- The project follows the Next.js app directory structure, which provides a new way of organizing and routing pages.
- The `components` directory contains reusable components that can be used across the project.
- The `lib` directory contains utility functions that can be used throughout the project.
- Tailwind CSS is used for styling the components. The configuration can be found in the `tailwind.config.js` file.
- The project also utilizes the shadcn/ui component library, which provides pre-built UI components styled with Tailwind CSS.
- The Prisma schema file is located in the `prisma` directory. It defines the database models and relationships.
- The selected database model for this SaaS project focuses on the essential fields required for user management and authentication. Fields like number, name, and address are not included in the current model as they are not deemed necessary for the core functionality.

For more information on the specific implementation details and usage of each technology, please refer to their respective documentation.