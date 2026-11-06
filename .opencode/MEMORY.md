# Project memory

## Tooling
- **pnpm engine pin (2026-11-05):** `engines.pnpm` is `>=9`; it was `^9 || ^10`, which made every `pnpm` command fail on pnpm 11. `.yarnrc` used to carry `--install.ignore-engines true`, hiding the mismatch — do not reintroduce it.
- **pnpm build scripts (2026-11-05):** approvals live in `pnpm-workspace.yaml` (`onlyBuiltDependencies`); a `pnpm` field in `package.json` is ignored.

## Payload access
- **Public collections need explicit `access.read` (2026-11-05):** Payload's default is authenticated-only, so `BookReview` and `Category` returned 401 to anonymous REST/GraphQL until `read: () => true` was added. Add it to every collection meant to be public.

## Frontend styling
- **Navbar animations need `tw-animate-css` (2026-11-05):** it must be imported in `src/app/(frontend)/global.css`; the navbar used `animate-enter-*`/`animate-exit-*` classes that exist nowhere. Use `animate-in`/`animate-out` + `slide-*`/`fade-*`/`zoom-*`.

## Frontend images
- **CMS images use `next/image` with `unoptimized` (2026-11-05):** image fields are free-text URLs from arbitrary hosts, and `next/image` throws for hosts missing from `images.remotePatterns`. `ContentImage` wraps this; keep `unoptimized` for CMS-sourced sources.
