import { APIRequestContext, BrowserContext, Page, expect } from '@playwright/test';

export const DEFAULT_SECURITY_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
] as const;

export async function assertSecurityHeaders(request: APIRequestContext, url: string): Promise<void> {
  const response = await request.get(url);
  const headers = response.headers();

  for (const header of DEFAULT_SECURITY_HEADERS) {
    expect(headers[header], `Missing required security header: ${header}`).toBeDefined();
  }
}

export async function assertUnauthorizedRedirectToLogin(page: Page, protectedPath: string): Promise<void> {
  await page.goto(protectedPath);
  await expect(page).toHaveURL(/login|signin|auth/i);
}

export async function tamperLocalStorage(page: Page, key: string, value: string): Promise<void> {
  await page.evaluate(
    ([storageKey, storageValue]) => {
      localStorage.setItem(storageKey, storageValue);
    },
    [key, value],
  );
}

export async function getCookieFlags(context: BrowserContext, cookieName: string): Promise<Record<string, unknown> | undefined> {
  const cookies = await context.cookies();
  return cookies.find((cookie) => cookie.name === cookieName);
}

export async function assertCookieIsHardened(context: BrowserContext, cookieName: string): Promise<void> {
  const cookie = await getCookieFlags(context, cookieName);
  expect(cookie, `Cookie ${cookieName} was not found`).toBeDefined();
  expect(cookie?.httpOnly, `Cookie ${cookieName} must be HttpOnly`).toBeTruthy();
  expect(cookie?.secure, `Cookie ${cookieName} must be Secure`).toBeTruthy();
}
