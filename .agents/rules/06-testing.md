# Testing Rules

Every significant domain operation should have automated tests.

Test:
- schema validation
- JSON parsing
- YAML parsing
- import errors
- export
- score calculation
- question navigation
- answer state
- marked questions
- timer
- resume
- submit
- result calculation

Critical flows require end-to-end tests.

At minimum verify:
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

Do not remove tests simply to make CI pass. Fix root causes.
