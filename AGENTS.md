# AGENTS.md — Task Manager

## 1. Project Overview

This project is a task management application built with Next.js, React, TypeScript, NextAuth.js, Prisma, and PostgreSQL.

Users authenticate with Google and should only be able to access their own tasks and data.

## 2. Review Instructions

Before reviewing a pull request, read both `AGENTS.md` and `REVIEW.md`.

Apply the requirements in `REVIEW.md` to every changed file, including application code, tests, database schemas, migrations, configuration files, dependencies, documentation, deployment settings, and GitHub Actions workflows.

Review the actual changes and their impact on the existing application. Do not assume that unchanged code is correct if a changed file exposes a related problem.

## 3. Code Quality and Correctness

Check for:
- Bugs and incorrect application behaviour.
- Incorrect logic and unexpected edge cases.
- Missing error handling and input validation.
- TypeScript errors and incorrect types.
- Duplicated code and unnecessary complexity.
- Missing tests and regressions.
- Incorrect environment configuration.
- Dependency, build, and deployment problems.

Prioritise actionable findings over stylistic preferences.

## 4. Security Requirements

Pay particular attention to:
- Authentication bypasses and incorrect session handling.
- Missing server-side authorisation checks.
- Users accessing tasks or data belonging to other users.
- SQL injection, cross-site scripting, and unsafe input handling.
- Exposed credentials, tokens, API keys, and private environment variables.
- Dependency vulnerabilities supported by available evidence.
- Excessive GitHub Actions permissions.
- Unsafe execution of untrusted pull request code.
- Untrusted input passed to shell commands.
- Unsafe third-party workflow actions.

Recommend least-privilege permissions and secure handling of secrets.

## 5. Evidence and Severity

Follow the severity definitions, testing requirements, and merge recommendation rules in `REVIEW.md`.

For every actionable finding, include:
- Severity: Critical, High, Medium, or Low, using the definitions in `REVIEW.md`.
- File and line number, when available.
- A clear explanation of the problem and its cause.
- A realistic impact or example.
- Supporting evidence from the available code or checks.
- A recommended fix.

Do not invent findings, vulnerabilities, test results, or evidence.

Clearly distinguish confirmed issues from potential risks. Explain uncertainty, avoid duplicate findings, and do not exaggerate the impact of a problem.

## 6. Testing and Validation

Report only checks that were actually executed or whose results can be verified.

When relevant, consider:
- Build.
- Lint.
- TypeScript validation.
- Vitest.
- Playwright.
- Security and dependency checks.
- Database schema and migration validation.

Use the status definitions in `REVIEW.md`. Never claim a test passed if it was not run or its result cannot be verified.

## 7. Merge Recommendation

Every completed review must provide one of the recommendations defined in `REVIEW.md`:

- `DO NOT MERGE`
- `NEEDS HUMAN REVIEW`
- `NO BLOCKERS FOUND`

Explain the evidence behind the recommendation and identify any required follow-up actions.

Do not recommend merging solely because no AI agent found an issue. Respect mandatory CI checks, branch protection rules, and human approval requirements.

## 8. Final Review Summary

When the review tool supports a visible summary on the GitHub pull request, include:
- A summary of the changes.
- Important findings and their severities.
- Relevant security concerns and uncertainties.
- Actual test and validation results.
- The merge recommendation and its reasoning.

If no blockers are identified, state that no blockers were found in the available evidence. Do not claim that the application is completely bug-free or secure.

## 9. Human Oversight

AI review agents assist with code review but cannot guarantee correctness or security.

Maintainers remain responsible for validating findings, resolving disagreements between review agents, evaluating accepted risks, and making the final merge decision.

AI-generated approvals must not replace required human review.
