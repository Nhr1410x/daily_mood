# TypeScript Rules

- Use strict TypeScript configuration.
- Prefer explicit domain types and discriminated unions.
- Avoid `any`; use `unknown` at untrusted boundaries and validate before narrowing.
- Do not use non-null assertions unless unavoidable and justified.
- Keep API/domain types separate from UI-only types when useful.
- Prefer pure functions for business logic.
- Do not place grading, import, persistence, or timer logic directly inside React components.
- Export reusable types from dedicated modules.
- Use Zod schemas as runtime validation at file/API boundaries.
- Keep compiler and lint warnings at zero for completed work.
