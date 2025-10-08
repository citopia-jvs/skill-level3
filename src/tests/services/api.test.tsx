import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getUserImage } from "../../services/api";

/**
 * Mock localStorage (sans tester son contenu).
 * Entièrement typé, permet aucune utilisation de any.
 */
class LocalStorageMock implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return Object.prototype.hasOwnProperty.call(this.store, key)
      ? this.store[key]
      : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] ?? null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}

Object.defineProperty(globalThis, "localStorage", {
  value: new LocalStorageMock(),
  writable: false,
});

/**
 * Type utilitaire pour un mock de fetch.
 */
type MockFetchFn = ReturnType<
  typeof vi.fn<
    (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  >
>;

function buildJsonResponse<T>(
  payload: T,
  init?: { status?: number; headers?: Record<string, string> }
): Response {
  const status = init?.status ?? 200;
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(init?.headers ?? {}),
  });
  return new Response(JSON.stringify(payload), { status, headers });
}

describe("getUserImage", () => {
  let mockFetch: MockFetchFn;

  beforeEach(() => {
    (globalThis.localStorage as Storage).clear();
    mockFetch =
      vi.fn<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >();
    globalThis.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("devrait retourner l'URL de l'image quand l'API renvoie un utilisateur", async () => {
    const mockUrl = "https://example.com/image.jpg";
    mockFetch.mockResolvedValueOnce(
      buildJsonResponse({ users: [{ image: mockUrl }] })
    );

    const result = await getUserImage("John", "Doe");

    expect(result).toBe(mockUrl);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const calledUrl = mockFetch.mock.calls[0][0].toString();
    expect(calledUrl).toContain(
      "https://dummyjson.com/users/search?q=John%20Doe"
    );
  });

  it("devrait retourner un avatar fallback si fetch rejette (erreur réseau)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await getUserImage("John", "Doe");

    expect(result).toContain("https://ui-avatars.com/api/");
    expect(result).toContain("John+Doe");
  });

  it("devrait retourner un avatar fallback si la réponse API n'est pas ok", async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 500 }));

    const result = await getUserImage("Jane", "Smith");

    expect(result).toContain("https://ui-avatars.com/api/");
    expect(result).toContain("Jane+Smith");
  });

  it("devrait retourner un avatar fallback si la liste des utilisateurs est vide", async () => {
    mockFetch.mockResolvedValueOnce(buildJsonResponse({ users: [] }));

    const result = await getUserImage("Alice", "Wonderland");

    expect(result).toContain("https://ui-avatars.com/api/");
    expect(result).toContain("Alice+Wonderland");
  });

  it("devrait retourner un avatar générique 'User' si le nom est incomplet (lastName manquant)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API failure"));

    const result = await getUserImage("Solo", "");

    expect(result).toContain("https://ui-avatars.com/api/");
    expect(result).toContain("name=User");
  });

  it("devrait retourner un avatar générique 'User' si les deux noms sont vides", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API failure"));

    const result = await getUserImage("", "");

    expect(result).toContain("https://ui-avatars.com/api/");
    expect(result).toContain("name=User");
  });
});
