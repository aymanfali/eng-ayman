# REST API Requests

This application uses a shared Fetch-based API client for requests to the external REST backend. The client handles URL construction, JSON serialization, response parsing, timeouts, and normalized errors. Feature code should call typed service functions rather than building requests inside UI components.

## Configure the API URL

Set one environment variable for the backend base URL in `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

All endpoint paths are defined in [`endpoints.ts`](./endpoints.ts) and appended to this base URL. For example, `/projects` resolves to `http://localhost:8000/api/v1/projects`. Do not add a separate environment variable for each route. Restart the development server after changing environment variables.

Never put secrets in `NEXT_PUBLIC_*` variables. The optional `API_BEARER_TOKEN` is read by the server request helper and must only be used from server-side code.

## Request flow

Keep responsibilities separated:

1. Add or update a route constant in `endpoints.ts`.
2. Define request and response types and add a service function in `services.ts` (or a feature-specific service module when it grows).
3. Call that service from a Server Component, form handler, or TanStack Query hook.
4. Handle loading, success, empty, and failure states in the UI.

The shared helpers are in [`client.ts`](./client.ts), the server-side helper is in [`server.ts`](./server.ts), and result/error types are in [`types.ts`](./types.ts) and [`errors.ts`](./errors.ts).

## Define endpoint paths

Keep route paths centralized and relative to the configured API URL:

```ts
export const apiEndpoints = {
  // Existing routes...
  books: {
    list: "/books",
    create: "/books",
  },
};
```

Avoid hardcoding URLs in components or duplicating the base URL in services. Absolute URLs are supported by the client for exceptional external requests, but backend features should normally use the shared base URL.

## Add a typed service

Use the method-specific helpers and keep the backend contract at the service boundary:

```ts
import { api } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export type Book = {
  id: string;
  title: string;
};

export type CreateBookInput = {
  title: string;
};

export function getBooks(page = 1) {
  return api.get<Book[]>(apiEndpoints.books.list, {
    params: { page, limit: 20 },
  });
}

export function createBook(input: CreateBookInput) {
  return api.post<Book, CreateBookInput>(apiEndpoints.books.create, input);
}
```

The client supports `get`, `post`, `put`, `patch`, and `delete`. Query parameters can be passed through `params`; undefined, null, and empty-string values are omitted. JSON request bodies are serialized automatically. `FormData` is passed through without setting `Content-Type`, so the browser can supply the multipart boundary.

Supported request options include `headers`, `signal`, `timeoutMs`, and `credentials`. The default timeout is 15 seconds and the default credentials mode is `same-origin`.

## Handle results

Requests resolve to an `ApiResult<T>` rather than throwing for HTTP, timeout, or network failures. Narrow the discriminated union with `ok`:

```ts
const result = await getBooks();

if (!result.ok) {
  showError(result.error.userMessage);
  return;
}

renderBooks(result.data);
```

On success, `data` contains the extracted payload, `status` contains the HTTP status, and `meta` may contain pagination information. The client recognizes common response wrappers (`data`, `result`, `items`, or `records`) and common pagination fields (`meta` or `pagination`). Confirm the actual backend contract before relying on a particular wrapper.

On failure, `error` contains the normalized `ApiError`, including `status`, `userMessage`, and optional validation details. Use `userMessage` for user-facing feedback; avoid displaying raw backend details. Because failures are returned as data, TanStack Query's `error` field is not automatically set for HTTP failures. Check `result.ok` in the query data.

## Use with TanStack Query

Call a service function from the query function and give the query a stable key that includes any parameters affecting the result:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/api/services";

export function ProjectsList() {
  const query = useQuery({
    queryKey: ["projects", { page: 1 }],
    queryFn: () => getProjects({ page: 1 }),
    staleTime: 5 * 60 * 1000,
  });

  if (query.isLoading) return <p>Loading projects...</p>;
  if (query.isError) return <p>Could not load projects.</p>;
  if (!query.data.ok) return <p>{query.data.error.userMessage}</p>;
  if (query.data.data.length === 0) return <p>No projects found.</p>;

  return <ProjectGrid projects={query.data.data} />;
}
```

`isError` covers errors thrown by the query function itself. The API client's HTTP and network failures are represented by `query.data.ok === false` and should be handled separately.

## Use from server code

For requests made in server-side code, use `serverApiRequest` from [`server.ts`](./server.ts). It adds the optional server-only bearer token from `API_BEARER_TOKEN` and delegates to the shared client:

```ts
import { serverApiRequest } from "@/lib/api/server";
import type { Project } from "@/lib/api/services";
import { apiEndpoints } from "@/lib/api/endpoints";

const result = await serverApiRequest<Project[]>(apiEndpoints.projects.list);

if (!result.ok) {
  // Handle or log the failure on the server without exposing secrets.
}
```

Do not import server-only credentials into Client Components. Authentication and authorization must also be enforced by the backend; hiding UI is not an access-control boundary.

## Test API behavior

Keep tests focused on the service contract and shared client behavior. Mock `fetch` for request construction and response handling; do not make test runs depend on a live backend.

```bash
pnpm test
pnpm lint
pnpm build
```

The backend's exact route names, payloads, pagination format, and authentication scheme must be confirmed against its API contract before production integration.