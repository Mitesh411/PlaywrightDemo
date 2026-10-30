/**
 * Static test data for the MyResume website.
 * Keeping URLs, viewports and section ids here means tests never hard-code them.
 */

export const RESUME_URL = 'https://mitesh411.github.io/MyResume/';

export const EXPECTED_TITLE = 'Mitesh Dandade — QA Lead & Test Automation';

export const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
} as const;

export type ViewportName = keyof typeof VIEWPORTS;

/** Top-level chapters reachable from the side navigation, keyed by their DOM id. */
export const RESUME_SECTIONS = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact'] as const;

export type ResumeSection = (typeof RESUME_SECTIONS)[number];
