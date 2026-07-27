# Playwright Demo Documentation

## Project Description

Playwright Demo is a TypeScript-based automated testing project that uses Playwright Test to validate external REST APIs and browser-based user interfaces. The repository includes API request tests, screenshot-focused UI tests, an example TodoMVC browser test suite, and Playwright reporting configuration for local and CI runs.

The project is currently a test automation codebase rather than a production web service: it does not define an application database, domain model layer, or hosted REST API of its own. The architecture documents below describe the implemented test framework, the external APIs exercised by the tests, and the absence of first-party database/class models where applicable.

## Documentation Index

- [Database Architecture](./architecture/database.md) — PostgreSQL schema status, ERD, table inventory, and index notes.
- [Class and Module Architecture](./architecture/classes.md) — UML-style documentation of the project modules, Playwright fixtures, helper functions, and their relationships.
- [REST API Endpoint Coverage](./architecture/api.md) — External REST endpoints covered by the Playwright API tests, including methods, paths, parameters, payloads, and expected results.
