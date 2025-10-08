import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getUserImageUrl } from "../../services/api";
import { LIGHT_THEME, DARK_THEME } from "../../constants/colors";
import { getContrastRatio, meetsWCAG } from "../../utils/colorContrast";

function setTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

describe("getUserImageUrl", () => {
  beforeEach(() => {
    setTheme("light");
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      throw new Error("fetch ne devrait pas être appelé par getUserImageUrl");
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("retourne une URL avec le nom encodé (mode clair)", () => {
    const url = getUserImageUrl("John", "Doe");
    expect(url).toContain("https://dummyjson.com/image/128x128/");
    expect(url).toContain("John%20Doe");
    const accent = LIGHT_THEME.accent.primary.replace("#", "");
    expect(url).toContain(`/${accent}/`);
  });

  it("retourne une URL avec fallback si noms vides", () => {
    const url = getUserImageUrl("", "");
    expect(url).toContain("Utilisateur");
  });

  it("utilise l’accent sombre en mode dark", () => {
    setTheme("dark");
    const url = getUserImageUrl("Alice", "Stone");
    const accent = DARK_THEME.accent.primary.replace("#", "");
    expect(url).toContain(`/${accent}/`);
  });

  it("choisit une couleur de texte lisible (blanc ou texte primaire)", () => {
    const url = getUserImageUrl("Jane", "Doe");
    const match = url.match(
      /image\/128x128\/([0-9a-fA-F]{6})\/([0-9a-fA-F]{6})\?/
    );
    expect(match).not.toBeNull();
    if (!match) return;
    const [, bgHex, fgHex] = match;
    const bg = `#${bgHex}`;
    const fg = `#${fgHex}`;
    const ratio = getContrastRatio(bg, fg);
    expect(meetsWCAG(bg, fg, "AA", false)).toBe(true);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("peut forcer un accent très clair via accentOverride et choisir alors le texte sombre", () => {
    const url = getUserImageUrl("Test", "Contrast", {
      accentOverride: "#ffeed2",
    });
    const match = url.match(
      /image\/128x128\/([0-9a-fA-F]{6})\/([0-9a-fA-F]{6})\?/
    );
    expect(match).not.toBeNull();
    if (!match) return;
    const [, bgHex, fgHex] = match;
    const bg = `#${bgHex}`;
    const fg = `#${fgHex}`;
    expect(
      fg.toLowerCase() === LIGHT_THEME.text.primary.toLowerCase() ||
        fg === "#ffffff"
    ).toBe(true);
    expect(meetsWCAG(bg, fg, "AA", false)).toBe(true);
  });

  it("n'appelle pas fetch (aucun appel réseau requis)", () => {
    const spy = vi.spyOn(globalThis, "fetch");
    getUserImageUrl("No", "Fetch");
    expect(spy).not.toHaveBeenCalled();
  });
});
