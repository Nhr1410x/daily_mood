# Data Schema Rules

## Schema
Every exam file must contain:
- `schemaVersion`
- `exam`

## Required Exam Fields
- `exam.id`
- `exam.title`
- `exam.questions`

## Question
Every question must contain `id`, `type`, `content`, and `options` when required.

## Question Types
Initial support:
- `single_choice`
- `multiple_choice`

Architecture must allow:
- `true_false`
- `short_answer`
- `fill_blank`
- `matching`
- `ordering`
- `code_output`
- `numerical_answer`

## Validation
`single_choice`: at least 2 options and exactly 1 correct answer.
`multiple_choice`: at least 2 options and at least 1 correct answer.
All IDs must be unique within scope. Do not silently repair invalid data. Errors must identify object, field/path, and problem.

## Versioning
Never remove `schemaVersion`. Future migrations must be explicit.

## Import
Pipeline: parse → validate → normalize → preview → user confirmation → persist. Never persist before validation.

## Export
Exported files must remain compatible with the same schema. Semantic round-trip must be preserved.
