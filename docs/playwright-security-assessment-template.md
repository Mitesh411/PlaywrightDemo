# Microsoft Playwright Security-Focused Application Testing Template

## Scope
- Automated browser-driven security validation
- Authentication and session security testing
- Client-side and API attack surface analysis
- DAST-style dynamic validation
- OWASP Top 10 and OWASP ASVS mapping

## Execution Prerequisites
- Set `SECURITY_BASE_URL` environment variable to the target app.
- Optionally set `SESSION_COOKIE_NAME` for cookie-hardening checks.
- Run suite on Chromium, Firefox, and WebKit.

## Recommended Commands
```bash
npx playwright test tests/security --project=chromium
npx playwright test tests/security --project=firefox
npx playwright test tests/security --project=webkit
```

## Delivered Security Suites
- `tests/security/auth-session-security.spec.ts`
  - Protected route access checks
  - Session cookie hardening checks
  - LocalStorage tampering checks
- `tests/security/headers-and-injection.spec.ts`
  - Security headers validation
  - Reflected XSS probing flow
  - IDOR access probing flow

## Vulnerability Reporting Format
- Test Case
- Severity
- OWASP Top 10 Category
- OWASP ASVS Control
- CWE ID
- Reproduction Steps
- Playwright PoC
- Remediation Guidance
- Regression Test

## CI/CD Security Integration Guidance
- Fail builds on:
  - Critical authz bypass findings
  - Missing required security headers
  - Token/cookie exposure findings
- Publish artifacts:
  - Playwright traces
  - Screenshots/videos
  - Network logs

## Security Scorecard Rubric (1-10)
- Authentication Security
- Authorization Security
- Session Security
- Browser Security
- API Security
- Client-Side Security
- Dependency Security
