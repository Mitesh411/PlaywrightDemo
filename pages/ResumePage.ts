import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RESUME_URL, ResumeSection } from '../test-data/resumeData';

/** Page object for https://mitesh411.github.io/MyResume/ */
export class ResumePage extends BasePage {
  readonly header: Locator;
  readonly navbar: Locator;
  readonly heroHeading: Locator;
  readonly contactForm: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('#header');
    this.navbar = page.locator('#navbar');
    this.heroHeading = page.locator('#hero h1');
    this.contactForm = page.locator('#contact-form');
    this.footer = page.locator('footer.site-footer');
  }

  async open(): Promise<void> {
    await this.navigate(RESUME_URL);
    await this.waitForPageToSettle();
  }

  /** Opens the site and prepares it for a deterministic full-page screenshot. */
  async openForVisualTest(): Promise<void> {
    await this.open();
    await this.scrollThroughPage();
  }

  section(name: ResumeSection): Locator {
    return this.page.locator(`#${name}`);
  }

  navLink(name: ResumeSection): Locator {
    return this.navbar.locator(`a[href="#${name}"]`);
  }

  async goToSection(name: ResumeSection): Promise<void> {
    await this.navLink(name).click();
    await this.section(name).scrollIntoViewIfNeeded();
    await this.moveMouseAway();
  }
}
