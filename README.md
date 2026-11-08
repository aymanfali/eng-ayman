# Production Frontend Architecture

This project is a Next.js 16 App Router application with TypeScript, Tailwind CSS, next-intl, and a theme-aware design system. It is prepared as a production-ready front end that can connect to a separately deployed REST backend without assuming an existing API contract.

## Project architecture

- App Router: yes
- React: 19.3.0
- Next.js: 16.4.4
- TypeScript: 5.x
- Styling: Tailwind CSS 4
- i18n: next-intl
- State/data fetching: TanStack Query
- Validation: Zod + React Hook Form
- Theming: next-themes

### Key folders

- app/: route structure, global layout, route-level loading and error boundaries
- components/: reusable UI, layout, feedback, and provider components
- lib/: centralized API, validation, and environment utilities
- i18n/: locale configuration and routing
- messages/: translation JSON files
- data/: static content used by the portfolio pages

## Setup

```bash
pnpm install
pnpm dev
```

The app runs at http://localhost:3000 by default.

## Environment variables

Create a local environment file from [.env.example](.env.example):

```bash
cp .env.example .env.local
```

Required example value:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

Do not store secrets in NEXT_PUBLIC variables. Keep server-only credentials in environment variables that are not exposed to the browser.

## API configuration

The central API layer lives in the lib/api folder:

- client.ts: fetch wrapper with request creation and response parsing
- errors.ts: standardized error normalization and user-facing messages
- server.ts: server-side helper for secure requests
- endpoints.ts: code-defined endpoint map
- types.ts: shared request and response typings

All routes use the shared `NEXT_PUBLIC_API_URL` base URL. See the [API request guide](lib/api/README.md) for endpoint conventions, typed services, client/server usage, and error handling.

## API client usage

```ts
import { api } from "@/lib/api/client";

const result = await api.get<Resource[]>("/resource", {
  params: { page: 1, q: "portfolio" },
});

if (!result.ok) {
  console.error(result.error.userMessage);
  return;
}

console.log(result.data);
```

## Server-side versus client-side fetching

- Use server-side utilities when the request must happen in a Server Component or should not be exposed to the client.
- Use the shared client-side API wrapper from Client Components and hooks.
- Keep business logic outside components and behind typed service functions.
- Avoid unnecessary API proxy layers or browser-only logic in Server Components.

## TanStack Query patterns

The app includes a QueryProvider and default query/mutation configuration in [components/providers/query-provider.tsx](components/providers/query-provider.tsx).

Example usage:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";

export function ExampleWidget() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["example-resource"],
    queryFn: () => apiRequest("/resource"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <pre>{JSON.stringify(data?.data, null, 2)}</pre>;
}
```

## Error handling conventions

All API failures go through the centralized error normalization layer. The application uses consistent status mapping for:

- 400 / 422 validation failures
- 401 and 403 auth/authorization failures
- 404 not found
- 409 conflicts
- 429 rate limiting
- 500 server issues
- network and timeout issues

User-facing messages are intentionally generic and do not expose internal backend details.

## Loading and skeleton conventions

The app includes reusable loading structures in [components/feedback/skeleton.tsx](components/feedback/skeleton.tsx):

- page loading
- stats cards
- list items
- tables
- profile blocks
- forms
- media placeholders

Route-level loading is handled with App Router loading states in [app/loading.tsx](app/loading.tsx) and [app/[locale]/loading.tsx](app/[locale]/loading.tsx).

## Authentication integration requirements

Authentication is intentionally configurable to avoid inventing a backend contract. The app is ready to integrate a secure session system using:

- HttpOnly, Secure, SameSite cookies where the backend supports cookie-based auth
- server-only credentials where an API token is required
- proper unauthorized handling and protected UI states
- backend-side authorization enforcement, not UI-only hiding

Do not rely on frontend-only route checks as the security boundary.

## Testing commands

```bash
pnpm test
pnpm lint
pnpm build
```

The project includes a Vitest setup for API and validation testing.

## Production build

```bash
pnpm build
pnpm start
```

## Adding a new API-driven feature

Add the route to `lib/api/endpoints.ts`, define its request and response types, and implement a service function using the shared `api` helpers. Keep request logic out of components, validate user input with Zod, and handle loading, empty, success, and failure states in the UI. See the [API request guide](lib/api/README.md) for complete examples.

## Remaining backend integration requirements

The frontend is ready for integration, but the actual backend contract still needs to be confirmed for:

- final authentication scheme
- session/cookie behavior
- exact route names and payload envelopes
- pagination conventions
- validation error contract
- authorization semantics

Once those details are available, update the environment config and the endpoint map to match the backend exactly.
