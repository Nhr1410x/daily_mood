---
name: import-validator
description: Parses, validates, previews, migrates, and imports quiz and exam data from JSON and YAML files.
---

# Import Validator

## Goal
Provide a safe and user-friendly JSON/YAML import pipeline.

## Pipeline
1. Read file
2. Detect format
3. Parse
4. Validate
5. Normalize
6. Preview
7. Confirm
8. Persist

## Never
- silently ignore fields
- silently fix invalid data
- persist invalid data
- execute imported content

## Validation
Use Zod. Return structured errors containing path, field, and message.

## YAML
Reject malformed YAML clearly.

## Duplicate IDs
Detect duplicates before persistence.

## Schema Version
Inspect `schemaVersion`. If unsupported, explain supported versions.

## Tests
Test valid and invalid JSON, YAML, schema, duplicates, missing fields, wrong question types, and wrong answer counts.
