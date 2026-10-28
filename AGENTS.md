
# AGENTS.md — Task Manager

## Project Overview
This project is a task management application built with
Next.js, React, TypeScript, NextAuth.js, Prisma and PostgreSQL.

Users authenticate with Google and should only be able to
access their own tasks.

## Review Requirements
Before reviewing a pull request, read REVIEW.md.

Review the actual code changes and their impact on the
existing application.

Check for:
- Bugs and incorrect application behaviour.
- Authentication and authorisation vulnerabilities.
- Users accessing another user's tasks or data.
- SQL injection, cross-site scripting and unsafe input handling.
- Exposed secrets and unsafe environment configuration.
- Dependency vulnerabilities.
- Missing tests and regressions.
- GitHub Actions and deployment security problems.

## Evidence
For each finding, include:
- Severity: Critical, High, Medium or Low.
- File and line number when available.
- What happened and why it matters.
- A realistic impact or example.
- A recommended fix.

Do not invent findings, test results or evidence.
Clearly distinguish confirmed issues from potential risks.

## Merge Recommendation
Every completed review should recommend one of:

- DO NOT MERGE
- NEEDS HUMAN REVIEW
- NO BLOCKERS FOUND

Explain the evidence behind the recommendation.

An AI review is not proof that code is secure. Required CI
checks and human approvals must still be respected.
