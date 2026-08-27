# Task Manager

A simple, full-stack task management application built to make keeping track of everyday tasks straightforward.

The project started as a way to learn and bring together different parts of modern web development — from building the interface and working with APIs to authentication, database management, GitHub, and deployment.

Users can sign in with Google, create their own tasks, delete them when they're finished, and come back later to find their tasks still saved to their account.

---

## Overview

Task Manager is built with **Next.js and TypeScript**, with **PostgreSQL** used for persistent data storage and **Prisma** handling the database layer.

Authentication is handled through **Google OAuth**, allowing each signed-in user to have their own separate task list.

The application is deployed through **Vercel** and uses a hosted PostgreSQL database through **Neon**.

---

## Features

* **Google Sign-In** — Sign in using an existing Google account.
* **Personal task lists** — Each user sees only the tasks belonging to their account.
* **Create tasks** — Add new tasks directly from the dashboard.
* **Delete tasks** — Remove tasks that are no longer needed.
* **Persistent storage** — Tasks remain saved when you sign out and return later.
* **Task counter** — See how many tasks are currently in your list.
* **Dark dashboard** — A simple dark interface designed to keep the application easy on the eyes.
* **Cloud database** — PostgreSQL stores user and task data.
* **Production deployment** — The application is configured to run on Vercel.

---

## Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API Routes
* NextAuth.js

**Database**

* PostgreSQL
* Prisma
* Neon

**Deployment & Development**

* Vercel
* Git
* GitHub

---

## How It Works

The application follows a straightforward flow:

```text
Google Account
      ↓
Google Authentication
      ↓
User Session
      ↓
Task Manager
      ↓
Create / View / Delete Tasks
      ↓
PostgreSQL Database
```

When a user creates a task, the task is associated with their user ID.

When the task list is requested, the API uses the current session to identify the user and returns only that user's tasks.

This keeps different accounts' task lists separate.

---

## Authentication

Google authentication is implemented using **NextAuth.js**.

After signing in, the application receives the user's session and uses it to determine which account is currently active.

The authenticated user's ID is then used when working with tasks, so tasks created by one account aren't shown to another account.

Google OAuth credentials and other sensitive configuration values are stored using environment variables rather than being committed to the repository.

---

## Database

The application uses PostgreSQL with Prisma.

There are two main models:

### User

Stores the account information provided through authentication.

```text
User
├── id
├── name
├── email
├── image
└── tasks
```

### Task

Stores the tasks created by users.

```text
Task
├── id
├── title
├── createdAt
└── userId
```

The relationship between `User` and `Task` allows each task to belong to a specific account.

---

## Project Structure

```text
task-manager/
│
├── migrations/          # Database migration history
│
├── prisma/              # Prisma schema and generated contract files
│
├── public/              # Public application assets
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── tasks/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── SignInButton.tsx
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   └── auth.ts
│
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
├── prisma.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

---

## Running Locally

### Requirements

You'll need:

* Node.js
* npm
* Git
* A PostgreSQL database
* Google OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/Ahmed-31-Anwar/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project.

Add the required configuration:

```env
DATABASE_URL="your-postgresql-connection-string"

AUTH_SECRET="your-auth-secret"

AUTH_GOOGLE_ID="your-google-client-id"

AUTH_GOOGLE_SECRET="your-google-client-secret"
```

Replace the placeholder values with your own credentials.

**Never commit `.env.local` or expose your authentication/database credentials.**

### 4. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## Building for Production

The production build can be tested locally with:

```bash
npm run build
```

A successful build confirms that the Next.js application compiles and the application's routes can be generated correctly.

---

## Deployment

The application is deployed using **Vercel**.

The production environment requires the same core environment variables used during local development, configured through Vercel's project settings.

Google OAuth also needs to be configured with the production callback URL:

```text
https://your-domain.com/api/auth/callback/google
```

The PostgreSQL database is hosted through **Neon**, allowing the deployed application to persist task data.

---

## What I Learned

This project was built as a practical way to work through the different parts of a full-stack application rather than focusing on just the frontend.

Some of the main areas I worked with were:

* Building interfaces with React and Next.js
* Creating API routes
* Working with TypeScript
* Implementing Google OAuth
* Managing user sessions
* Designing a relational database
* Using Prisma with PostgreSQL
* Connecting a hosted database
* Using Git and GitHub for version control
* Working with branches and pull requests
* Building and testing a production application
* Deploying the project through Vercel

The project also went through a number of debugging and deployment issues along the way, which made the development process a useful part of the learning experience.

---

## Current Status

The application is currently functional and supports the complete basic task-management flow:

**Sign in → Create tasks → View tasks → Delete tasks → Sign out → Sign back in**

Tasks are persisted in PostgreSQL and remain associated with the account that created them.

---

## Author

**Ahmed Anwar**

This project was built as a practical full-stack web development project and is part of my ongoing learning and development in software engineering.

[GitHub](https://github.com/Ahmed-31-Anwar)
