# SHIFT Camp

SHIFT Camp is a pnpm monorepo with separate attendee and admin Next.js apps.

## Setup

Install dependencies from the repository root:

```sh
pnpm install
```

Run either app from the root:

```sh
pnpm dev:client
pnpm dev:admin
```

Both apps use port 3000 by default, so run them one at a time unless you configure a different port.

## Checks

```sh
pnpm lint
pnpm build
```

The attendee site is in `client/`; the admin site is in `admin/shift-admin/`.
