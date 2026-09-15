---
name: content-renderer
description: Implements safe rendering of Markdown, mathematics, code, chemical notation, tables, and images inside quiz questions and answers.
---

# Technical Content Renderer

## Goal
Render rich educational content safely and consistently.

## Supported Content
- Markdown
- LaTeX
- code
- tables
- images
- scientific notation

## Mathematics
Use KaTeX or MathJax. Support inline and block expressions.

## Code
Use syntax highlighting. Never execute code.

## Security
Sanitize HTML. Block script tags, javascript URLs, event handlers, and unsafe embeds.

## Images
Support relative paths, local assets, and approved remote URLs. Images must be responsive.

## Dark Mode
Ensure formulas and code blocks remain readable in both themes.

## Tests
Test Markdown, inline math, block math, C++, Python, tables, images, and malicious HTML.
