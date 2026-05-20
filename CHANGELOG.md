# Changelog

## v0.1.0 — 2026-05-20

Initial release of the Task Management & To-Do List app, built across 5 stories imported from Trello.

### Added
- **TRL-001** — "Let's Start" onboarding screen with brand title, hero illustration, descriptive sub-copy, and primary CTA that routes to `/home`.
- **TRL-002** — Home dashboard with greeting header, daily-progress banner (purple gradient + progress ring), and overall progress derived from task state via the Zustand store.
- **TRL-003** — `InProgressCarousel` and `TaskGroupsList` components — horizontally scrollable pastel project cards and a vertical project list with per-project completion ring.
- **TRL-004** — "Today's Tasks" agenda view with a 5-day date strip, filter pills (All / To do / In Progress / Completed), and color-coded status pills.
- **TRL-005** — "Add Project" form with task group selector, project name, description, start/end date pickers, color picker, validation, and store integration.

### Stack
- React 18 + TypeScript + Vite
- Zustand store with `localStorage` persistence
- Tailwind CSS with custom design tokens (brand purple `#6C4EE5`, pastel cards, Lexend Deca font)
- React Router 6 for navigation
- Vitest + React Testing Library for unit tests
- Playwright (Chromium / Firefox / WebKit) for E2E tests

### Quality
- Build: ✅ clean
- ESLint: 0 errors, 0 warnings
- Unit tests: 18/18 passing
- E2E tests: 15/15 passing across 3 browsers
- Coverage: 96.93% lines / 91.8% branches
- SonarQube quality gate: **PASSED** — 0 bugs, 0 vulnerabilities, 0 code smells
