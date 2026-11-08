import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000/api/v1"),
});

export const env = envSchema.parse(process.env);

export function getApiBaseUrl() {
  return env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
}

export function getServerRequestHeaders(headers: HeadersInit = {}) {
  const nextHeaders = new Headers(headers);

  if (process.env.API_BEARER_TOKEN && !nextHeaders.has("Authorization")) {
    nextHeaders.set("Authorization", `Bearer ${process.env.API_BEARER_TOKEN}`);
  }

  if (!nextHeaders.has("Accept")) {
    nextHeaders.set("Accept", "application/json");
  }

  return nextHeaders;
}
