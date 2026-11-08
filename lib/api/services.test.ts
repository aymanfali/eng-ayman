import { describe, expect, it, vi } from "vitest";

import { getProjects, submitContactMessage } from "@/lib/api/services";

describe("backend feature services", () => {
  it("lists projects from the configured backend endpoint", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ data: [{ id: "1", title: "Portfolio" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getProjects();

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected projects request to succeed");
    }
    expect(result.data).toEqual([{ id: "1", title: "Portfolio" }]);
    expect(fetchSpy.mock.calls[0][0]).toContain("/projects");
  });

  it("posts a contact message to the backend", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await submitContactMessage({
      name: "Ayman",
      email: "ayman@example.com",
      message: "Hello world",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected contact request to succeed");
    }
    expect(fetchSpy.mock.calls[0][0]).toContain("/contact");
    expect(fetchSpy.mock.calls[0][1]?.method).toBe("POST");
  });
});
