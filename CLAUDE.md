# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Playwright Test (TypeScript) automation project with no application of its own. Every test targets external sites and APIs:
- `https://mitesh411.github.io/MyResume/`: UI and visual regression tests
- `reqres.in`, `automationintesting.online`: API tests via the `request` fixture
- `the-internet.herokuapp.com`: element screenshot demo

There is no build, lint or tsconfig step. Playwright compiles the TypeScript itself.

## Commands

```bash
npm install && npx playwright install       # setup
npx playwright test                         # all tests in ./tests (chromium only)
npx playwright test tests/get.spec.ts       # one file
npx playwright test -g "full page matches"  # one test by title
npm run test:visual                         # tests tagged @visual
npm run test:visual:update                  # regenerate visual baselines
npx playwright show-report                  # open HTML report
```

`testDir` is `./tests`, so `tests-examples/` (the TodoMVC sample) never runs.

## Architecture

The older specs (`tests/get.spec.ts`, `tests/takescreenshot.spec.ts`) are flat and call `page`/`request` directly. The visual suite follows the Page Object Model, and new UI tests should follow it too:

- `pages/BasePage.ts`: abstract base class holding navigation and screenshot stabilisation (`waitForPageToSettle`, `scrollThroughPage`, `moveMouseAway`).
- `pages/ResumePage.ts`: locators and actions for the resume site. Sections are addressed by DOM id through `section(name)`, `navLink(name)` and `goToSection(name)`.
- `fixtures/pageFixtures.ts`: extends `test` so specs receive page objects (`resumePage`). Specs import `test`/`expect` from here, not from `@playwright/test`.
- `test-data/resumeData.ts`: URLs, the expected title, viewport presets and the `RESUME_SECTIONS` list. Keep literals here, not in specs.

## Visual regression suite (`tests/visual/`)

The resume site has many sources of nondeterminism. Every one of the following is required for stable screenshots, so don't remove any without re-verifying (regenerate baselines, then run the suite several times):

- `test.use({ reducedMotion: 'reduce', colorScheme: 'light' })`: the site's `main.js` skips its scroll-reveal and smooth scrolling under reduced motion, and the theme follows the OS colour scheme.
- `hide-dynamic.css` (passed as `stylePath`, so it applies only during capture):
  - `.typed` is `display: none`, not just hidden. Typed.js cycles through Devanagari and Gujarati strings, whose fallback fonts change the page height.
  - The cursor, `[data-clock]` and `[data-year]` are hidden.
  - The viewport-fixed `.page-bg` is pinned and the `body::before` grain overlay is removed, because fixed layers shift during tall captures.
- `BasePage.relayoutFormControls()`: Chromium keeps fallback-font metrics on the native `<select>` until the next relayout. A full-page capture triggers that relayout, which changes page height by 3px between consecutive frames.
- Don't use `mask` on elements whose size changes, such as the typed span. Playwright masks the element's bounding box, so a changing size makes the masked area differ between frames.
- `playwright.config.ts` uses an absolute `maxDiffPixels: 100` rather than a ratio. On a roughly 20,000px full-page image, a 1% ratio let a recoloured paragraph pass.

Baselines are platform-specific (`*-chromium-win32.png` under `resume.visual.spec.ts-snapshots/`). CI runs on `ubuntu-latest`, so it needs its own `-linux` baselines, generated with the `mcr.microsoft.com/playwright` Docker image.

## Config and CI notes

- Reporters: `html` + `line` locally, `html` + `allure-playwright` when `CI` is set. CI also enables retries=2 and workers=4.
- `.github/workflows/playwright.yml` is `workflow_dispatch` only. It runs `npx playwright test` and publishes `playwright-report/` to GitHub Pages.
- `allure-report/` and `screenshot/` are committed output artifacts, not sources.
- `docs/architecture/*.md` describe the project as it was before the POM and visual suite were added. Treat them as possibly stale.
