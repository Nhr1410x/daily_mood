# Technical Content Rendering Rules

Questions can contain Markdown, LaTeX mathematics, inline code, code blocks, chemical formulas, images, and tables.

## Mathematics
Use KaTeX or MathJax. Support inline `$...$` and block `$$...$$`. Never expose raw LaTeX when it can be rendered.

## Code
Use syntax highlighting. Support at minimum C, C++, Python, Java, JavaScript, TypeScript, SQL, HTML, CSS, and Bash. Code is display-only and must never execute. Use horizontal scrolling for long lines.

## Images
Images must be responsive, preserve aspect ratio, have alt text, avoid overflow, and support local/remote sources according to the security policy.

## Tables
Tables must remain usable on small screens. Provide horizontal scrolling when wider than the viewport.

## Chemical Notation
Support scientific notation such as H₂O, H₂SO₄, CaCO₃, and NaOH without corrupting subscripts/superscripts. Design the renderer to support richer chemistry notation later.

## Security
Imported content is untrusted. Never execute script tags, javascript URLs, inline event handlers, or arbitrary embedded JavaScript. Sanitize before rendering.
