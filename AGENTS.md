# AGENTS.md

Two independent projects — there is no root `package.json` or workspace config. Always run commands from inside the project directory.

- `cms/` — Payload CMS 3.92 + Next.js 16 (App Router) + React 19, Postgres via `@payloadcms/db-postgres`. The active project.
- `frontend/` — near-empty Vite 8 scaffold ("BusFlow"): only a `vite` devDependency, no scripts, and `index.html` points at a `src/main.js` that does not exist yet. Uses npm (`package-lock.json`).

## cms — commands (run in `cms/`; package manager is **pnpm**, engines require pnpm ^9–11 and node ^22.23.4 or >=24.22.1)

- `pnpm dev` — dev server at http://localhost:3000 (`pnpm devsafe` = wipe `.next` first, use when the admin panel is wedged)
- `pnpm lint` — ESLint (flat config, `next/core-web-vitals`)
- No typecheck or format script exists: use `pnpm exec tsc --noEmit` and `pnpm exec prettier --write .`
- `pnpm test` = `test:int` then `test:e2e`. Both need a reachable Postgres (`DATABASE_URL`); e2e admin specs also seed a user (`dev@payloadcms.com` / `test`) directly through Payload and clean it up after.
  - `pnpm test:int` — vitest, matches only `tests/int/**/*.int.spec.ts`
  - `pnpm test:e2e` — Playwright (chromium channel), auto-starts `pnpm dev` on :3000 with `reuseExistingServer`
  - Single file: `pnpm exec vitest run tests/int/api.int.spec.ts` / `pnpm exec playwright test tests/e2e/admin.e2e.spec.ts`

## cms — setup & gotchas

- **The README, `.env.example`, and `docker-compose.yml` are stale Payload-template leftovers that say MongoDB.** `src/payload.config.ts` uses `postgresAdapter` — trust the code. The compose file has `mongo` enabled and `postgres` commented out, so it does not work as-is.
- `.env` needs `DATABASE_URL` (a Postgres connection string) and `PAYLOAD_SECRET`.
- Despite `package-lock.json` being committed (npm artifact), scripts, engines, and docker-compose all use pnpm — install/run with pnpm.
- Generated files — regenerate, never hand-edit:
  - `src/payload-types.ts` — `pnpm generate:types` after any collection/field change (eslint-ignored, but typechecked)
  - `src/app/(payload)/admin/importMap.js` — `pnpm generate:importmap` after adding custom editor components
- `src/app/(payload)/` is Payload-generated admin + API boilerplate; put custom site code in `src/app/(frontend)/` and `src/app/my-route/`, collections in `src/collections/`.
- Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`.
- e2e specs hardcode `http://localhost:3000`, and `frontend.e2e.spec.ts` still asserts the default Payload homepage text — update it if you change the homepage.
- Prettier config (applied manually since there's no format script): single quotes, no semicolons, trailing commas, printWidth 100.
