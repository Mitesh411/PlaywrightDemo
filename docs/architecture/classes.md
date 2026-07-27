# Class and Module Architecture

## Overview

The project does not define custom TypeScript classes. It is organized around Playwright Test modules that import Playwright fixtures (`test`, `expect`, and `Page`) and declare test cases plus a few helper functions.

The UML diagram below documents the effective module-level architecture and dependencies, including Playwright-provided classes/fixtures and local helper functions used by the example TodoMVC suite.

## UML Diagram

```mermaid
classDiagram
    class PlaywrightTestRunner {
        <<external fixture>>
        +test(name, callback)
        +describe(name, callback)
        +beforeEach(callback)
        +afterEach(callback)
        +step(name, callback)
    }

    class ExpectAssertions {
        <<external assertion API>>
        +toBe(expected)
        +toHaveText(expected)
        +toHaveCount(expected)
        +toHaveClass(expected)
        +toBeVisible()
        +toBeHidden()
        +toBeChecked()
    }

    class APIRequestContext {
        <<external fixture>>
        +get(url, options)
        +post(url, options)
        +put(url, options)
        +patch(url, options)
        +delete(url, options)
    }

    class Page {
        <<external Playwright class>>
        +goto(url, options)
        +setViewportSize(size)
        +screenshot(options)
        +locator(selector)
        +getByPlaceholder(text)
        +getByTestId(testId)
        +getByRole(role, options)
        +getByLabel(text)
        +waitForFunction(callback, arg)
        +reload()
        +goBack()
        +title()
    }

    class GetSpecModule {
        <<test module>>
        +GET booking summary
        +API Post Response
        +API Put Request
        +API Patch Request
        +API Delete Request
    }

    class ScreenshotSpecModule {
        <<test module>>
        +should take a Full Page screenshot
        +Capture Screenshot of an Element
        +Verify the Title of My Resume Website
    }

    class TodoExampleSpecModule {
        <<example test module>>
        -TODO_ITEMS: string[]
        +New Todo tests
        +Mark all as completed tests
        +Item tests
        +Editing tests
        +Counter tests
        +Clear completed button tests
        +Persistence tests
        +Routing tests
    }

    class TodoStorageHelpers {
        <<helper functions>>
        +createDefaultTodos(page: Page)
        +checkNumberOfTodosInLocalStorage(page: Page, expected: number)
        +checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number)
        +checkTodosInLocalStorage(page: Page, title: string)
    }

    class PlaywrightConfig {
        <<configuration module>>
        +testDir: string
        +fullyParallel: boolean
        +forbidOnly: boolean
        +retries: number
        +workers: number
        +reporter: Reporter[]
        +use.trace: string
        +use.screenshot: string
        +projects: Project[]
    }

    PlaywrightConfig ..> PlaywrightTestRunner : configures
    GetSpecModule ..> PlaywrightTestRunner : declares tests with
    GetSpecModule ..> ExpectAssertions : asserts with
    GetSpecModule ..> APIRequestContext : sends requests through
    ScreenshotSpecModule ..> PlaywrightTestRunner : declares tests with
    ScreenshotSpecModule ..> ExpectAssertions : asserts with
    ScreenshotSpecModule ..> Page : automates browser with
    TodoExampleSpecModule ..> PlaywrightTestRunner : groups tests with
    TodoExampleSpecModule ..> ExpectAssertions : asserts with
    TodoExampleSpecModule ..> Page : automates browser with
    TodoExampleSpecModule ..> TodoStorageHelpers : calls
    TodoStorageHelpers ..> Page : reads localStorage through
```

## Module Details

### `playwright.config.ts`

Defines the Playwright Test runner configuration. It sets the primary test directory to `./tests`, enables fully parallel execution, configures CI-specific retries and workers, enables tracing on first retry, captures screenshots only on failure, and runs tests in a Chromium/Desktop Chrome project.

### `tests/get.spec.ts`

Contains API-focused Playwright tests that use the `request` fixture to exercise external REST endpoints. The module validates HTTP status codes and selected response fields for GET, POST, PUT, PATCH, and DELETE requests.

### `tests/takescreenshot.spec.ts`

Contains UI and screenshot tests using the `page` fixture. The module navigates to external web pages, sets browser viewport dimensions, captures full-page and element screenshots, and verifies a page title.

### `tests-examples/demo-todo-app.spec.ts`

Contains Playwright's TodoMVC example suite. It uses the `Page` type, Playwright locators, test hooks, nested `describe` blocks, and helper functions to validate TodoMVC behavior and `localStorage` persistence.

## Custom Classes

No repository-defined classes are currently present. If production application code or page-object models are introduced later, this document should be updated to include each class, attributes, methods, inheritance, composition, and dependencies.
