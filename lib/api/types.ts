export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export type ApiRequestBody = Record<string, unknown> | unknown[] | string | FormData | Blob | ArrayBuffer | URLSearchParams | null | undefined;

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: TBody;
  signal?: AbortSignal;
  timeoutMs?: number;
  credentials?: RequestCredentials;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiErrorDetails {
  status?: number;
  message?: string;
  code?: string;
  details?: unknown;
  fieldErrors?: ValidationError[];
}

export interface ApiError extends Error {
  name: "ApiError";
  status: number;
  code?: string;
  details?: unknown;
  fieldErrors?: ValidationError[];
  userMessage: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: true;
  meta?: PaginationMeta;
}

export type ApiResult<T> =
  | { ok: true; data: T; status: number; meta?: PaginationMeta }
  | { ok: false; error: ApiError; status: number };

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
