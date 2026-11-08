import { apiRequest } from "@/lib/api/client";
import { getServerRequestHeaders } from "@/lib/config/env";
import type { ApiRequestOptions, ApiResult } from "@/lib/api/types";

export async function serverApiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<ApiResult<T>> {
  const headers = getServerRequestHeaders(options.headers ?? {});

  return apiRequest<T>(path, {
    ...options,
    headers,
    credentials: options.credentials ?? "same-origin",
  });
}
