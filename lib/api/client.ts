import { env, getApiBaseUrl } from "@/lib/config/env";
import { normalizeApiError } from "@/lib/api/errors";
import type { ApiRequestOptions, ApiResult, PaginationMeta } from "@/lib/api/types";

const DEFAULT_TIMEOUT_MS = 15000;

function buildRequestUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>,
) {
  const normalizedPath = path.startsWith("http")
    ? path
    : `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const url = new URL(normalizedPath);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    url.searchParams.append(key, String(value));
  });

  return url.toString();
}

function ensureJsonHeaders(headers: Headers) {
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  return headers;
}

function getBodyForRequest(body: unknown, headers: Headers) {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  if (
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer
  ) {
    if (!headers.has("Content-Type") && typeof body !== "string") {
      headers.set("Content-Type", "application/octet-stream");
    }

    return body;
  }

  if (typeof body === "object") {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return JSON.stringify(body);
  }

  return String(body);
}

function extractPayload<T>(payload: unknown): T {
  if (payload === null || payload === undefined) {
    return undefined as T;
  }

  if (typeof payload !== "object") {
    return payload as T;
  }

  const value = payload as Record<string, unknown>;

  if ("data" in value && value.data !== undefined) {
    return value.data as T;
  }

  if ("result" in value && value.result !== undefined) {
    return value.result as T;
  }

  if ("items" in value && Array.isArray(value.items)) {
    return value.items as T;
  }

  if ("records" in value && Array.isArray(value.records)) {
    return value.records as T;
  }

  return payload as T;
}

function extractMeta(payload: unknown): PaginationMeta | undefined {
  if (payload === null || payload === undefined || typeof payload !== "object") {
    return undefined;
  }

  const record = payload as Record<string, unknown>;
  const meta = record.meta ?? record.pagination;

  if (typeof meta !== "object" || meta === null) {
    return undefined;
  }

  const nextMeta = meta as Record<string, unknown>;
  const page = Number(nextMeta.page ?? 1);
  const pageSize = Number(nextMeta.pageSize ?? nextMeta.limit ?? nextMeta.perPage ?? 0);
  const total = Number(nextMeta.total ?? nextMeta.count ?? 0);
  const computedTotalPages = Math.ceil(total / (pageSize || 1));
  const totalPages = Number(nextMeta.totalPages ?? (computedTotalPages || 1));

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNextPage: Boolean(nextMeta.hasNextPage ?? page < totalPages),
    hasPreviousPage: Boolean(nextMeta.hasPreviousPage ?? page > 1),
  };
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  const hasJsonBody = contentType.includes("application/json") || contentType.includes("+json");

  if (response.status === 204 || response.status === 205) {
    return undefined;
  }

  if (hasJsonBody) {
    return response.json().catch(() => undefined);
  }

  const text = await response.text();
  return text || undefined;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<ApiResult<T>> {
  const method = options.method ?? "GET";
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const headers = ensureJsonHeaders(new Headers(options.headers ?? {}));
  const hasBody = method !== "GET" && method !== "HEAD";
  const body = hasBody ? getBodyForRequest(options.body, headers) : undefined;
  const requestUrl = buildRequestUrl(path, options.params);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(requestUrl, {
      method,
      headers,
      body,
      signal: options.signal ?? controller.signal,
      credentials: options.credentials ?? "same-origin",
    });

    const payload = await parseResponseBody(response);

    if (!response.ok) {
      const error = normalizeApiError(payload, response.status);
      return {
        ok: false,
        error,
        status: response.status,
      };
    }

    return {
      ok: true,
      data: extractPayload<T>(payload),
      status: response.status,
      meta: extractMeta(payload),
    };
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    const message = isTimeout
      ? "The request timed out. Please try again."
      : "Network error. Please check your connection and try again.";

    return {
      ok: false,
      error: normalizeApiError(
        { message, status: isTimeout ? 408 : 0 },
        isTimeout ? 408 : 500,
      ),
      status: isTimeout ? 408 : 500,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  get: <T>(path: string, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T, TBody = unknown>(path: string, body?: TBody, options: Omit<ApiRequestOptions<TBody>, "method" | "body"> = {}) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T, TBody = unknown>(path: string, body?: TBody, options: Omit<ApiRequestOptions<TBody>, "method" | "body"> = {}) =>
    apiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T, TBody = unknown>(path: string, body?: TBody, options: Omit<ApiRequestOptions<TBody>, "method" | "body"> = {}) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};

export function getApiUrlForEnv() {
  return env.NEXT_PUBLIC_API_URL;
}
