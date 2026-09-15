# Security Rules

Treat every imported file and rendered content as untrusted.

Never:
- use `eval()`
- execute imported code
- execute JavaScript from Markdown
- render arbitrary unsanitized HTML
- trust imported URLs
- expose internal stack traces to users

Protect against XSS, malicious HTML, javascript URLs, dangerous attributes, oversized files, malformed YAML, and malformed JSON.

Validate file extension, MIME type when available, file size, schema, and referenced media.

Code examples in questions are DATA only. They must never become executable application code.
