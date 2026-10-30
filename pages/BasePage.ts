import { Page } from '@playwright/test';

/**
 * Common behaviour shared by every page object.
 * Holds helpers that make a page visually stable before a screenshot is taken.
 */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Waits for network activity and web fonts so text renders in its final typeface. */
  async waitForPageToSettle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.evaluate(() => document.fonts.ready);
    await this.relayoutFormControls();
  }

  /**
   * Chromium keeps fallback-font metrics on native form controls (notably <select>)
   * after a web font loads, until the next full relayout - which a full-page capture
   * triggers, changing the page height between consecutive screenshots.
   * Forcing that relayout up front makes the first capture final.
   */
  private async relayoutFormControls(): Promise<void> {
    await this.page.evaluate(() => {
      document.querySelectorAll<HTMLElement>('select, input, textarea').forEach((control) => {
        const { display } = control.style;
        control.style.display = 'none';
        void control.offsetHeight;
        control.style.display = display;
      });
    });
  }

  /** Waits until every image (including lazy ones already scrolled into view) has decoded. */
  async waitForImagesToLoad(): Promise<void> {
    await this.page.waitForFunction(() =>
      Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
    );
  }

  /** Parks the pointer at the right edge so no hover state leaks into a screenshot. */
  async moveMouseAway(): Promise<void> {
    const viewport = this.page.viewportSize();
    if (viewport) {
      await this.page.mouse.move(viewport.width - 1, viewport.height / 2);
    }
  }

  /**
   * Scrolls to the bottom and back so lazy-loaded images and scroll-triggered
   * reveal animations run before a full-page capture.
   */
  async scrollThroughPage(): Promise<void> {
    await this.page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      window.scrollTo(0, 0);
    });
    await this.waitForPageToSettle();
    await this.waitForImagesToLoad();
  }
}
