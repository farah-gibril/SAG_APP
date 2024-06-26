# Project Name

This README provides an overview of the project structure and how to set up and run the project.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Project](#running-the-project)
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
- `public`: Contains public assets such as images and favicon.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `tsconfig.json`: TypeScript configuration file.

## Technologies Used

The project utilizes the following technologies:

- React: A JavaScript library for building user interfaces.
- Next.js 14: A React framework for server-side rendering and building full-stack applications.
- Kinde: An authentication and user management solution.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- shadcn/ui: A component library built with Radix UI and Tailwind CSS.

## Getting Started

### Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (version 18)
- npm
- Tailwind CSS
- Kinde

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

## Running the Project

To run the project, use the following command:

```
npm run dev
```

This will start the development server and the project will be accessible at `http://localhost:3000`.

## Additional Information

- The project uses Kinde for authentication. Make sure to set up the necessary Kinde configuration in the `.env` file.
- The project follows the Next.js app directory structure, which provides a new way of organizing and routing pages.
- The `components` directory contains reusable components that can be used across the project.
- The `lib` directory contains utility functions that can be used throughout the project.
- Tailwind CSS is used for styling the components. The configuration can be found in the `tailwind.config.js` file.
- The project also utilizes the shadcn/ui component library, which provides pre-built UI components styled with Tailwind CSS.

For more information on the specific implementation details and usage of each technology, please refer to their respective documentation.