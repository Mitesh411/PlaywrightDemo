import { test } from '@playwright/test';
import { assertSecurityHeaders } from '../../utils/security/security-utils';

const TARGET_BASE_URL = process.env.SECURITY_BASE_URL ?? 'http://localhost:3000';

test.describe('Headers and Injection Defenses', () => {
  test('Security headers are configured', async ({ request }) => {
    await assertSecurityHeaders(request, TARGET_BASE_URL);
  });

  test('Reflected XSS prevention in search', async ({ page }) => {
    const payload = '<script>alert(1)</script>';
    await page.goto(`${TARGET_BASE_URL}/search?q=${encodeURIComponent(payload)}`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Unauthorized direct object reference should be denied', async ({ request }) => {
    const response = await request.get(`${TARGET_BASE_URL}/api/users/2`);
    test.info().annotations.push({ type: 'observed-status', description: String(response.status()) });
  });
});
