
# Task Manager — Pull Request Review Policy

## 1. PR Summary
Explain what changed in this pull request, why it changed,
and which important files were affected.

## 2. Code Quality
Check for bugs, incorrect logic, duplicated code, missing
error handling, and regressions.

## 3. Security Review
Check:
- Authentication and authorisation.
- Whether users can access another user's tasks.
- Input validation and unsafe database queries.
- Cross-site scripting and other injection risks.
- Exposed credentials, tokens and environment variables.
- Dependency vulnerabilities.
- GitHub Actions permissions and unsafe workflow changes.

## 4. Findings
For every actionable finding, report:

- Severity: Critical, High, Medium or Low.
- File and line number, when available.
- What happened in this PR.
- Why it is a problem.
- The potential impact.
- A recommended fix.

Only report findings supported by code or other available evidence.
Do not invent vulnerabilities or exaggerate uncertain risks.

## 5. Test Results
Report the actual status of relevant checks:
- Build
- Lint and TypeScript
- Vitest
- Playwright
- Security checks

Use Passed, Failed, Skipped or Not Run.
Never claim a test passed if it was not executed.

## 6. Merge Recommendation
Choose one recommendation:

DO NOT MERGE:
A confirmed serious issue or required check failure violates
the project's merge policy.

NEEDS HUMAN REVIEW:
Important uncertainty or an unresolved concern requires
human investigation.

NO BLOCKERS FOUND:
No blocking issue was identified in the available evidence.
This does not guarantee that the code is secure.

## 7. Final Review Comment
Provide a concise summary containing:
1. What happened in this PR.
2. The most important findings.
3. Security concerns.
4. Actual test results.
5. The merge recommendation and its reasoning.

Every completed review must provide a visible summary on the
GitHub pull request when the review tool supports it.
