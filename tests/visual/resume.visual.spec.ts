import path from 'path';
import { test, expect } from '../../fixtures/pageFixtures';
import { EXPECTED_TITLE, RESUME_SECTIONS, VIEWPORTS, ViewportName } from '../../test-data/resumeData';

const SCREENSHOT_OPTIONS = {
  animations: 'disabled',
  caret: 'hide',
  // Hides run-to-run content (typing effect, clock, year) and pins fixed decorative layers.
  stylePath: path.join(__dirname, 'hide-dynamic.css'),
  // Full-page captures are ~20,000px tall; comparing consecutive frames needs more than the 5s default.
  timeout: 20_000,
} as const;

// Reduced motion makes the site skip its scroll-reveal and smooth-scroll effects;
// a fixed colour scheme keeps the theme independent of the host OS.
test.use({ reducedMotion: 'reduce', colorScheme: 'light' });
test.describe.configure({ timeout: 60_000 });

test.describe('MyResume - Visual Regression', { tag: '@visual' }, () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test.beforeEach(async ({ page, resumePage }) => {
    await resumePage.openForVisualTest();
    await expect(page).toHaveTitle(EXPECTED_TITLE);
  });

  test('full page matches baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot('resume-full-page.png', { ...SCREENSHOT_OPTIONS, fullPage: true });
  });

  test('above-the-fold hero matches baseline', async ({ page, resumePage }) => {
    // The animated name is hidden from the screenshot, so assert its presence functionally.
    await expect(resumePage.heroHeading).toBeVisible();
    await expect(page).toHaveScreenshot('resume-above-the-fold.png', SCREENSHOT_OPTIONS);
  });

  test('side navigation header matches baseline', async ({ resumePage }) => {
    await expect(resumePage.header).toHaveScreenshot('resume-header.png', SCREENSHOT_OPTIONS);
  });

  for (const sectionName of RESUME_SECTIONS) {
    test(`"${sectionName}" section matches baseline`, async ({ resumePage }) => {
      await resumePage.goToSection(sectionName);

      await expect(resumePage.section(sectionName)).toHaveScreenshot(
        `section-${sectionName}.png`,
        SCREENSHOT_OPTIONS,
      );
    });
  }

  test('footer matches baseline', async ({ resumePage }) => {
    await resumePage.footer.scrollIntoViewIfNeeded();

    await expect(resumePage.footer).toHaveScreenshot('resume-footer.png', SCREENSHOT_OPTIONS);
  });
});

test.describe('MyResume - Responsive Visual Regression', { tag: '@visual' }, () => {
  const responsiveViewports: ViewportName[] = ['tablet', 'mobile'];

  for (const viewportName of responsiveViewports) {
    test.describe(`${viewportName} viewport`, () => {
      test.use({ viewport: VIEWPORTS[viewportName] });

      test('full page matches baseline', async ({ page, resumePage }) => {
        await resumePage.openForVisualTest();

        await expect(page).toHaveScreenshot(`resume-full-page-${viewportName}.png`, {
          ...SCREENSHOT_OPTIONS,
          fullPage: true,
        });
      });
    });
  }
});
