# Task Manager — Pull Request Review Policy

## 1. Purpose

This document defines the standard for reviewing every pull request in the Task Manager project.

All AI code review agents must follow this policy alongside `AGENTS.md`. The goal is to identify genuine bugs, security vulnerabilities, regressions, and maintainability problems while avoiding unsupported findings and unnecessary review comments.

These instructions apply to application code, tests, database schemas and migrations, configuration files, documentation, dependencies, deployment settings, and GitHub Actions workflows.

## 2. Pull Request Summary

Every review must explain:

- What changed in the pull request.
- Why the changes were made, when supported by evidence.
- Which important files or components were affected.
- How the changes may affect existing application behaviour.

Do not invent the author's intentions.

## 3. Code Quality and Correctness

Review the actual changes and their impact on the application.

Check for:

- Incorrect logic, bugs, and unexpected behaviour.
- Missing error handling and input validation.
- Duplicated code and unnecessary complexity.
- TypeScript errors and incorrect types.
- Missing tests and regressions.
- Incorrect environment configuration.
- Dependency, build, and deployment problems.

Prioritise actionable findings over stylistic preferences.

## 4. Security Review

Check for:

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

Distinguish confirmed vulnerabilities from potential risks.

## 5. Findings and Required Evidence

For every actionable finding, provide:

- Severity: Critical, High, Medium, or Low.
- File and line number, when available.
- Description of the problem and its cause.
- Realistic impact or example.
- Supporting evidence.
- Recommended fix.

Findings must be specific and supported by evidence. Do not invent vulnerabilities, test results, or affected code paths. Avoid duplicate findings and explain uncertainty clearly.

## 6. Severity Definitions

### Critical

A confirmed issue with severe consequences, such as a readily exploitable authentication bypass or widespread unauthorised access to sensitive data.

**Merge impact:** Block merging until fixed and verified.

### High

A confirmed issue that could cause significant security, data-integrity, availability, or core application failures under realistic conditions.

**Merge impact:** Block merging until fixed and verified.

### Medium

A meaningful defect, security weakness, or reliability problem with a more limited impact or narrower conditions.

**Merge impact:** Normally requires human review and a documented decision. Block merging if a mandatory project requirement is violated.

### Low

A minor defect, maintainability issue, or improvement with limited impact.

**Merge impact:** Does not automatically block merging. A maintainer may accept it or schedule a follow-up.

Severity must reflect actual impact and evidence, not merely the file type or an AI agent's confidence.

## 7. Test and Validation Reporting

Report the actual status of applicable checks:

- Build.
- Lint.
- TypeScript validation.
- Vitest.
- Playwright.
- Security and dependency checks.
- Database schema and migration validation, when relevant.

Use these statuses:

- **Passed:** The check was executed and succeeded.
- **Failed:** The check was executed and failed.
- **Skipped:** The check was intentionally skipped or was not applicable.
- **Not Run:** The check was not executed or its result could not be verified.

Never claim that a check passed without verified results. Distinguish automated results from assumptions and manual inspection.

## 8. Merge Recommendations

Every completed review must select exactly one recommendation.

### DO NOT MERGE

Use when a confirmed Critical or High issue remains unresolved, a mandatory requirement is violated, or a required check has failed.

Explain the blocking issue and what must happen before merging.

### NEEDS HUMAN REVIEW

Use when important uncertainty remains, a Medium finding requires a maintainer's decision, or necessary evidence or test results are missing.

Explain the concern and the next action required.

### NO BLOCKERS FOUND

Use when no unresolved blocking issues were identified in the available evidence and required checks have acceptable, verified results.

This does not guarantee that the code is bug-free or secure. It does not override branch protection, required CI checks, or human approval requirements.

Low-severity findings may remain open when they do not violate mandatory requirements and the maintainer accepts the remaining risk.

## 9. Repository-Specific Review Coverage

Apply relevant checks to all changed files, not only paths explicitly listed in an AI review configuration.

- `src/**`: Application logic, authentication, authorisation, user-data isolation, validation, and error handling.
- `tests/**` and `e2e/**`: Test correctness, coverage, reliability, and intended behaviour.
- `prisma/**`, `migrations/**`, and `prisma.config.ts`: Database integrity, migration safety, configuration, and access isolation.
- `.github/workflows/**`: Permissions, secrets, untrusted input, workflow execution, and supply-chain security.
- Root configuration files, dependencies, and deployment settings: Build correctness, environment handling, dependency risks, and production safety.
- Documentation and other files: Accuracy and consistency with the implementation and project policy.

All applicable changes must follow the common evidence, severity, testing, and merge recommendation requirements in this document.

## 10. Final Review Comment

Every completed review should provide a concise, visible summary on the GitHub pull request when the review tool supports it.

The summary must include:

1. What happened in the pull request.
2. The most important findings and their severities.
3. Security concerns and relevant uncertainty.
4. Actual test and validation results.
5. The merge recommendation and its reasoning.

If no issues are found, state that no blockers were identified in the available evidence rather than claiming the code is completely secure.

## 11. Human Oversight

AI review agents assist with code review but cannot guarantee correctness or security.

Maintainers remain responsible for validating findings, resolving disagreements between agents, evaluating accepted risks, and making the final merge decision.

Required CI checks, branch protection rules, and human approvals must always be respected. AI-generated approvals must not replace mandatory human review.
