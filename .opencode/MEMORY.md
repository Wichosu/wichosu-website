# Project memory

## Tooling

- **pnpm engine pin (2026-11-05):** `engines.pnpm` is `>=9`; it was `^9 || ^10`, which made every `pnpm` command fail on pnpm 11. `.yarnrc` used to carry `--install.ignore-engines true`, hiding the mismatch — do not reintroduce it.
- **pnpm build scripts (2026-11-05):** approvals live in `pnpm-workspace.yaml` (`onlyBuiltDependencies`); a `pnpm` field in `package.json` is ignored.
- **Global pnpm 11 cannot use this `node_modules` (2026-11-10):** the tree is a pnpm 10 install, so pnpm 11 aborts with `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY` and wants to purge it. Run scripts as `npx -y pnpm@10.27.0 run …`; do not let pnpm 11 reinstall.
- **Port 3000 belongs to another local app (2026-11-10):** `baul-chino` holds it, so run this site with `next dev --port 3100`. `playwright.config.ts` reads `PLAYWRIGHT_PORT` (default 3000) — pass `PLAYWRIGHT_PORT=3100`, or `reuseExistingServer` tests the wrong app.

## Payload access

- **Public collections need explicit `access.read` (2026-11-05):** Payload's default is authenticated-only, so `BookReview` and `Category` returned 401 to anonymous REST/GraphQL until `read: () => true` was added. Add it to every collection meant to be public.

## Frontend styling

- **Navbar animations need `tw-animate-css` (2026-11-05):** it must be imported in `src/app/(frontend)/global.css`; the navbar used `animate-enter-*`/`animate-exit-*` classes that exist nowhere. Use `animate-in`/`animate-out` + `slide-*`/`fade-*`/`zoom-*`.
- **The 17px body size is `--text-body`, not `--text-base` (2026-11-10):** `text-base` is Tailwind's built-in font-size, so a `--text-base` token is unreachable. Cream text on terracotta must be `text-[var(--color-base)]` for the same reason.
- **The article drop cap comes from `.article-body > p:first-of-type::first-letter` (2026-11-10):** content that starts with a heading, list or image silently gets no drop cap — that selector is the only thing drawing it.

## Frontend images

- **CMS images use `next/image` with `unoptimized` (2026-11-05):** image fields are free-text URLs from arbitrary hosts, and `next/image` throws for hosts missing from `images.remotePatterns`. `ContentImage` wraps this; keep `unoptimized` for CMS-sourced sources.
