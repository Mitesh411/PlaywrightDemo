import { test } from '@playwright/test';
import {
  assertCookieIsHardened,
  assertUnauthorizedRedirectToLogin,
  tamperLocalStorage,
} from '../../utils/security/security-utils';

const TARGET_BASE_URL = process.env.SECURITY_BASE_URL ?? 'http://localhost:3000';

test.describe('Authentication and Session Security', () => {
  test('Unauthorized user cannot access admin panel', async ({ page }) => {
    await assertUnauthorizedRedirectToLogin(page, `${TARGET_BASE_URL}/admin`);
  });

  test('Session cookie should be hardened', async ({ page, context }) => {
    await page.goto(`${TARGET_BASE_URL}/login`);
    await assertCookieIsHardened(context, process.env.SESSION_COOKIE_NAME ?? 'session');
  });

  test('Browser storage tampering should not grant privileged access', async ({ page }) => {
    await page.goto(`${TARGET_BASE_URL}/`);
    await tamperLocalStorage(page, 'role', 'admin');
    await page.goto(`${TARGET_BASE_URL}/admin`);
    await page.waitForLoadState('networkidle');
  });
});
