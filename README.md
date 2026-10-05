# Task Manager

A full-stack task management application built with Next.js, TypeScript, PostgreSQL, Prisma, NextAuth.js, Google OAuth, GitHub Actions, and Vercel.

The project provides authenticated users with a simple dashboard where they can sign in with Google, create tasks, delete tasks, and view their own task list.

The project is designed with a complete development and deployment workflow.

The workflow includes:

- Local development
- PostgreSQL persistence
- Google authentication
- API routes
- Automated testing
- ESLint checks
- TypeScript checks
- Production builds
- GitHub Actions CI
- Vercel production deployment
- Environment variable management

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Goals](#project-goals)
- [Features](#features)
- [User Flow](#user-flow)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Version Information](#version-information)
- [Frontend](#frontend)
- [Backend](#backend)
- [Authentication](#authentication)
- [Google OAuth](#google-oauth)
- [Sessions](#sessions)
- [Database](#database)
- [Neon PostgreSQL](#neon-postgresql)
- [Prisma](#prisma)
- [Prisma 8](#prisma-8)
- [API](#api)
- [API Routes](#api-routes)
- [GET Tasks](#get-tasks)
- [POST Tasks](#post-tasks)
- [DELETE Tasks](#delete-tasks)
- [Security](#security)
- [User Data Isolation](#user-data-isolation)
- [Project Structure](#project-structure)
- [Important Files](#important-files)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Commands](#available-commands)
- [Linting](#linting)
- [TypeScript](#typescript)
- [Testing](#testing)
- [Vitest](#vitest)
- [Playwright](#playwright)
- [End-to-End Testing](#end-to-end-testing)
- [E2E Test Authentication](#e2e-test-authentication)
- [Test Login Route](#test-login-route)
- [E2E Test Coverage](#e2e-test-coverage)
- [Playwright Configuration](#playwright-configuration)
- [E2E Testing Commands](#e2e-testing-commands)
- [Automated Testing Architecture](#automated-testing-architecture)
- [Playwright Test Results](#playwright-test-results)
- [Current E2E Test Status](#current-e2e-test-status)
- [E2E Testing Security](#e2e-testing-security)
- [E2E Testing Checklist](#e2e-testing-checklist)
- [Local E2E Testing Flow](#local-e2e-testing-flow)
- [Playwright and Vitest](#playwright-and-vitest)
- [Automated Test Summary](#automated-test-summary)

- [Production Build](#production-build)
- [GitHub](#github)
- [Git Workflow](#git-workflow)
- [Pull Requests](#pull-requests)
- [CI/CD](#ci-cd)
- [Continuous Integration](#continuous-integration)
- [Continuous Delivery](#continuous-delivery)
- [Continuous Deployment](#continuous-deployment)
- [Continuous Development](#continuous-development)
- [CI/CD Pipeline](#ci-cd-pipeline)
- [GitHub Actions](#github-actions)
- [Build Workflow](#build-workflow)
- [Test Workflow](#test-workflow)
- [Release Workflow](#release-workflow)
- [Workflow Dependencies](#workflow-dependencies)
- [GitHub Secrets](#github-secrets)
- [Vercel](#vercel)
- [Vercel Deploy Hook](#vercel-deploy-hook)
- [Production Deployment](#production-deployment)
- [Google OAuth Production Configuration](#google-oauth-production-configuration)
- [Local Development Flow](#local-development-flow)
- [Pull Request Flow](#pull-request-flow)
- [Main Branch Flow](#main-branch-flow)
- [Troubleshooting](#troubleshooting)
- [Prisma Troubleshooting](#prisma-troubleshooting)
- [Database Troubleshooting](#database-troubleshooting)
- [Authentication Troubleshooting](#authentication-troubleshooting)
- [GitHub Actions Troubleshooting](#github-actions-troubleshooting)
- [Vercel Troubleshooting](#vercel-troubleshooting)
- [Release Troubleshooting](#release-troubleshooting)
- [Security Practices](#security-practices)
- [Dependency Management](#dependency-management)
- [Git Command Reference](#git-command-reference)
- [npm Command Reference](#npm-command-reference)
- [GitHub Actions Reference](#github-actions-reference)
- [Development Checklist](#development-checklist)
- [Testing Checklist](#testing-checklist)
- [Deployment Checklist](#deployment-checklist)
- [Lessons Learned](#lessons-learned)
- [Future Improvements](#future-improvements)
- [Current Status](#current-status)
- [Repository](#repository)
- [Production](#production)
- [Author](#author)

---

# Project Overview

Task Manager is a web application for managing personal tasks.

The application uses Google authentication.

Each authenticated user receives their own task list.

Tasks are stored in PostgreSQL.

The backend communicates with the database through Prisma.

The application is built with Next.js.

The application is deployed using Vercel.

GitHub Actions provides automated validation.

The CI/CD system checks the application before production deployment.

---

# Project Goals

The main goals of the project are:

- Build a functional task management application.
- Use modern web technologies.
- Use PostgreSQL for persistent storage.
- Implement authentication.
- Protect user-specific data.
- Provide a simple interface.
- Create API routes for task operations.
- Add automated tests.
- Add linting.
- Add TypeScript validation.
- Add automated production builds.
- Create a GitHub Actions pipeline.
- Connect the application to Vercel.
- Automate production releases.
- Keep the project maintainable.
- Keep the project suitable for future development.

---

# Features

## Authentication

The application supports:

- Google sign-in.
- Google sign-out.
- Authenticated sessions.
- Protected task operations.
- User-specific task data.

## Task Management

Users can:

- Add tasks.
- View tasks.
- Delete tasks.
- See their task count.
- Manage their own task list.

## Database

The application uses:

- PostgreSQL.
- Neon PostgreSQL hosting.
- Prisma ORM.
- Persistent task storage.

## User Isolation

Tasks are associated with authenticated users.

A user should only access their own tasks.

The API uses the authenticated session when determining the current user.

## UI

The application includes:

- Dashboard-style interface.
- Dark aesthetic.
- Task counter.
- Task list.
- Task creation.
- Task deletion.
- Authentication controls.

---

# User Flow

The normal user flow is:

1. Open the application.
2. View the authentication interface.
3. Sign in with Google.
4. Return to the application.
5. Receive an authenticated session.
6. View the task dashboard.
7. Add a task.
8. The task is stored in PostgreSQL.
9. The task appears in the task list.
10. Delete a task when it is no longer needed.
11. Sign out when finished.

---

# Architecture

The application can be viewed as several connected layers.

```text
User
  |
  v
Next.js Frontend
  |
  v
Authentication
  |
  v
Next.js API Routes
  |
  v
Prisma
  |
  v
Neon PostgreSQL
```

The deployment pipeline is separate from the runtime architecture.

```text
Developer
    |
    v
Git
    |
    v
GitHub
    |
    v
GitHub Actions
    |
    +----> Build
    |
    +----> Test
    |
    +----> Release
              |
              v
          Vercel
              |
              v
        Production App
```

---

# Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| NextAuth.js | Authentication |
| Google OAuth | User authentication |
| Prisma | Database access |
| PostgreSQL | Relational database |
| Neon | PostgreSQL hosting |
| Vitest | Automated testing |
| Playwright | Browser-based end-to-end testing |
| ESLint | Code quality |
| GitHub | Source control |
| GitHub Actions | CI/CD |
| Vercel | Deployment |

---

# Version Information

The project currently uses:

| Package | Version |
|---|---|
| Next.js | 16.3.3 |
| React | 19.2.8 |
| Node.js | 24.20.0 |
| npm | 11.19.0 |
| TypeScript | 5.x |
| Prisma | 8.0.0-rc.12 |
| Prisma ORM PostgreSQL | 8.0.0-rc.8 |
| NextAuth.js | 5.0.0-beta.32 |
| Vitest | 5.0.1 |
| ESLint | 9.x |
| Tailwind CSS | 4.x |

---

# Frontend

The frontend is built with Next.js and React.

The application uses the Next.js App Router.

The primary page is located at:

```text
src/app/page.tsx
```

The frontend is responsible for:

- Rendering the dashboard.
- Displaying authentication controls.
- Displaying tasks.
- Creating tasks through the API.
- Deleting tasks through the API.
- Displaying the task count.
- Handling user interactions.

---

# Backend

The backend functionality is provided through Next.js API routes.

The task API is located under:

```text
src/app/api/tasks/
```

Authentication is handled under:

```text
src/app/api/auth/
```

The application does not require a separate Express server.

Next.js handles both frontend and backend functionality.

---

# Authentication

Authentication is handled with NextAuth.js.

The application uses Google OAuth as the authentication provider.

Authentication provides the application with an authenticated user session.

The session is used when accessing protected task functionality.

The authentication configuration is located at:

```text
src/auth.ts
```

---

# Google OAuth

Google OAuth allows users to authenticate without creating a separate password for the application.

The basic flow is:

```text
User
  |
  v
Sign in with Google
  |
  v
Google OAuth
  |
  v
Authentication callback
  |
  v
NextAuth.js
  |
  v
Authenticated session
  |
  v
Task Manager
```

The Google OAuth application requires:

- Google Client ID.
- Google Client Secret.
- Correct redirect URI.
- Correct production callback URL.
- Correct environment variables.

---

# OAuth Environment Variables

The application uses environment variables for authentication.

```text
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

These values must not be committed to Git.

They should be stored securely.

---

# Sessions

The authenticated session identifies the current user.

Task API operations use the authenticated session.

This allows the backend to determine which user's tasks should be returned or modified.

A task request without a valid authenticated session should not be treated as a normal authenticated task request.

---

# Database

The application uses PostgreSQL.

The PostgreSQL database is hosted using Neon.

The database provides persistent storage.

Without a persistent database, tasks would not reliably survive application restarts or deployments.

---

# Neon PostgreSQL

Neon provides the PostgreSQL database used by the application.

The project uses a `DATABASE_URL`.

The connection string is stored as an environment variable.

The application does not place the database connection string directly inside source code.

The database is used by Prisma.

---

# DATABASE_URL

The primary database environment variable is:

```text
DATABASE_URL
```

The value should contain the PostgreSQL connection string supplied by Neon.

Example format:

```text
postgresql://username:password@host/database
```

The actual database credentials should never be placed in this README.

The actual connection string should never be committed to Git.

---

# Prisma

Prisma is used to communicate with PostgreSQL.

Prisma provides:

- Database configuration.
- Database access.
- Database typing.
- Database contracts.
- Database tooling.

The Prisma configuration is located at:

```text
prisma.config.ts
```

The application also contains:

```text
prisma/
```

and:

```text
migrations/
```

---

# Prisma Configuration

The current configuration loads `.env.local`.

```ts
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
import { definePrismaConfig } from "prisma/config";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./prisma/contract.prisma",
    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),

  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
```

---

# Prisma 8

This project uses a Prisma 8 release candidate.

Because of the Prisma version being used, some older Prisma commands do not apply to this project.

The project uses:

```bash
npx prisma contract emit
```

for emitting the Prisma contract.

The old command:

```bash
npx prisma generate
```

should not be assumed to be the correct command for this project.

---

# Prisma Contract

The project uses:

```text
prisma/contract.prisma
```

The contract is referenced by the Prisma configuration.

The build workflow emits the contract before building the Next.js application.

The test workflow also emits the contract before running validation.

---

# Prisma Skills

The project includes Prisma skill synchronization.

The `package.json` contains:

```json
"postinstall": "prisma skills sync || exit 0"
```

The command allows the installation process to synchronize Prisma skill files.

The command is allowed to exit successfully even if skill synchronization encounters an issue.

---

# API

The application exposes API functionality through Next.js route handlers.

The task API supports:

- GET
- POST
- DELETE

The API is responsible for communicating between the frontend and the database.

---

# API Routes

The main task endpoint is:

```text
/api/tasks
```

The authentication endpoint is:

```text
/api/auth/[...nextauth]
```

---

# GET Tasks

The GET endpoint retrieves the authenticated user's tasks.

The general flow is:

```text
GET /api/tasks
        |
        v
Check session
        |
        v
Identify user
        |
        v
Query database
        |
        v
Return user's tasks
```

The endpoint should not return another user's task data.

---

# POST Tasks

The POST endpoint creates a task.

The general flow is:

```text
POST /api/tasks
        |
        v
Check session
        |
        v
Validate request
        |
        v
Identify user
        |
        v
Create task
        |
        v
Save to PostgreSQL
        |
        v
Return response
```

---

# DELETE Tasks

The DELETE endpoint removes a task.

The general flow is:

```text
DELETE /api/tasks
        |
        v
Check session
        |
        v
Identify task
        |
        v
Verify user ownership
        |
        v
Delete task
        |
        v
Return response
```

---

# Security

Security considerations include:

- OAuth credentials are stored as secrets.
- Database credentials are stored as environment variables.
- User-specific task queries use authentication context.
- Sensitive values are not committed to Git.
- GitHub Actions receives secrets through GitHub Secrets.
- Vercel receives production environment variables through its environment configuration.

---

# User Data Isolation

User data isolation is an important part of the application.

The application should associate tasks with authenticated users.

When a user requests tasks, the backend should use the authenticated user's identity.

This prevents the application from treating the task list as one global shared list.

The intended relationship is:

```text
User A
  |
  +---- Task A1
  |
  +---- Task A2

User B
  |
  +---- Task B1
  |
  +---- Task B2
```

User A should not receive User B's tasks.

User B should not receive User A's tasks.

---

# Project Structure

```text
task-manager/
├── .github/
│   └── workflows/
│       ├── build.yml
│       ├── test.yml
│       └── release.yml
├── migrations/
├── prisma/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── tasks/
│   │   └── page.tsx
│   ├── components/
│   │   └── SignInButton.tsx
│   ├── lib/
│   │   └── prisma.ts
│   └── auth.ts
├── tests/
│   └── tasks.test.ts

├── e2e/
│   └── tasks.spec.ts
├── .gitignore
├── README.md
├── playwright.config.ts
├── next.config.ts
├── package.json
├── prisma.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
└── vitest.config.mts
```

---

# Important Files

## `src/app/page.tsx`

The main application page.

It contains the primary dashboard interface.

---

## `src/auth.ts`

Contains authentication configuration.

Google authentication is configured through NextAuth.js.

---

## `src/lib/prisma.ts`

Contains the application's Prisma database access.

---

## `src/app/api/tasks/`

Contains the task API route.

The route handles task-related operations.

---

## `src/app/api/auth/`

Contains the NextAuth API route.

---

## `src/components/SignInButton.tsx`

Contains the sign-in interface component.

---

## `tests/tasks.test.ts`

Contains automated functional tests for the task API.

---

## `prisma.config.ts`

Contains Prisma configuration.

---

## `eslint.config.mjs`

Contains ESLint configuration.

---

## `vitest.config.mts`

Contains Vitest configuration.


---

# `e2e/tasks.spec.ts`

Contains the browser-based Playwright end-to-end tests.

The tests exercise complete application workflows through a real browser rather than calling the API route handlers directly.

The current E2E suite covers:

- Authenticated dashboard access.
- Logged-out authentication interface.
- Task creation.
- Task persistence after refresh.
- Task deletion.
- Empty task validation.
- Unauthenticated API protection.
- User-to-user task isolation.

---

# `playwright.config.ts`

Contains the Playwright configuration.

The configuration:

- Uses the `e2e/` directory for browser tests.
- Uses Chromium for the current E2E project.
- Starts the Next.js development server automatically.
- Uses `http://localhost:3000` as the local base URL.
- Reuses an existing local development server when available.
- Collects traces on the first retry.

---

# `src/app/api/test-login/route.ts`

Contains the local E2E testing authentication route.

This route exists only to create deterministic authenticated test sessions for local Playwright tests.

It is not the normal Google OAuth login flow.

The route is protected by environment checks and is unavailable in production.

---

## `.github/workflows/build.yml`

Defines the automated build workflow.

---

## `.github/workflows/test.yml`

Defines the automated testing workflow.

---

## `.github/workflows/release.yml`

Defines the automated release workflow.

---

# Environment Variables

The project uses environment variables for sensitive configuration.

The main variables are:

```text
DATABASE_URL
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

GitHub Actions also uses:

```text
VERCEL_DEPLOY_HOOK
```

---

# Local Environment File

Local development values can be placed in:

```text
.env.local
```

Example:

```env
DATABASE_URL="your-neon-database-url"
AUTH_SECRET="your-auth-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

The actual values should never be committed.

---

# Environment Variable Responsibilities

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection |
| `AUTH_SECRET` | Authentication secret |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `VERCEL_DEPLOY_HOOK` | Triggers Vercel deployment |

---

# Local Development

The local project path is:

```text
C:\Users\F-05\Desktop\Projects\task-manager
```

Open the project in the development environment.

Install dependencies.

Configure environment variables.

Run the development server.

---

# Clone Repository

The repository can be cloned using:

```bash
git clone https://github.com/Ahmed-31-Anwar/task-manager.git
```

Move into the project directory:

```bash
cd task-manager
```

---

# Install Dependencies

Install dependencies using:

```bash
npm install
```

For CI environments, the project uses:

```bash
npm ci
```

---

# Configure Environment Variables

Create:

```text
.env.local
```

Add the required environment variables.

Do not commit `.env.local`.

---

# Start Development Server

Run:

```bash
npm run dev
```

Next.js will start the development server.

The local application can normally be accessed through the local development URL shown by Next.js.

---

# Development Cycle

A typical development cycle is:

```text
Edit
  |
  v
Run locally
  |
  v
Test functionality
  |
  v
Run lint
  |
  v
Run TypeScript check
  |
  v
Run tests
  |
  v
Build
  |
  v
Commit
  |
  v
Push
```

---

# Available Commands

## Development

```bash
npm run dev
```

Starts the development server.

---

## Production Build

---

# Playwright

Playwright is used for browser-based end-to-end testing.

While Vitest tests the task API route handlers directly, Playwright tests the application from the perspective of a real browser user.

This makes the E2E suite useful for verifying that the frontend, authentication session, API routes, database persistence, and user interface work together.

The Playwright tests are stored in:

```text
e2e/
└── tasks.spec.ts
```

The Playwright configuration is stored in:

```text
playwright.config.ts
```

---

# End-to-End Testing

End-to-end testing verifies complete application workflows instead of testing only individual functions.

The current Playwright tests exercise the actual local application.

The main workflow is:

```text
Browser
  |
  v
Next.js Application
  |
  v
Authentication Session
  |
  v
Task Dashboard
  |
  v
/api/tasks
  |
  v
PostgreSQL
```

This gives the project a second testing layer in addition to the existing Vitest API tests.

---

# E2E Test Authentication

The normal application authentication flow uses Google OAuth.

Using the real Google login page for automated E2E tests would make the test suite dependent on an external interactive authentication flow.

For local E2E testing, the project therefore uses a dedicated test authentication route.

The test route creates a deterministic test user and creates an authenticated session cookie.

This allows Playwright to test authenticated application behavior without requiring manual Google login for every test run.

The test authentication route is:

```text
/api/test-login
```

The route is intended only for local automated testing.

---

# Test Login Route

The test login route is:

```text
src/app/api/test-login/route.ts
```

The route checks:

```text
NODE_ENV
E2E_TEST
```

The route returns `404 Not Found` when:

```text
NODE_ENV === production
```

or when:

```text
E2E_TEST !== true
```

This means the route is not available as a production authentication mechanism.

The local E2E environment enables:

```env
E2E_TEST=true
```

The route then:

1. Creates the deterministic test user if it does not already exist.
2. Creates an Auth.js session token.
3. Sets the authentication cookie.
4. Returns a successful response.
5. Allows Playwright to continue as an authenticated user.

---

# E2E Test Users

The Playwright suite can use deterministic test identities.

The default test identity is:

```text
playwright-test@example.com
```

Additional test users can be created using different email addresses.

This is useful for testing user isolation.

For example:

```text
User A
  |
  +---- User A task

User B
  |
  +---- User B task
```

The E2E suite can then verify that User A cannot delete User B's task.

---

# E2E Test Coverage

The current Playwright suite contains six browser and application-level tests.

The tests cover:

1. Authenticated dashboard access.
2. Logged-out Google sign-in option.
3. Adding, persisting, and deleting a task.
4. Rejecting an empty task.
5. Rejecting unauthenticated task API access.
6. Preventing one user from deleting another user's task.

---

# Authenticated Dashboard Test

The authenticated dashboard test verifies that an authenticated user can access the main application.

The test establishes a local authenticated session and opens the dashboard.

It verifies that the expected dashboard content is available.

This confirms that the authentication state is recognized by the application.

---

# Logged-Out Authentication Test

The logged-out test verifies the unauthenticated experience.

It opens the application without an authenticated test session.

The test verifies that the Google sign-in option is visible.

The expected authentication control is:

```text
Continue with Google
```

This confirms that the application presents the expected login interface to logged-out users.

---

# Add, Persist, and Delete Test

The main E2E workflow verifies the complete task lifecycle.

The workflow is:

```text
Login
  |
  v
Open dashboard
  |
  v
Add task
  |
  v
Task appears
  |
  v
Refresh page
  |
  v
Task remains
  |
  v
Delete task
  |
  v
Task disappears
```

This test verifies more than the individual API operations.

It verifies that the frontend, API, database, and browser state work together.

---

# Empty Task Validation Test

The E2E suite also verifies that an empty task cannot be submitted.

This protects the application from accepting invalid task input through the user interface.

The test checks the visible validation behavior rather than only testing the API handler.

---

# Unauthenticated API Test

The E2E suite verifies that a user without an authenticated session cannot access protected task functionality.

The expected API response is:

```text
401 Unauthorized
```

This verifies the authentication boundary at the API level.

---

# User Isolation E2E Test

The user isolation test creates a task for one test user and then attempts to delete that task as another test user.

The expected behavior is that the second user cannot delete the first user's task.

The API responds with:

```text
404 Not Found
```

when the task does not belong to the authenticated user.

This verifies the ownership protection through an actual application workflow.

---

# Playwright Configuration

The current Playwright configuration uses:

```text
playwright.config.ts
```

The configuration includes:

```text
testDir: ./e2e
baseURL: http://localhost:3000
Chromium
Next.js development server
```

The Playwright web server configuration starts:

```bash
npm run dev
```

automatically when the tests need a local application server.

The configuration also uses:

```text
reuseExistingServer: true
```

so an already-running local development server can be reused.

---

# E2E Testing Commands

Run the complete Playwright suite:

```bash
npx playwright test
```

Run Playwright with the browser visible:

```bash
npx playwright test --headed
```

Run only the task E2E specification:

```bash
npx playwright test e2e/tasks.spec.ts
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

Install the required Playwright browsers when setting up the project:

```bash
npx playwright install
```

---

# Automated Testing Architecture

The project now uses two complementary testing layers.

```text
                    Automated Testing
                           |
             +-------------+-------------+
             |                           |
             v                           v
          Vitest                    Playwright
             |                           |
             v                           v
      API Route Tests             Browser E2E Tests
             |                           |
             v                           v
       Task API Logic          Complete User Workflows
```

Vitest focuses on the API route handlers.

Playwright focuses on the complete browser workflow.

This separation allows each testing tool to validate the layer it is best suited to test.

---

# Playwright and Vitest

Vitest and Playwright are not replacements for one another.

Vitest is used for fast API-level testing.

The current Vitest suite verifies:

```text
GET /api/tasks
POST /api/tasks
DELETE /api/tasks
```

Playwright is used for browser-level end-to-end testing.

The current Playwright suite verifies:

```text
Authentication
Task creation
Task persistence
Task deletion
Validation
API protection
User isolation
```

Together they provide broader automated coverage than either testing approach alone.

---

# Playwright Test Results

The current Playwright test suite contains:

```text
6 tests
6 passed
0 failed
```

The latest successful run completed with:

```text
6 passed (24.2s)
```

The test run used:

```text
Chromium
```

The PostgreSQL driver may display an SSL-mode warning during the local E2E run.

The warning does not currently prevent the test suite from passing.

---

# Current E2E Test Status

The current automated browser test result is:

```text
Playwright
6/6 passing
```

The current API test result is:

```text
Vitest
3/3 passing
```

The combined automated test count is:

```text
9/9 passing
```

These represent two separate test suites covering different layers of the application.

---

# E2E Testing Security

The local E2E authentication route is intentionally restricted.

The route requires:

```text
E2E_TEST=true
```

and also checks that the application is not running in production.

The production condition takes priority.

The route is therefore unavailable when:

```text
NODE_ENV=production
```

even if an E2E-related environment variable were accidentally present.

The test login route must never be used as a production authentication mechanism.

---

# Local E2E Testing Flow

The local E2E process is:

```text
Start Playwright
      |
      v
Start / reuse Next.js server
      |
      v
Create test authentication session
      |
      v
Open application in Chromium
      |
      v
Perform user workflow
      |
      v
Call application API
      |
      v
Read/write PostgreSQL
      |
      v
Verify visible result
      |
      v
Test complete
```

This allows the project to test the application as an integrated system.

---

# E2E Testing Checklist

Before considering the E2E suite healthy:

- [ ] Playwright is installed.
- [ ] Playwright browsers are installed.
- [ ] The local Next.js application starts.
- [ ] `E2E_TEST=true` is available in the local E2E environment.
- [ ] The test authentication route works locally.
- [ ] An authenticated dashboard can be opened.
- [ ] A task can be created.
- [ ] A created task remains after refresh.
- [ ] A task can be deleted.
- [ ] Empty task input is rejected.
- [ ] Unauthenticated API access is rejected.
- [ ] Cross-user task deletion is rejected.
- [ ] All Playwright tests pass.

---

# Automated Test Summary

The project now has both API-level and browser-level automated tests.

```text
                    Automated Tests
                          |
          +---------------+---------------+
          |                               |
          v                               v
       Vitest                         Playwright
          |                               |
          v                               v
      3 tests                          6 tests
          |                               |
          v                               v
      3 passing                        6 passing
```

Current result:

```text
Vitest      3/3
Playwright  6/6
Total       9/9
```

The two suites complement each other and provide coverage across both backend route behavior and complete user workflows.

---

# Playwright and CI/CD

Playwright is currently configured for local end-to-end testing.

The existing GitHub Actions Test workflow continues to run:

```bash
npm test
```

which executes the Vitest suite.

The current GitHub Actions workflow does not claim to run the Playwright browser suite.

This keeps the existing CI/CD behavior unchanged while allowing the project to run full browser E2E tests locally.

A future CI workflow can add Playwright browser testing separately if required.

---

# E2E Test Reports

Playwright can generate an HTML test report.

After a test run, the report can be opened with:

```bash
npx playwright show-report
```

The report provides a visual summary of:

- Passed tests.
- Failed tests.
- Test duration.
- Browser information.
- Test steps.
- Available traces when retries occur.

This makes Playwright results easier to inspect when demonstrating the project or investigating an E2E failure.

---


```bash
npm run build
```

Creates a production build.

---

## Production Server

```bash
npm run start
```

Starts the production server after a successful build.

---

## Lint

```bash
npm run lint
```

Runs ESLint.

---

## Tests

```bash
npm test
```

Runs the Vitest test suite.

---

## TypeScript

```bash
npx tsc --noEmit
```

Checks TypeScript without generating output.

---

## Prisma Contract

```bash
npx prisma contract emit
```

Emits the Prisma contract used by the project.

---

# Linting

ESLint is used to identify code quality problems.

The configuration is stored in:

```text
eslint.config.mjs
```

The project uses:

- Next.js Core Web Vitals rules.
- Next.js TypeScript rules.
- Custom generated-file ignores.

---

# ESLint Configuration

The project ignores generated Prisma files.

It also ignores Prisma-related skill directories.

The relevant ignored paths include:

```text
prisma/contract.d.ts
migrations/**
.agents/**
.claude/**
.cursor/**
.devin/**
```

This prevents generated or tool-managed files from causing unnecessary lint failures.

---

# TypeScript

TypeScript provides static type checking.

The CI workflow runs:

```bash
npx tsc --noEmit
```

This verifies that the project compiles at the TypeScript level without creating generated JavaScript output.

---

# Testing

The project uses Vitest.

Tests are stored in:

```text
tests/
```

The current task API test file is:

```text
tests/tasks.test.ts
```

The test suite currently contains three functional tests.

The current result is:

```text
3/3 passing
```

---

# Vitest

Vitest is used because it provides a fast JavaScript and TypeScript testing environment.

The project uses:

```text
vitest.config.mts
```

The configuration uses the Node environment.

The project also defines the `@` alias for source files.

---

# Functional Tests

The task tests mock authentication and database dependencies.

The tests exercise actual API route handlers.

The current tests cover:

- GET task handling.
- POST task handling.
- DELETE task handling.

This provides more meaningful coverage than testing only isolated helper functions.

---

# Test Flow

The test process is:

```text
Test workflow starts
        |
        v
Install dependencies
        |
        v
Emit Prisma contract
        |
        v
Run ESLint
        |
        v
Run TypeScript
        |
        v
Run Vitest
        |
        v
Build application
```

---

# Production Build

The project has successfully produced a production build.

The build output includes:

```text
○ /
○ /_not-found
ƒ /api/auth/[...nextauth]
ƒ /api/tasks
```

The successful build confirms that the Next.js application can compile for production.

---

# GitHub

The project source code is hosted on GitHub.

Repository:

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

GitHub is used for:

- Source control.
- Collaboration.
- Pull requests.
- Commit history.
- GitHub Actions.
- CI/CD.

---

# Git Workflow

The project follows a standard Git workflow.

A developer makes a change locally.

The change is tested locally.

The change is committed.

The change is pushed to GitHub.

Pull requests can be used to review changes.

Changes merged into `main` enter the production pipeline.

---

# Basic Git Commands

Check status:

```bash
git status
```

Check branches:

```bash
git branch
```

Create a branch:

```bash
git checkout -b feature-name
```

Stage files:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe the change"
```

Push:

```bash
git push
```

---

# Pull Requests

Pull requests provide a controlled way to merge changes into `main`.

The Build workflow runs for pull requests targeting `main`.

This allows the project to validate the proposed change before it becomes part of the main branch.

---

# CI/CD

CI/CD stands for:

```text
Continuous Integration
Continuous Delivery
Continuous Deployment
```

The project uses GitHub Actions to automate validation and release.

---

# Continuous Integration

Continuous Integration means developers regularly integrate changes into a shared repository.

The purpose is to detect problems early.

In this project, CI includes:

- Building the application.
- Running ESLint.
- Checking TypeScript.
- Running tests.
- Building again before release.

---

# Integration Hell

Integration Hell occurs when developers work independently for long periods and then attempt to combine many changes at once.

Large integration points can create:

- Merge conflicts.
- Unexpected behavior.
- Difficult debugging.
- Broken builds.
- Hard-to-trace failures.

Regular integration reduces these risks.

---

# Continuous Delivery

Continuous Delivery means keeping the application in a state where it can be released reliably.

The project validates changes automatically.

The release workflow can then trigger a production deployment after the required checks succeed.

---

# Continuous Deployment

Continuous Deployment goes one step further.

Successful changes can automatically move into production.

The current release workflow triggers the Vercel deployment after the Test workflow succeeds for `main`.

---

# Continuous Development

Continuous Development refers to continuously improving the software through regular development cycles.

The general cycle is:

```text
Plan
  |
  v
Develop
  |
  v
Test
  |
  v
Review
  |
  v
Release
  |
  v
Improve
```

---

# CI/CD Pipeline

The project pipeline is:

```text
Developer
    |
    v
GitHub
    |
    v
Build
    |
    v
Test
    |
    v
Release
    |
    v
Vercel
    |
    v
Production
```

---

# Pipeline Details

The pipeline contains three GitHub Actions workflows.

```text
build.yml
test.yml
release.yml
```

They form a dependency chain.

```text
Build
  |
  v
Test
  |
  v
Release
```

---

# GitHub Actions

GitHub Actions executes automated workflows.

Each workflow is stored inside:

```text
.github/workflows/
```

The project contains:

```text
.github/workflows/build.yml
.github/workflows/test.yml
.github/workflows/release.yml
```

---

# Workflow Files

A GitHub Actions workflow is written in YAML.

A workflow normally contains:

- Name.
- Trigger.
- Jobs.
- Runner.
- Steps.
- Actions.
- Commands.
- Environment variables.
- Conditions.

---

# Build Workflow

The Build workflow is named:

```text
Build
```

It runs when:

- A pull request targets `main`.
- Code is pushed to `main`.

---

# Build Workflow Triggers

```yaml
on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main
```

This means the Build workflow is not limited to pull requests.

It also runs when changes are pushed directly to `main`.

---

# Build Workflow Environment

The Build job receives:

```text
DATABASE_URL
```

through GitHub Secrets.

The secret is exposed to the workflow as:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

# Build Workflow Steps

The Build workflow performs:

1. Checkout.
2. Node.js setup.
3. Dependency installation.
4. Prisma contract emission.
5. Next.js production build.

---

# Build Workflow

```yaml
name: Build

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Emit Prisma contract
        run: npx prisma contract emit

      - name: Build Next.js application
        run: npm run build
```

---

# Build Runner

The workflow uses:

```text
ubuntu-latest
```

This provides a clean GitHub-hosted environment.

---

# Node Version

The Build workflow uses:

```yaml
node-version: 24
```

This matches the project's Node.js major version.

---

# npm Cache

The workflow uses npm caching through:

```yaml
cache: npm
```

This helps reduce unnecessary dependency installation overhead.

---

# npm CI

The Build workflow uses:

```bash
npm ci
```

instead of:

```bash
npm install
```

`npm ci` is intended for reproducible CI installations.

---

# Prisma Contract in Build

The Build workflow runs:

```bash
npx prisma contract emit
```

before:

```bash
npm run build
```

This ensures the Prisma contract is available during the build.

---

# Test Workflow

The Test workflow is named:

```text
Test
```

It is triggered through:

```yaml
workflow_run
```

It waits for the Build workflow to finish.

---

# Test Trigger

The workflow listens for:

```yaml
workflow_run:
  workflows:
    - Build
  types:
    - completed
```

This means Test starts after Build finishes.

---

# Test Success Condition

The Test job contains:

```yaml
if: ${{ github.event.workflow_run.conclusion == 'success' }}
```

Therefore the Test job runs only when Build succeeds.

---

# Test Checkout

The Test workflow checks out:

```yaml
ref: ${{ github.event.workflow_run.head_sha }}
```

This is important because it makes the test workflow operate against the exact commit that triggered the Build workflow.

---

# Test Environment

The Test workflow also receives:

```text
DATABASE_URL
```

from GitHub Secrets.

---

# Test Workflow Steps

The Test workflow performs:

1. Checkout.
2. Node.js setup.
3. Dependency installation.
4. Prisma contract emission.
5. ESLint.
6. TypeScript validation.
7. Vitest.
8. Production build.

---

# Test Workflow

```yaml
name: Test

on:
  workflow_run:
    workflows:
      - Build
    types:
      - completed

jobs:
  test:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v6
        with:
          ref: ${{ github.event.workflow_run.head_sha }}

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Emit Prisma contract
        run: npx prisma contract emit

      - name: Run ESLint
        run: npm run lint

      - name: Check TypeScript
        run: npx tsc --noEmit

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
```

---

# Test Validation

The Test workflow validates:

```text
ESLint
TypeScript
Vitest
Production Build
```

This creates multiple layers of validation.

---

# ESLint Check

The workflow runs:

```bash
npm run lint
```

A successful result means the code passes the configured ESLint rules.

---

# TypeScript Check

The workflow runs:

```bash
npx tsc --noEmit
```

This checks the project for TypeScript errors.

---

# Vitest Check

The workflow runs:

```bash
npm test
```

The current test suite has:

```text
3/3 passing
```

---

# Test Build

The workflow finishes with:

```bash
npm run build
```

This provides another production-build validation after the other checks.

---

# Release Workflow

The Release workflow is named:

```text
Release
```

It runs after the Test workflow completes.

---

# Release Trigger

The Release workflow listens for:

```yaml
workflow_run:
  workflows:
    - Test
  types:
    - completed
```

---

# Release Conditions

The release job requires:

```text
Test succeeded
```

and:

```text
The workflow run came from main
```

The condition is:

```yaml
if: >
  ${{ github.event.workflow_run.conclusion == 'success' &&
      github.event.workflow_run.head_branch == 'main' }}
```

---

# Release Workflow

```yaml
name: Release

on:
  workflow_run:
    workflows:
      - Test
    types:
      - completed

jobs:
  release:
    if: >
      ${{ github.event.workflow_run.conclusion == 'success' &&
          github.event.workflow_run.head_branch == 'main' }}
    runs-on: ubuntu-latest

    steps:
      - name: Trigger Vercel deployment
        run: curl -X POST "${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

---

# Release Method

The current release workflow does not use the Vercel CLI.

It does not require the release workflow to authenticate with Vercel using a Vercel token.

Instead, GitHub Actions sends a POST request to a Vercel Deploy Hook.

The hook URL is stored as a GitHub Secret.

---

# Vercel Deploy Hook

The project uses:

```text
VERCEL_DEPLOY_HOOK
```

as a GitHub Secret.

The actual hook URL is intentionally not stored in this README.

The Release workflow sends:

```bash
curl -X POST "${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

---

# Why the Deploy Hook Is Useful

The Deploy Hook provides a simple connection between GitHub Actions and Vercel.

The workflow does not need to expose the hook URL.

GitHub stores the hook URL as a secret.

The Release workflow retrieves it securely during execution.

---

# Workflow Dependency

The three workflows form:

```text
Build
  |
  | success
  v
Test
  |
  | success + main
  v
Release
  |
  v
Vercel
```

A failed Build stops the chain.

A failed Test stops the Release stage.

A successful Test on a non-main branch does not trigger the production Release job.

---

# Pull Request Flow

For a pull request targeting `main`:

```text
Pull Request
     |
     v
Build
     |
     v
Validation
```

The Build workflow checks whether the application can build.

The Test workflow can then run after a successful Build.

The Release job does not run unless the workflow run is associated with `main`.

---

# Main Branch Flow

For a successful push to `main`:

```text
Push to main
     |
     v
Build
     |
     v
Test
     |
     v
Release
     |
     v
Vercel
     |
     v
Production
```

This is the main production release path.

---

# CI/CD Pipeline Summary

| Stage | Workflow | Purpose |
|---|---|---|
| Build | Build | Compile application |
| Test | Test | Validate quality and tests |
| Release | Release | Trigger Vercel deployment |

---

# GitHub Secrets

The current GitHub Actions workflows use:

```text
DATABASE_URL
VERCEL_DEPLOY_HOOK
```

These values are stored in GitHub Secrets.

---

# DATABASE_URL Secret

`DATABASE_URL` allows GitHub Actions to access the database configuration required during Prisma and Next.js build operations.

The value should match the appropriate Neon PostgreSQL connection.

---

# VERCEL_DEPLOY_HOOK Secret

`VERCEL_DEPLOY_HOOK` stores the Vercel Deploy Hook.

The actual URL should never be written into workflow source code.

The workflow references:

```yaml
${{ secrets.VERCEL_DEPLOY_HOOK }}
```

---

# Vercel

Vercel hosts the production application.

The project is connected to the GitHub repository.

The Vercel project is named:

```text
task-manager
```

The production deployment is available at:

```text
https://task-manager-nine-khaki-16.vercel.app
```

---

# Vercel Project

The project is associated with the Vercel team:

```text
Muhammad Ahmed Anwar
```

The Vercel project identifier is managed by Vercel.

Sensitive Vercel identifiers and credentials should not be treated as application configuration.

---

# Production Environment Variables

The Vercel production environment requires the application's production environment variables.

These include:

```text
DATABASE_URL
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

---

# Vercel Deployment

The current GitHub Actions release mechanism uses the Vercel Deploy Hook.

The process is:

```text
GitHub Actions
      |
      v
Successful Test
      |
      v
Release workflow
      |
      v
POST request
      |
      v
Vercel Deploy Hook
      |
      v
Vercel deployment
```

---

# Vercel CLI

The project previously used an interactive Vercel CLI deployment during setup.

The current GitHub Actions release workflow does not depend on the Vercel CLI.

The current release mechanism is:

```text
GitHub Actions
+
Vercel Deploy Hook
```

---

# Google OAuth Production Configuration

Production authentication requires the production callback URL to be configured with Google.

The production application URL is:

```text
https://task-manager-nine-khaki-16.vercel.app
```

The appropriate Google OAuth callback must correspond to the deployed authentication route.

The exact callback configured for the deployed application should be kept consistent with the current production deployment.

---

# OAuth Troubleshooting

If Google sign-in fails after deployment, check:

1. Production environment variables.
2. Google Client ID.
3. Google Client Secret.
4. Authentication secret.
5. OAuth callback URL.
6. Deployment URL.
7. Google OAuth configuration.
8. Vercel environment settings.

---

# Local vs Production

Local development uses:

```text
.env.local
```

Production uses environment variables configured in Vercel.

GitHub Actions uses GitHub Secrets.

These environments should not rely on committed secrets.

---

# Environment Separation

The basic model is:

```text
Local
  |
  +---- .env.local

GitHub Actions
  |
  +---- GitHub Secrets

Vercel
  |
  +---- Vercel Environment Variables
```

Each environment has its own secure configuration.

---

# Troubleshooting

Troubleshooting should begin by identifying which layer is failing.

The main layers are:

```text
Frontend
Backend
Authentication
Database
Prisma
Testing
GitHub Actions
Vercel
```

---

# Troubleshooting Order

A useful troubleshooting sequence is:

1. Check the exact error.
2. Identify the environment.
3. Reproduce locally if possible.
4. Check environment variables.
5. Check dependency versions.
6. Check GitHub Actions logs.
7. Check Vercel logs.
8. Check database connectivity.
9. Check authentication configuration.
10. Re-run the affected step.

---

# Prisma Troubleshooting

One important issue during development was Prisma command compatibility.

The project uses Prisma 8 release candidate tooling.

The correct project command is:

```bash
npx prisma contract emit
```

Do not automatically replace it with older Prisma commands.

---

# Prisma Build Failure

If the build fails around Prisma:

Check:

```text
prisma.config.ts
```

Check:

```text
prisma/contract.prisma
```

Check:

```text
DATABASE_URL
```

Then run:

```bash
npx prisma contract emit
```

After that run:

```bash
npm run build
```

---

# Database Troubleshooting

If the database connection fails:

Check:

```text
DATABASE_URL
```

Check whether the Neon database is available.

Check whether the connection string is correct.

Check whether the environment contains the variable.

For GitHub Actions, check:

```text
GitHub Settings
  >
Secrets and variables
  >
Actions
```

---

# Missing DATABASE_URL

If Prisma reports that the database URL is missing:

Check `.env.local`.

The file should contain:

```env
DATABASE_URL="your-database-url"
```

For GitHub Actions, confirm:

```text
DATABASE_URL
```

exists as a GitHub Secret.

---

# Authentication Troubleshooting

If authentication fails locally:

Check:

```text
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

Then check the Google OAuth configuration.

---

# Google Callback Troubleshooting

If Google redirects incorrectly:

Check the callback URL registered with Google.

Check the current deployment URL.

Check whether the production domain changed.

Check whether the authentication route is:

```text
/api/auth/
```

---

# Session Troubleshooting

If the user appears logged out:

Check:

- Authentication configuration.
- `AUTH_SECRET`.
- Google OAuth credentials.
- Browser cookies.
- Deployment environment variables.
- Production callback configuration.

---

# Task API Troubleshooting

If tasks do not load:

Check:

1. User authentication.
2. Session availability.
3. API route.
4. Database connection.
5. Prisma configuration.
6. Browser network requests.
7. Vercel logs.

---

# Task Creation Troubleshooting

If tasks cannot be created:

Check:

- Authentication.
- Request body.
- API route.
- Database connection.
- User identity.
- Server logs.

---

# Task Deletion Troubleshooting

If deletion fails:

Check:

- Task ID.
- Authentication.
- Ownership verification.
- API route.
- Database connection.

---

# GitHub Actions Troubleshooting

When a workflow fails:

Open:

```text
GitHub
  >
Actions
```

Select the failed workflow.

Open the failed job.

Open the failed step.

Read the first meaningful error.

Avoid focusing only on the final generic failure message.

---

# Build Workflow Failure

If Build fails:

Check:

```text
npm ci
```

Then:

```text
npx prisma contract emit
```

Then:

```text
npm run build
```

Try the same commands locally.

---

# Test Workflow Failure

If Test fails:

Check:

```bash
npm run lint
```

Then:

```bash
npx tsc --noEmit
```

Then:

```bash
npm test
```

Then:

```bash
npm run build
```

This identifies which validation layer is failing.

---

# Release Workflow Failure

If Release fails:

Check:

```text
Test workflow result
```

Then:

```text
head_branch
```

Then:

```text
VERCEL_DEPLOY_HOOK
```

Then check Vercel.

---

# Release Branch Condition

The Release workflow only proceeds when:

```text
Test succeeded
```

and:

```text
head_branch == main
```

A successful Test run from another branch should not trigger the production release job.

---

# Vercel Troubleshooting

If Vercel does not deploy:

Check:

1. Vercel project exists.
2. Deploy Hook exists.
3. Deploy Hook targets the correct project.
4. Deploy Hook targets the intended branch.
5. `VERCEL_DEPLOY_HOOK` exists in GitHub Secrets.
6. Release workflow succeeded.
7. Vercel deployment logs.

---

# Deploy Hook Security

The Deploy Hook URL is sensitive.

Do not:

- Commit it.
- Put it in README.
- Put it in source code.
- Post it publicly.
- Put it in issue comments.
- Put it in screenshots.

Use GitHub Secrets.

---

# ESLint Generated File Issue

The project previously encountered linting issues caused by generated Prisma files.

The solution was to ignore generated Prisma files.

The ESLint configuration includes:

```text
prisma/contract.d.ts
```

and generated migration and skill directories.

This keeps generated files outside the normal application linting scope.

---

# Commit

The ESLint configuration change was committed with:

```text
1423d63
```

Commit message:

```text
Ignore generated Prisma files in ESLint
```

---

# CI History

The project evolved through several CI/CD changes.

Important commits included:

```text
290b95c
Add functional tests to CI
```

```text
1423d63
Ignore generated Prisma files in ESLint
```

```text
f7c1c80
Confirm Vercel deployment automatically
```

```text
2130bd6
Run build on main pushes
```

```text
1f2287c
Trigger CI pipeline
```

```text
647ace5
Configure Vercel deployment IDs
```

---

# CI Development Lessons

The project demonstrated several important CI/CD concepts.

A successful local build does not automatically guarantee CI success.

CI runs in a clean environment.

Environment variables must therefore be configured separately.

Generated files must be handled correctly.

Dependencies must be installed consistently.

Tests should be automated.

Production builds should be validated before release.

---

# Security Practices

Security is important throughout the project.

Sensitive configuration should never be hard-coded.

Use:

```text
.env.local
```

for local secrets.

Use:

```text
GitHub Secrets
```

for GitHub Actions secrets.

Use:

```text
Vercel Environment Variables
```

for production configuration.

---

# Secrets That Must Not Be Committed

Never commit:

```text
DATABASE_URL
AUTH_SECRET
AUTH_GOOGLE_SECRET
VERCEL_DEPLOY_HOOK
```

Do not commit:

```text
.env.local
```

---

# Gitignore

The project should keep sensitive local files outside version control.

The `.gitignore` file is therefore important.

Check it before committing environment-related changes.

---

# Dependency Management

Dependencies are defined in:

```text
package.json
```

The lockfile provides reproducible dependency resolution.

CI uses:

```bash
npm ci
```

This makes the CI installation more predictable.

---

# package.json

The main scripts are:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "postinstall": "prisma skills sync || exit 0"
  }
}
```

---

# Development Command Reference

| Command | Purpose |
|---|---|
| `npm run dev` | Start development |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest |
| `npx tsc --noEmit` | TypeScript check |
| `npx prisma contract emit` | Emit Prisma contract |

---

# Git Command Reference

## Status

```bash
git status
```

Shows changed files.

---

## Add

```bash
git add .
```

Stages changes.

---

## Commit

```bash
git commit -m "Describe change"
```

Creates a commit.

---

## Push

```bash
git push
```

Pushes changes.

---

## Pull

```bash
git pull
```

Downloads and integrates changes.

---

## Log

```bash
git log --oneline
```

Shows compact commit history.

---

## Branches

```bash
git branch
```

Lists branches.

---

## Create Branch

```bash
git checkout -b feature-name
```

Creates and switches to a branch.

---

# GitHub Actions Reference

A workflow normally contains:

```yaml
name: Example

on:
  push:
    branches:
      - main

jobs:
  example:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Run command
        run: npm test
```

---

# Workflow Components

## `name`

Defines the workflow name.

Example:

```yaml
name: Build
```

---

## `on`

Defines when the workflow runs.

Example:

```yaml
on:
  push:
    branches:
      - main
```

---

## `jobs`

Defines jobs inside the workflow.

---

## `runs-on`

Defines the GitHub-hosted runner.

Example:

```yaml
runs-on: ubuntu-latest
```

---

## `steps`

Defines individual operations.

---

## `uses`

Uses a reusable GitHub Action.

Example:

```yaml
uses: actions/checkout@v6
```

---

## `run`

Runs a shell command.

Example:

```yaml
run: npm test
```

---

## `env`

Defines environment variables.

Example:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## `secrets`

References GitHub Secrets.

Example:

```yaml
${{ secrets.DATABASE_URL }}
```

---

# CI/CD Concepts

## Commit

A commit records a change in Git.

---

## Push

A push sends local commits to a remote repository.

---

## Build

The build process converts the source project into a deployable production application.

---

## Test

Tests verify expected behavior.

---

## Release

Release makes a validated version available for deployment.

---

## Deployment

Deployment makes the application available on the production hosting platform.

---

# Development Checklist

Before pushing changes:

- [ ] Application starts locally.
- [ ] Feature works locally.
- [ ] No obvious console errors.
- [ ] Authentication works.
- [ ] Database works.
- [ ] Tasks can be created.
- [ ] Tasks can be deleted.
- [ ] `npm run lint` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] Playwright E2E tests pass.
- [ ] Browser E2E task persistence has been checked.
- [ ] User isolation has been checked through an E2E workflow.


---

# Testing Checklist

Before merging:

- [ ] Tests pass.
- [ ] ESLint passes.
- [ ] TypeScript passes.
- [ ] Production build passes.
- [ ] Authentication has been checked.
- [ ] API behavior has been checked.
- [ ] Database behavior has been checked.
- [ ] Playwright E2E tests pass.
- [ ] Browser task persistence has been checked.
- [ ] User isolation has been checked.
- [ ] Logged-out authentication interface has been checked.


---

# Deployment Checklist

Before production:

- [ ] GitHub repository is updated.
- [ ] `main` contains the intended changes.
- [ ] Build succeeds.
- [ ] Test succeeds.
- [ ] Release succeeds.
- [ ] Vercel deployment succeeds.
- [ ] Production URL loads.
- [ ] Google sign-in works.
- [ ] Tasks can be created.
- [ ] Tasks can be deleted.
- [ ] Database persistence works.

---

# Production Verification

After deployment:

1. Open the production URL.
2. Check that the page loads.
3. Sign in with Google.
4. Confirm the authenticated state.
5. Add a task.
6. Confirm the task appears.
7. Refresh the page.
8. Confirm persistence.
9. Delete the task.
10. Confirm deletion.
11. Sign out.

---

# CI Verification

A successful production release should have:

```text
Build: Success
Test: Success
Release: Success
Vercel: Success
```

---

# Current CI/CD Status

The complete pipeline is operational.

The Build workflow works.

The Test workflow works.

The Release workflow works.

The Vercel deployment is triggered successfully.

The application has successfully released to production.

---

# Current Test Status

The current functional test suite reports:

```text
3/3 passing
```

The tests cover the task API handlers.

---

# Current Build Status

The production build succeeds.

The application compiles successfully with Next.js 16.3.3.

The build includes:

```text
/
```

```text
/_not-found
```

```text
/api/auth/[...nextauth]
```

```text
/api/tasks
```

---

# Current Deployment

Production URL:

```text
https://task-manager-nine-khaki-16.vercel.app
```

---

# Repository

GitHub repository:

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

---

# Local Project

Local project directory:

```text
C:\Users\F-05\Desktop\Projects\task-manager
```

---

# Release Architecture

The release architecture is:

```text
Local Development
        |
        v
       Git
        |
        v
     GitHub
        |
        v
     Build
        |
        v
      Test
        |
        v
    Release
        |
        v
 Vercel Deploy Hook
        |
        v
     Vercel
        |
        v
   Production
```

---

# Failure Handling

The pipeline intentionally separates stages.

If Build fails:

```text
Test should not proceed as a successful dependency.
```

If Test fails:

```text
Release should not proceed.
```

If Test succeeds on a branch other than `main`:

```text
Production Release is not triggered by the Release condition.
```

---

# Why Build Runs on Pull Requests

Pull request builds provide early validation.

A proposed change can be checked before it becomes part of `main`.

This helps identify:

- Compilation errors.
- Dependency problems.
- Prisma issues.
- Build configuration problems.

---

# Why Build Runs on Main

Build also runs on pushes to `main`.

This ensures the main branch is directly validated.

It also allows the downstream workflow chain to begin for production changes.

---

# Why Test Uses workflow_run

The Test workflow uses:

```yaml
workflow_run
```

to depend on the Build workflow.

This creates an explicit relationship:

```text
Build
  |
  v
Test
```

The Test workflow checks the Build result before starting its job.

---

# Why Release Uses workflow_run

The Release workflow also uses:

```yaml
workflow_run
```

This creates:

```text
Test
  |
  v
Release
```

The Release job checks that Test succeeded.

It also checks that the source branch is `main`.

---

# Why Check out head_sha

The Test workflow checks out:

```yaml
ref: ${{ github.event.workflow_run.head_sha }}
```

This ensures the Test workflow uses the exact commit associated with the Build workflow.

This reduces the chance of testing a different revision from the one that was built.

---

# Production Release Gate

The production release is gated by:

```text
Successful Build
        |
        v
Successful Test
        |
        v
main branch
        |
        v
Release
```

---

# Historical Deployment Approach

During project setup, Vercel CLI deployment was tested.

The command:

```bash
npx vercel deploy --prod
```

was used interactively.

This successfully demonstrated that the project could be deployed.

The final CI/CD approach moved the release trigger to a Vercel Deploy Hook.

---

# Why the Final Release Uses a Deploy Hook

The Deploy Hook approach keeps the Release workflow simple.

The workflow only needs to send:

```http
POST
```

to the configured Vercel Deploy Hook.

The actual URL remains stored as a secret.

---

# Vercel Token History

Older Vercel configuration may have included token and project identifiers.

The current Release workflow does not depend on:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

The current release mechanism uses:

```text
VERCEL_DEPLOY_HOOK
```

---

# Current GitHub Secrets

The active CI/CD secrets are:

```text
DATABASE_URL
VERCEL_DEPLOY_HOOK
```

Authentication variables are used by the application environment separately.

---

# Production Authentication Variables

The application requires:

```text
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
DATABASE_URL
```

These should be configured in the production environment.

---

# Application Responsibilities

The application itself is responsible for:

- Authentication.
- Session handling.
- Task creation.
- Task retrieval.
- Task deletion.
- Database interaction.
- User-specific data.

---

# CI Responsibilities

GitHub Actions is responsible for:

- Building.
- Linting.
- Type checking.
- Testing.
- Production build verification.
- Triggering the production release.

---

# Vercel Responsibilities

Vercel is responsible for:

- Hosting the application.
- Running the production deployment.
- Providing the production URL.
- Managing production deployment infrastructure.

---

# Neon Responsibilities

Neon is responsible for:

- PostgreSQL hosting.
- Persistent database storage.
- Database connectivity.

---

# Google Responsibilities

Google OAuth provides:

- User authentication.
- Google identity verification.
- OAuth authorization flow.

---

# Separation of Responsibilities

The project can therefore be viewed as:

```text
Next.js
Application

NextAuth.js
Authentication

Google
Identity Provider

Prisma
Database Access

Neon
Database Hosting

GitHub
Source Control

GitHub Actions
Automation

Vercel
Deployment
```

---

# Project Learning Areas

This project demonstrates:

- Next.js.
- React.
- TypeScript.
- API routes.
- Authentication.
- OAuth.
- PostgreSQL.
- Prisma.
- Environment variables.
- Automated testing.
- ESLint.
- CI/CD.
- GitHub Actions.
- Vercel.
- Deploy Hooks.
- Production deployment.

---

# Development Lessons

One important lesson is that local development and CI environments are different.

A command that works locally may fail in CI if an environment variable is missing.

A generated file that exists locally may not exist in a clean CI runner.

A production OAuth callback may differ from the local callback.

A deployment can succeed while authentication still fails if production environment variables are incorrect.

---

# CI Lessons

CI should reproduce important production checks.

The project therefore runs:

```bash
npm run lint
```

```bash
npx tsc --noEmit
```

```bash
npm test
```

```bash
npm run build
```

---

# Database Lessons

Database configuration should not be hard-coded.

The connection should be supplied through:

```text
DATABASE_URL
```

This allows different environments to use different database configurations without changing source code.

---

# Authentication Lessons

OAuth requires the callback configuration to match the deployment environment.

Local and production URLs are different.

Therefore the OAuth configuration must account for the production deployment URL.

---

# Testing Lessons

Testing API route handlers provides useful validation of backend behavior.

Mocking authentication and database dependencies allows the route logic to be tested without requiring a full browser session.

---

# Code Quality Lessons

Generated files should not automatically be treated as application source files.

The ESLint configuration therefore excludes generated Prisma files and skill directories.

---

# Deployment Lessons

A deployment workflow should have clear stages.

The project uses:

```text
Build
  |
  v
Test
  |
  v
Release
```

This makes failures easier to identify.

---

# Future Improvements

---

# Current E2E Implementation

Browser-based end-to-end testing has now been added to the project using Playwright.

The implementation includes:

- `@playwright/test`.
- `playwright.config.ts`.
- `e2e/tasks.spec.ts`.
- A local-only E2E authentication route.
- Six passing E2E tests.
- Authenticated and unauthenticated workflows.
- Task persistence testing.
- User isolation testing.

The existing GitHub Actions Test workflow remains unchanged and continues to run Vitest.


Possible future improvements include:

- Edit tasks.
- Mark tasks as completed.
- Add task priorities.
- Add task categories.
- Add due dates.
- Add sorting.
- Add filtering.
- Add search.
- Add pagination.
- Add richer task metadata.
- Add user profile information.
- Add improved error messages.
- Add more automated tests.
- Add browser-based end-to-end tests.
- Add deployment previews.
- Add database migration automation.
- Add monitoring.
- Add analytics.
- Add accessibility improvements.
- Add responsive UI improvements.

---

# Possible Testing Improvements

Future testing could include:

- Component tests.
- Authentication tests.
- Database integration tests.
- End-to-end tests.
- Browser tests.
- Error-state tests.
- Unauthorized request tests.
- User isolation tests.

---

# Possible API Improvements

Future API improvements could include:

```text
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

This would allow tasks to be edited and updated individually.

---

# Possible Task Features

Future tasks could contain:

- Title.
- Description.
- Completed state.
- Priority.
- Due date.
- Created date.
- Updated date.
- Category.

---

# Possible UI Improvements

Future UI improvements could include:

- Task filters.
- Search.
- Animations.
- Empty states.
- Loading states.
- Error states.
- Better mobile layouts.
- Keyboard shortcuts.
- Improved accessibility.
- Task editing.
- Task completion controls.

---

# Maintainability

The project is structured so that:

- Frontend code is inside `src/app`.
- Components are separated.
- Authentication has its own configuration.
- Database access has its own library file.
- API routes are grouped under `src/app/api`.
- Tests are separated from application code.
- CI workflows are stored under `.github/workflows`.

---

# Recommended Development Process

For a new feature:

```text
1. Understand requirement
2. Plan change
3. Implement locally
4. Run application
5. Test manually
6. Run lint
7. Run TypeScript
8. Run tests
9. Build
10. Commit
11. Push
12. Review GitHub Actions
13. Merge
14. Verify deployment
```

---

# Recommended Debugging Process

When something breaks:

```text
1. Identify exact error
2. Find affected layer
3. Reproduce locally
4. Check configuration
5. Check logs
6. Apply smallest fix
7. Run local validation
8. Commit fix
9. Push
10. Verify CI
11. Verify production
```

---

# Recommended Secret Management

Secrets should always remain outside source code.

Use:

```text
.env.local
```

for local values.

Use:

```text
GitHub Secrets
```

for CI.

Use:

```text
Vercel Environment Variables
```

for production.

---

# Recommended Git Practice

Keep commits focused.

A commit should ideally represent one logical change.

Examples:

```text
Add functional tests to CI
```

```text
Ignore generated Prisma files in ESLint
```

```text
Run build on main pushes
```

Focused commits make the history easier to understand.

---

# Recommended CI Practice

CI should fail when a meaningful validation fails.

A green workflow should provide confidence that:

- The application builds.
- TypeScript is valid.
- Linting passes.
- Tests pass.
- The production build succeeds.

---

# Recommended Release Practice

Production deployment should happen only after required validation succeeds.

The current workflow therefore uses:

```text
Build
  |
  v
Test
  |
  v
Release
```

---

# Production URL

The current production application is:

```text
https://task-manager-nine-khaki-16.vercel.app
```

---

# GitHub Repository

The source repository is:

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

---

# Project Directory

The local project is:

```text
C:\Users\F-05\Desktop\Projects\task-manager
```

---

# Current Status

The application is operational.

Authentication is configured.

Google OAuth is configured.

The PostgreSQL database is configured.

Prisma is configured.

The task API is implemented.

Functional tests are implemented.

The test suite passes.

ESLint passes.

TypeScript validation passes.

The production build passes.

GitHub Actions CI is configured.

The Release workflow is configured.

The Vercel Deploy Hook is configured.

Production deployment has successfully been triggered.

---

# Final CI/CD Summary

```text
Developer
    |
    v
GitHub
    |
    v
Build Workflow
    |
    +---- Checkout
    |
    +---- Node.js 24
    |
    +---- npm ci
    |
    +---- Prisma contract
    |
    +---- Next.js build
    |
    v
Test Workflow
    |
    +---- Checkout exact SHA
    |
    +---- Node.js 24
    |
    +---- npm ci
    |
    +---- Prisma contract
    |
    +---- ESLint
    |
    +---- TypeScript
    |
    +---- Vitest
    |
    +---- Production build
    |
    v
Release Workflow
    |
    +---- Successful Test
    |
    +---- main branch
    |
    +---- Vercel Deploy Hook
    |
    v
Vercel
    |
    v
Production
```

---

# Final Application Summary

Task Manager is a full-stack Next.js application with:

- Google authentication.
- Authenticated sessions.
- PostgreSQL persistence.
- Neon database hosting.
- Prisma database access.
- Task API routes.
- User-specific tasks.
- Task creation.
- Task deletion.
- Automated tests.
- ESLint.
- TypeScript validation.
- Production builds.
- GitHub source control.
- GitHub Actions CI/CD.
- Vercel deployment.

---

# Final Pipeline Summary

The current pipeline is:

```text
Push / Pull Request
        |
        v
      Build
        |
        v
       Test
        |
        v
     Release
        |
        v
     Vercel
        |
        v
   Production
```

---

# Author

**Muhammad Ahmed Anwar**

---

# Project Links

## GitHub

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

## Production

```text
https://task-manager-nine-khaki-16.vercel.app
```

---

# Conclusion

Additional browser testing is provided by:

```text
Playwright
```

The project therefore has both API-level testing and browser-based end-to-end testing.


Task Manager combines a modern Next.js application with PostgreSQL persistence, Google authentication, automated testing, and a complete GitHub Actions CI/CD pipeline.

The project separates application development from automated validation and deployment.

The Build workflow verifies that the application can compile.

The Test workflow verifies code quality, TypeScript, automated tests, and the production build.

The Release workflow verifies that the Test workflow succeeded and that the source branch is `main` before triggering the Vercel deployment.

The Vercel Deploy Hook keeps the deployment trigger separate from application source code and keeps the actual deployment URL stored as a secret.

The resulting workflow provides a repeatable development and release process:

```text
Develop
  |
  v
Commit
  |
  v
Push
  |
  v
Build
  |
  v
Test
  |
  v
Release
  |
  v
Deploy
  |
  v
Production
```

The project is currently configured with:

```text
Next.js
React
TypeScript
Tailwind CSS
NextAuth.js
Google OAuth
Prisma
PostgreSQL
Neon
Vitest
ESLint
GitHub
GitHub Actions
Vercel
```

The production application is available at:

```text
https://task-manager-nine-khaki-16.vercel.app
```

The source code is available at:

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

The project is ready for continued development and future feature additions.