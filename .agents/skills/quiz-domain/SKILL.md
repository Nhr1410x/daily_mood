---
name: quiz-domain
description: Designs and implements quiz, exam, question, answer, scoring, attempt, and result domain logic for the quiz platform.
---

# Quiz Domain Skill

## Goal
Implement quiz-domain functionality with strong TypeScript types and isolated business logic.

## Responsibilities
Handle Exam, Question, Option, ExamAttempt, Answer, Result, scoring, and question status.

## Rules
Business logic must not live directly inside React UI components. Use pure functions for calculations whenever possible.

Examples:
- calculateExamScore()
- calculateQuestionScore()
- getQuestionStatus()
- calculateProgress()

## Question Status
Supported states:
- unanswered
- answered
- marked
- current

A question may be answered and marked simultaneously. Do not model these as mutually exclusive states.

## Attempt
Persist examId, attemptId, currentQuestionId, answers, markedQuestions, startedAt, lastSavedAt, and status.

## Immutability
Historical submitted attempts must not change when the exam definition changes.

## Verification
Add unit tests for all scoring and status functions.
