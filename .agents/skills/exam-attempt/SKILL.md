---
name: exam-attempt
description: Implements active exam sessions, question navigation, answer persistence, timers, resume, autosave, submission, and result transitions.
---

# Exam Attempt Skill

## Goal
Build reliable exam-taking behavior.

## Navigation
Support next, previous, direct question selection, and marked-question navigation.

## State
Persist answers, current question, marked questions, timer state, and timestamps.

## Timer
Timer must be timestamp-based. Never depend on decrementing UI counters as the source of truth.

## Resume
After refresh, restore the attempt.

## Submission
Submission must be idempotent. Do not submit an attempt twice.

## Expiration
Handle timed-out attempts safely.

## Verification
Test answer, navigation, mark, refresh, resume, expiration, and manual submit.
