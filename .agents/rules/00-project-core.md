# Project Core Rules

## Purpose
These rules apply to the entire quiz platform.

## Architecture
- Use TypeScript.
- Prefer strict typing.
- Never use `any` for domain models.
- Keep business logic separate from UI.
- Keep components focused and composable.
- Prefer reusable abstractions over duplicated logic.
- Do not introduce unnecessary dependencies.

## Existing Code
Before changing code:
1. Inspect the current implementation.
2. Reuse existing components when appropriate.
3. Do not rewrite the entire application without a clear reason.
4. Do not delete working functionality without justification.

## Data
- Validate imported data.
- Never trust user-provided files.
- Never silently discard invalid data.
- Preserve schemaVersion.
- Keep historical exam attempts immutable.

## UI
- Support light, dark, and system themes.
- Responsive behavior must be intentionally designed for mobile.
- Do not rely only on color to communicate state.
- All interactive elements must be keyboard accessible.

## Quality
Before considering a feature complete:
- run TypeScript checks
- run lint
- run relevant tests
- manually inspect affected UI
- check light mode
- check dark mode
- check mobile layout
- check error states

## Agent Behavior
Do not claim that a feature works unless it has been tested.
Do not hide errors.
When a requirement is ambiguous, choose the simplest architecture that preserves future extensibility.
Prefer correctness and maintainability over speed of implementation.
