import { describe, expect, it, vi } from "vitest";

import { apiRequest } from "@/lib/api/client";
import { createApiError, isApiError } from "@/lib/api/errors";
import { contactFormSchema } from "@/lib/validation/forms";

describe("api client", () => {
  it("builds a typed request with search params and JSON body", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ data: { ok: true } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await apiRequest<{ ok: boolean }>("/resource", {
      method: "POST",
      params: { page: 2, q: "next" },
      body: { name: "Ayman" },
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected a successful API response");
    }
    expect(result.data).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][0]).toContain("/resource?page=2&q=next");
    expect(fetchSpy.mock.calls[0][1]?.method).toBe("POST");
    const headers = fetchSpy.mock.calls[0][1]?.headers as Headers;
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("creates consistent API error metadata", () => {
    const error = createApiError({
      status: 422,
      message: "Validation failed",
      details: { email: "Required" },
    });

    expect(isApiError(error)).toBe(true);
    expect(error.status).toBe(422);
    expect(error.message).toBe("Validation failed");
  });

  it("validates a contact form payload", () => {
    const parsed = contactFormSchema.safeParse({
      name: "Ayman",
      email: "ayman@example.com",
      message: "Hello there",
    });

    expect(parsed.success).toBe(true);
  });
});
