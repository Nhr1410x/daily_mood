---
name: test-quiz-flow
description: Creates and runs automated tests for quiz creation, import, exam attempts, navigation, persistence, submission, scoring, and result review.
---

# Quiz Flow Testing

## Goal
Protect critical learning and examination workflows.

## Main Scenario
1. Create/import exam
2. Open exam
3. Start attempt
4. Answer questions
5. Mark question
6. Navigate
7. Refresh
8. Resume
9. Submit
10. Verify score
11. Review incorrect answers

## Edge Cases
Test no answer, all answers, long question, malformed import, duplicate IDs, expired timer, refresh, and multiple submit attempts.

## Requirement
Tests must verify behavior, not implementation details.
