# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript application. Keep the root limited to configuration and documentation. The project uses the following layout:

- `src/components/` for reusable interface elements and `src/sections/` for experience chapters.
- `src/data/` for editable birthday content; do not scatter personal copy through UI components.
- `src/utils/` for pure logic, with colocated `*.test.ts` files.
- `src/assets/photos/` and `src/assets/music/` for owner-provided media.

Avoid placing generated files, local environment settings, or credentials in version control.

## Build, Test, and Development Commands

Install dependencies with `npm install`, then use:

```text
npm run dev     # start Vite locally
npm test        # run Vitest once
npm run build   # type-check and create a production build
npm run lint    # run ESLint
```

Use one documented command per routine task; do not require contributors to run ad hoc command sequences.

## Coding Style & Naming Conventions

Follow the formatter and linter configured for the chosen language; commit formatted code only. Use two spaces for JSON, YAML, and Markdown indentation unless the language’s established formatter dictates otherwise. Name files and folders consistently with the ecosystem (for example, `kebab-case` for web assets and `PascalCase` for exported UI components). Prefer descriptive names over abbreviations.

Keep modules focused, remove dead code, and avoid unrelated refactors in feature changes.

## Testing Guidelines

Add or update tests with every behavior change. Name tests after the behavior under test, such as `returns-an-error-for-invalid-input`. Keep tests deterministic and independent of local secrets or external services. Run the complete test command and relevant lint/format checks before opening a pull request.

## Commit & Pull Request Guidelines

No commit convention is established yet. Use concise, imperative commit subjects, optionally scoped: `feat: add account validation` or `fix: handle empty response`.

Pull requests should explain the change and its motivation, link related issues, list verification performed, and include screenshots for user-interface changes. Keep each pull request focused and request review only after checks pass.

## Security & Configuration

Store secrets in ignored local environment files (for example, `.env.local`) and provide safe placeholders in `.env.example`. Never commit access tokens, private keys, or production data.
