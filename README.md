# Task Manager

A simple, full-stack task management application built to make keeping track of everyday tasks straightforward.

The project started as a way to learn and bring together different parts of modern web development — from building the interface and working with APIs to authentication, database management, GitHub, CI/CD, and deployment.

Users can sign in with Google, create their own tasks, delete them when they're finished, and come back later to find their tasks still saved to their account.

---

## Overview

Task Manager is built with **Next.js and TypeScript**, with **PostgreSQL** used for persistent data storage and **Prisma** handling the database layer.

Authentication is handled through **Google OAuth**, allowing each signed-in user to have their own separate task list.

The application is deployed through **Vercel** and uses a hosted PostgreSQL database through **Neon**.

The project also uses **GitHub Actions** to automate the build, testing, and release process.

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
* **CI/CD pipeline** — GitHub Actions is used to build, test, and release the application.
* **Pull request checks** — Changes can be checked automatically before being merged into the main branch.
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

**Authentication**

* Google OAuth
* NextAuth.js

**Deployment & Development**

* Vercel
* Git
* GitHub
* GitHub Actions

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

The project also has a CI/CD flow that handles the application checks and production release:

```text
Pull Request
      ↓
Build Workflow
      ↓
Test Workflow
      ↓
Merge to Main
      ↓
Release Workflow
      ↓
Vercel Production
```

---

## Authentication

Google authentication is implemented using **NextAuth.js**.

After signing in, the application receives the user's session and uses it to determine which account is currently active.

The authenticated user's ID is then used when working with tasks, so tasks created by one account aren't shown to another account.

Google OAuth credentials and other sensitive configuration values are stored using environment variables rather than being committed to the repository.

For the deployed application, Google OAuth also needs the correct callback URL configured.

The callback URL follows this format:

```text
https://your-domain.com/api/auth/callback/google
```

The actual deployed Vercel domain needs to be added to the Google OAuth configuration.

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

This makes it possible for users to have their own separate task lists.

---

## Prisma

Prisma is used as the database layer between the application and PostgreSQL.

The project uses a newer Prisma setup with the database configuration defined through `prisma.config.ts` and the Prisma contract stored inside the `prisma` directory.

The database connection is provided through the `DATABASE_URL` environment variable.

The Prisma contract is prepared using:

```bash
npx prisma contract emit
```

This command is also used inside the GitHub Actions workflows before the application is built.

The database connection string is kept outside the source code and is provided through environment variables.

---

## Project Structure

```text
task-manager/
│
├── .github/
│   └── workflows/
│       ├── build.yml
│       ├── test.yml
│       └── release.yml
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

The `.github/workflows` directory contains the GitHub Actions workflows used for the CI/CD pipeline.

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

The build process is also used in the GitHub Actions CI/CD workflow.

---

## Deployment

The application is deployed using **Vercel**.

The production environment requires the same core environment variables used during local development, configured through Vercel's project settings.

Google OAuth also needs to be configured with the production callback URL:

```text
https://your-domain.com/api/auth/callback/google
```

The PostgreSQL database is hosted through **Neon**, allowing the deployed application to persist task data.

The project also uses GitHub Actions for the production release process.

---

## CI/CD

The project uses **GitHub Actions** to automate the process of checking and releasing changes.

The CI/CD setup is split into three separate workflows:

```text
Build
  ↓
Test
  ↓
Release
```

Each workflow has a different purpose.

The Build workflow checks whether the application can successfully build.

The Test workflow runs after the Build workflow succeeds and performs additional checks.

The Release workflow runs after the Test workflow succeeds and is responsible for deploying the application to Vercel.

The overall pipeline is:

```text
Pull Request
      ↓
Build
      ↓
Test
      ↓
Merge to Main
      ↓
Release
      ↓
Vercel Production
```

---

## GitHub Actions

GitHub Actions is used to automate the CI/CD process.

The workflow files are stored inside:

```text
.github/workflows/
```

The project currently has three workflow files:

```text
.github/
└── workflows/
    ├── build.yml
    ├── test.yml
    └── release.yml
```

Each workflow is written in YAML and contains information about when it should run, what environment it should use, and which steps it should perform.

The workflows are connected so that the Build stage is completed before the Test stage and the Test stage is completed before the Release stage.

---

## Build Workflow

The first workflow is:

```text
.github/workflows/build.yml
```

The purpose of the Build workflow is to make sure that the application can successfully compile.

It runs when a pull request is opened or updated against the `main` branch.

The workflow follows this process:

```text
Pull Request
      ↓
Checkout Code
      ↓
Setup Node.js
      ↓
Install Dependencies
      ↓
Emit Prisma Contract
      ↓
Build Next.js Application
```

The workflow uses:

```yaml
name: Build

on:
  pull_request:
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

The workflow uses Node.js 24, matching the Node.js version used for the project.

The `DATABASE_URL` is provided through GitHub repository secrets so that the database connection does not have to be written directly into the workflow.

---

## Why the Build Workflow Is Important

The Build workflow provides an automatic check before changes are merged.

If a change causes a problem with the application build, GitHub Actions can detect it during the pull request.

For example, a build could fail because of:

* A TypeScript problem
* A missing dependency
* An invalid configuration
* A database configuration problem
* A problem with a Next.js route
* A Prisma configuration issue

This gives a clear indication that the issue needs to be fixed before the changes are merged.

---

## Test Workflow

The second workflow is:

```text
.github/workflows/test.yml
```

The Test workflow is connected to the Build workflow using `workflow_run`.

It waits for the Build workflow to finish before starting.

The flow is:

```text
Build
  ↓
Build Successful
  ↓
Test
```

The current Test workflow performs several automated checks:

```text
Install Dependencies
        ↓
Emit Prisma Contract
        ↓
Run ESLint
        ↓
Check TypeScript
        ↓
Build Application
```

The workflow uses:

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

      - name: Build application
        run: npm run build
```

---

## Test Workflow Checks

The Test workflow currently checks the project in several ways.

### ESLint

ESLint checks the source code for linting issues.

```bash
npm run lint
```

### TypeScript

TypeScript is checked using:

```bash
npx tsc --noEmit
```

This checks for type errors without creating a separate build output.

### Prisma

The Prisma contract is emitted using:

```bash
npx prisma contract emit
```

This prepares the Prisma database layer before the application is built.

### Production Build

The application is also built again using:

```bash
npm run build
```

This provides another check that the application can successfully compile.

---

## Functional Testing

The current Test workflow focuses on automated code and build checks.

It does not currently simulate a real user clicking the Add Task and Delete Task buttons in a browser.

Browser-based functional testing could be added later using a testing framework such as Playwright.

A future functional test could follow a flow such as:

```text
Open Application
      ↓
Sign In
      ↓
Create Task
      ↓
Check Task Appears
      ↓
Delete Task
      ↓
Check Task Disappears
```

For the current version, the Test workflow is focused on code quality, TypeScript, Prisma preparation, and the production build.

---

## Release Workflow

The third workflow is:

```text
.github/workflows/release.yml
```

The Release workflow is responsible for deploying the application to Vercel.

It is connected to the Test workflow using `workflow_run`.

The intended flow is:

```text
Build
  ↓
Test
  ↓
Test Successful
  ↓
Release
  ↓
Vercel Production
```

The workflow is also restricted to the `main` branch.

This means that a feature branch can go through the Build and Test stages without automatically deploying that branch to production.

The workflow uses:

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

      - name: Install Vercel CLI
        run: npm install --global vercel

      - name: Deploy to Vercel
        run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Release Conditions

The Release workflow has two important conditions.

First, the Test workflow must complete successfully.

Second, the workflow must be associated with the `main` branch.

This keeps production deployment separate from normal feature branch development.

The intended process is:

```text
Feature Branch
      ↓
Pull Request
      ↓
Build
      ↓
Test
      ↓
Merge to Main
      ↓
Release
      ↓
Production
```

---

## Vercel Deployment

The Release workflow uses the Vercel CLI to deploy the application.

The deployment command is:

```bash
vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

The `--prod` option is used to deploy to the production environment.

The Vercel authentication token is stored as a GitHub repository secret instead of being placed directly inside the workflow file.

This keeps the deployment token out of the source code.

---

## GitHub Repository Secrets

The GitHub Actions workflows require some values that should not be committed to the repository.

These values are stored using GitHub repository secrets.

The main secrets used by the workflows are:

```text
DATABASE_URL
VERCEL_TOKEN
```

### DATABASE_URL

`DATABASE_URL` contains the PostgreSQL connection string used by Prisma.

The secret name is:

```text
DATABASE_URL
```

The secret value should contain only the actual PostgreSQL connection URL.

It should not include:

```text
DATABASE_URL=
```

and it should not include the quotation marks from the `.env.local` file.

### VERCEL_TOKEN

`VERCEL_TOKEN` contains the authentication token used by the Vercel CLI.

GitHub Actions uses this token when running the production deployment command.

The token is kept inside GitHub Secrets instead of being written into `release.yml`.

---

## Environment Variables

The project uses environment variables for configuration and sensitive values.

Local development uses:

```text
.env.local
```

GitHub Actions uses:

```text
GitHub Repository Secrets
```

Vercel uses:

```text
Vercel Environment Variables
```

This keeps sensitive configuration separate from the application source code.

Values such as database credentials, Google OAuth credentials, and deployment tokens should never be committed to GitHub.

---

## Git & GitHub Workflow

Git was used throughout the project to keep track of changes and work with different versions of the code.

The project repository is hosted on GitHub:

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

The general workflow is:

```text
Make Changes
      ↓
Test Locally
      ↓
Git Add
      ↓
Git Commit
      ↓
Git Push
      ↓
GitHub
```

For larger changes, a separate branch can be created instead of making the changes directly on `main`.

---

## Branches

Branches allow changes to be developed separately from the main branch.

For the CI/CD work, a separate branch was used:

```text
test-build-workflow
```

The workflow changes were pushed to GitHub and then used to create a pull request into `main`.

This allowed the GitHub Actions workflows to be tested before the changes were merged into the main branch.

---

## Pull Requests

Pull requests were used to review and test changes before merging them into `main`.

The general process was:

```text
Create Feature Branch
        ↓
Make Changes
        ↓
Push Branch
        ↓
Open Pull Request
        ↓
Build Workflow
        ↓
Test Workflow
        ↓
Review
        ↓
Merge
```

The Build workflow is triggered when the pull request targets the `main` branch.

This makes the pull request an important part of the CI/CD process.

---

## CI/CD Workflow Testing

The CI/CD pipeline itself needed to be tested after the workflows were created.

The first step was creating a separate branch and opening a pull request into `main`.

The Build workflow initially failed because it was using an older Prisma command:

```bash
npx prisma generate
```

The version of Prisma used in the project does not provide that command.

The workflow was changed to:

```bash
npx prisma contract emit
```

After making this change, the workflow was able to move further through the build process.

---

## Database Configuration Issue

Another issue occurred because GitHub Actions does not automatically have access to the local `.env.local` file.

The local computer had the database connection available, but the GitHub Actions runner did not.

This caused the build to fail because the PostgreSQL database configuration was missing.

The solution was to add the database connection string as a GitHub repository secret:

```text
DATABASE_URL
```

The Build and Test workflows then make the secret available through:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## Invalid Database URL Issue

After adding the database secret, another issue appeared.

The entire `.env.local` line had initially been copied into the GitHub secret:

```text
DATABASE_URL="..."
```

This caused the database URL to be interpreted incorrectly.

The secret was corrected so that the name was:

```text
DATABASE_URL
```

and the value contained only the actual PostgreSQL connection string.

After correcting the secret, the Build workflow completed successfully.

This was a useful example of how environment variables need to be configured correctly when moving from local development to a CI environment.

---

## Build Workflow Result

After fixing the Prisma command and database configuration, the Build workflow successfully completed.

The successful build confirmed that:

* Dependencies could be installed
* Prisma could be prepared
* The database URL was available
* The Next.js application could compile
* TypeScript could complete successfully during the build
* The application routes could be generated

This allowed the CI/CD process to continue to the Test stage.

---

## Test Workflow Result

After the Build workflow was working, the Test workflow was added.

The Test workflow waits for the Build workflow to complete successfully.

It then performs the configured checks:

```text
Prisma Contract
      ↓
ESLint
      ↓
TypeScript
      ↓
Production Build
```

The Test workflow was successfully executed after it was added to the repository.

---

## Release Workflow Setup

The Release workflow was added after the Build and Test workflows were working.

A Vercel token was created and stored in GitHub as:

```text
VERCEL_TOKEN
```

The Release workflow uses this token to authenticate with Vercel.

The release job is restricted to the `main` branch so that production deployment is not triggered from an ordinary feature branch.

---

## Vercel Preview vs Production

The project also uses Vercel's GitHub integration.

When a pull request is opened, Vercel can create a preview deployment.

A preview deployment is different from the production deployment handled by the Release workflow.

The general difference is:

```text
Pull Request
      ↓
Vercel Preview
```

and:

```text
Main Branch
      ↓
Release Workflow
      ↓
Vercel Production
```

The CI/CD Release workflow is specifically intended for the production deployment stage.

---

## Debugging & Error Fixes

A significant part of building the project was fixing issues that appeared during development.

Some of the problems encountered included:

* Prisma CLI command differences
* Missing environment variables
* Invalid database URL configuration
* GitHub Actions environment configuration
* Google OAuth callback configuration
* Vercel deployment configuration
* Pull request workflow setup
* CI/CD workflow dependencies

These issues helped make the project more practical because they showed how the application behaves outside the local development environment.

---

## Google OAuth Redirect Configuration

During deployment, Google OAuth required the correct production callback URL.

The callback URL needs to point to the deployed application:

```text
https://your-domain.com/api/auth/callback/google
```

If the callback URL configured in Google does not match the URL being used by the application, Google can reject the authentication request.

The correct Vercel production URL therefore needs to be added to the Google OAuth client's authorized redirect URIs.

After configuring the correct callback URL, Google sign-in worked successfully on the deployed application.

---

## Local Testing

Before pushing changes to GitHub, the application can be tested locally.

The development server can be started with:

```bash
npm run dev
```

The production build can be tested with:

```bash
npm run build
```

Linting can be checked with:

```bash
npm run lint
```

TypeScript can be checked with:

```bash
npx tsc --noEmit
```

The Prisma contract can be emitted with:

```bash
npx prisma contract emit
```

Running these commands locally helps catch problems before pushing changes to GitHub.

---

## Multiple Account Testing

The application is designed around user-specific tasks.

This means that different Google accounts should have separate task lists.

For example:

```text
Account A
    ↓
Task A1
Task A2
```

and:

```text
Account B
    ↓
Task B1
Task B2
```

Account A should not see Account B's tasks.

This separation is handled through the authenticated user's ID and the relationship between the `User` and `Task` records in the database.

---

## Task IDs

Each task has its own database ID.

The task ID is a global database identifier and is not simply the number of tasks belonging to a particular user.

For example, a user could see:

```text
Task #18
```

even if they only have one task.

This can happen because IDs 1 through 17 may have already been used by other task records.

The actual number of tasks belonging to the current user is calculated separately by the application.

---

## API Routes

The application uses Next.js API routes to communicate between the frontend and the database.

The task API handles operations such as:

```text
GET
↓
Get the current user's tasks

POST
↓
Create a new task

DELETE
↓
Delete a task
```

The API uses the authenticated session to determine which user's data should be accessed.

This means that the frontend does not simply request every task in the database.

Instead, the server identifies the current user and works with that user's tasks.

---

## Task Creation

When a user enters a task and submits it, the frontend sends the information to the task API.

The API checks the current session before creating the task.

The new task is then saved to PostgreSQL and associated with the user's ID.

The task can then be displayed in the dashboard.

The general flow is:

```text
User enters task
      ↓
Frontend sends request
      ↓
API checks session
      ↓
Task is created
      ↓
PostgreSQL stores task
      ↓
Task appears in dashboard
```

---

## Task Deletion

Deleting a task follows a similar process.

The user selects the delete option for a task.

The frontend sends a delete request to the API.

The API identifies the task and verifies the current session before removing it.

The task is then deleted from the database and removed from the displayed list.

The general flow is:

```text
User selects Delete
      ↓
Frontend sends request
      ↓
API checks session
      ↓
Task is deleted
      ↓
Database is updated
      ↓
Task disappears from dashboard
```

---

## Persistent Storage

One of the main differences between a simple frontend-only task list and this project is persistent storage.

The tasks are not only kept in the browser.

They are stored in PostgreSQL.

This means that after signing out and later signing back in with the same Google account, the user's previously created tasks can still be retrieved from the database.

The flow is:

```text
Create Task
      ↓
PostgreSQL
      ↓
Sign Out
      ↓
Sign In Again
      ↓
Retrieve Tasks
```

---

## Dark Dashboard

The application uses a dark dashboard design.

The interface was kept relatively simple so that the main purpose of the application remains clear.

The dashboard focuses on:

* The signed-in user
* The task input
* The current task count
* The task list
* Delete controls
* Sign-out functionality

The goal was not to make the interface overly complicated, but to create something that is comfortable to use while still looking modern.

---

## Production Build

The production build uses:

```bash
npm run build
```

The build process checks that the Next.js application can compile successfully.

During development of the CI/CD pipeline, the production build became an important part of the automated checks.

The Build workflow runs it as the main build stage.

The Test workflow also runs the build after its other checks.

This gives the project multiple points where a build failure can be detected before production deployment.

---

## Dependencies

The project uses npm to manage its dependencies.

Dependencies are installed locally using:

```bash
npm install
```

GitHub Actions uses:

```bash
npm ci
```

`npm ci` is useful in CI environments because it installs the dependencies from the lockfile in a clean and repeatable way.

The project uses Node.js 24 as its development and CI environment.

---

## Why Separate Workflows Were Used

The CI/CD pipeline could have been placed into one large workflow, but the project uses three separate workflow files.

This makes the stages easier to understand:

```text
build.yml
    ↓
test.yml
    ↓
release.yml
```

Each workflow has a specific responsibility.

### Build

Checks whether the application can build.

### Test

Runs the configured checks after a successful build.

### Release

Deploys to production after the Test stage succeeds and the code is on the main branch.

This structure also makes it easier to identify which stage has failed.

---

## Workflow Dependencies

The workflows are connected using `workflow_run`.

The Test workflow listens for the Build workflow:

```yaml
on:
  workflow_run:
    workflows:
      - Build
    types:
      - completed
```

The Test job then checks whether the Build workflow completed successfully.

The Release workflow listens for the Test workflow:

```yaml
on:
  workflow_run:
    workflows:
      - Test
    types:
      - completed
```

The Release job checks both the workflow result and the branch.

This creates the dependency:

```text
Build
  ↓
must succeed
  ↓
Test
  ↓
must succeed
  ↓
Release
```

---

## Why CI/CD Is Useful

Without CI/CD, a typical process could look like:

```text
Write Code
   ↓
Push Code
   ↓
Remember to Test
   ↓
Remember to Build
   ↓
Deploy Manually
```

With the workflow in place, the process becomes more structured:

```text
Write Code
   ↓
Pull Request
   ↓
Automatic Build
   ↓
Automatic Checks
   ↓
Merge
   ↓
Production Release
```

This reduces the number of manual steps involved in checking and releasing the application.

It also provides a record of whether the automated checks passed or failed.

---

## CI/CD Concepts Used

While setting up the project, I also worked with several concepts related to CI/CD.

### Continuous Integration

Continuous Integration is the practice of regularly integrating code changes and automatically checking them.

In this project, pull requests trigger the Build workflow.

### Continuous Delivery

Continuous Delivery means keeping the application in a state where it can be released after passing the required checks.

The Build and Test stages help verify that the application is ready for release.

### Continuous Deployment

Continuous Deployment takes the process one step further by automatically deploying changes after the required checks succeed.

The Release workflow is designed around this idea for the production deployment.

### Continuous Development

Continuous Development focuses on the ongoing process of developing, improving, testing, and updating an application.

The project follows this general cycle as new features and fixes are added.

---

## CI/CD Pipeline Summary

The complete pipeline can be summarized as:

```text
Developer
    ↓
Makes Changes
    ↓
Pushes Feature Branch
    ↓
Opens Pull Request
    ↓
Build Workflow
    ↓
Application Builds Successfully
    ↓
Test Workflow
    ↓
Checks Pass
    ↓
Pull Request Merged
    ↓
Main Branch
    ↓
Release Workflow
    ↓
Vercel Production
```

This gives the project a clear path from development to production.

---

## Lessons From Debugging

The CI/CD setup also showed that a project that works locally can still fail in a CI environment.

Local development had access to:

```text
.env.local
```

while GitHub Actions did not.

This meant that environment variables needed to be configured separately.

Similarly, commands available in one version of a tool may not be available in another version.

The Prisma command issue was an example of this.

These problems made it clear that understanding the actual tools and versions being used is important when building automated workflows.

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
* Using environment variables
* Using Git and GitHub for version control
* Working with branches and pull requests
* Understanding GitHub Actions
* Creating workflow files using YAML
* Understanding workflow triggers
* Working with jobs and steps
* Using GitHub Actions runners
* Using `uses` steps
* Using `run` commands
* Building a CI/CD pipeline
* Separating Build, Test, and Release stages
* Using GitHub repository secrets
* Connecting GitHub Actions with Vercel
* Building and testing a production application
* Deploying the project through Vercel

The project also went through a number of debugging and deployment issues along the way, which made the development process a useful part of the learning experience.

---

## Current Status

The application is currently functional and supports the complete basic task-management flow:

**Sign in → Create tasks → View tasks → Delete tasks → Sign out → Sign back in**

Tasks are persisted in PostgreSQL and remain associated with the account that created them.

The application is deployed through Vercel and uses Neon for PostgreSQL storage.

The GitHub repository also contains the CI/CD workflow files for:

```text
Build
Test
Release
```

The Build workflow checks pull requests, the Test workflow runs after a successful Build workflow, and the Release workflow is configured to deploy the main branch to Vercel after the required checks succeed.

---

## Future Improvements

There are still several areas that could be expanded in the future.

Some possible improvements include:

* Edit existing tasks
* Mark tasks as completed
* Add task due dates
* Add task priorities
* Add categories
* Add search and filtering
* Improve mobile responsiveness
* Add more detailed automated functional tests
* Add browser-based testing with Playwright
* Add stronger error handling
* Add loading states
* Add better empty-state messages
* Add more detailed task information
* Add additional authentication providers
* Improve the CI/CD test stage

The current version focuses on getting the core task-management functionality and deployment pipeline working first.

---

## Repository

The project is available on GitHub:

```text
https://github.com/Ahmed-31-Anwar/task-manager
```

The repository contains the application source code, configuration files, Prisma setup, and GitHub Actions workflows used by the project.

---

## Author

**Ahmed Anwar**

This project was built as a practical full-stack web development project and is part of my ongoing learning and development in software engineering.

[GitHub](https://github.com/Ahmed-31-Anwar)