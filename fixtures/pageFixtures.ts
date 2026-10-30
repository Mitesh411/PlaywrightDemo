import { test as base } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';

type PageFixtures = {
  resumePage: ResumePage;
};

/** Extends Playwright's `test` so specs receive ready-made page objects. */
export const test = base.extend<PageFixtures>({
  resumePage: async ({ page }, use) => {
    await use(new ResumePage(page));
  },
});

export { expect } from '@playwright/test';
