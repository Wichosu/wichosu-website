# Wichosu

Personal website and blog for Wichosu: a Next.js 15 frontend backed by Payload CMS 3 and PostgreSQL. The site publishes blog entries and book reviews, both managed from the Payload admin panel at `/admin`.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19)
- [Payload CMS 3](https://payloadcms.com) (Lexical rich text, Postgres adapter)
- [Tailwind CSS 4](https://tailwindcss.com)
- PostgreSQL 16
- Playwright (end-to-end) and Vitest (integration)

## Prerequisites

- Node.js >= 20.9.0
- pnpm >= 9
- PostgreSQL 16 (or Docker)

## Local setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create your environment file and fill in the values:

   ```bash
   cp .env.example .env
   ```

   | Variable               | Purpose                                                                   |
   | ---------------------- | ------------------------------------------------------------------------- |
   | `DATABASE_URL`         | PostgreSQL connection string. Required.                                   |
   | `PAYLOAD_SECRET`       | Secret used to sign auth tokens. Required.                                |
   | `NEXT_PUBLIC_SITE_URL` | Canonical site URL, no trailing slash. Used for metadata and the sitemap. |

   The app fails to start when `DATABASE_URL` or `PAYLOAD_SECRET` is missing.

3. Apply database migrations:

   ```bash
   pnpm migrate
   ```

4. Start the dev server:

   ```bash
   pnpm dev
   ```

   Open <http://localhost:3000>. Create the first admin user at <http://localhost:3000/admin>.

## Scripts

| Command                   | Description                               |
| ------------------------- | ----------------------------------------- |
| `pnpm dev`                | Start the development server              |
| `pnpm build`              | Production build                          |
| `pnpm start`              | Serve the production build                |
| `pnpm lint`               | Run ESLint                                |
| `pnpm typecheck`          | Run TypeScript without emitting           |
| `pnpm format`             | Format the repo with Prettier             |
| `pnpm format:check`       | Check formatting without writing          |
| `pnpm generate:types`     | Regenerate `src/payload-types.ts`         |
| `pnpm generate:importmap` | Regenerate the Payload admin import map   |
| `pnpm migrate`            | Apply Payload database migrations         |
| `pnpm test:int`           | Run Vitest integration tests (needs a DB) |
| `pnpm test:e2e`           | Run Playwright tests (needs a dev server) |
| `pnpm test`               | Run both test suites                      |

## Docker

`docker-compose.yml` starts the app in watch mode together with PostgreSQL:

```bash
docker compose up
```

The container overrides `DATABASE_URL` so it always points at the compose database.

To build the production image, pass the variables the Payload config requires at build time:

```bash
docker build \
  --build-arg PAYLOAD_SECRET=your-secret \
  --build-arg DATABASE_URL=postgres://user:pass@host:5432/db \
  -t wichosu .
```

Then run it with `NEXT_PUBLIC_SITE_URL` and the runtime database URL set.

## Project layout

```
src/
├── app/
│   ├── (frontend)/          # Public site: pages, layout, sitemap, components
│   └── (payload)/           # Payload admin and API routes
├── collections/             # Payload collections (BlogEntry, BookReview, Category, ...)
├── lib/                     # Shared server helpers (site URL, validators)
├── migrations/              # Payload/Postgres migrations
└── payload.config.ts        # Payload configuration
```

## Content model

- **Blog entries** (`blog-entry`): title, slug, date, optional image and meta description, rich text content, categories.
- **Book reviews** (`book-review`): title, slug, author, date, integer rating (1–5), Amazon link, optional image, rich text content.
- **Categories** (`category`): name.
- **Media** and **Users** support uploads and admin authentication.

Blog entries, book reviews, and categories are publicly readable; all writes require an authenticated admin user.
