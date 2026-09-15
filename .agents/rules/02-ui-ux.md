# UI / UX Rules

## Visual Direction
The product should feel modern, clean, professional, educational, technical, and calm.

Avoid excessive gradients, visual clutter, excessive glassmorphism, giant decorative elements, and unnecessary animations.

## Layout
Use consistent spacing and typography. Prefer cards, panels, drawers, and sheets for structured content.

## Exam Screen
Desktop must prioritize:
- LEFT: question navigation
- CENTER: question content and answers
- RIGHT: progress, timer, statistics, and actions

Mobile:
- question navigator becomes a drawer
- right control panel becomes a drawer or bottom sheet
- answer cards become full width

## Answer UX
The complete answer card should be clickable. Selected answers need a strong visual state. Correctness must not be revealed during an active exam unless configured.

## Accessibility
Every interactive element needs keyboard support, visible focus, and a meaningful label. Do not communicate important state through color alone.

## Dark Mode
Do not implement dark mode using simple inversion. Every semantic color must have a dark-mode equivalent. Code blocks, formulas, tables, and images must remain readable.

## Responsive
Intentionally design for mobile. Check widths around 320px, 375px, 768px, 1024px, and desktop.

## Motion
Animations must be subtle. Respect `prefers-reduced-motion`.
