import { describe, it, expect } from "vitest";
import { meetsWCAG } from "../utils/colorContrast";
import { THEMES } from "../constants/colors";

describe("Accessibilité des thèmes - Contraste WCAG", () => {
  describe("Thème clair", () => {
    const { background, text, accent, semantic } = THEMES.light;

    describe("Texte sur arrière-plans", () => {
      it("devrait avoir un contraste suffisant pour le texte primaire sur fond primaire (AA)", () => {
        expect(meetsWCAG(text.primary, background.primary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte secondaire sur fond primaire (AA)", () => {
        expect(meetsWCAG(text.secondary, background.primary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte tertiaire sur fond primaire (AA)", () => {
        expect(meetsWCAG(text.tertiary, background.primary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte primaire sur fond secondaire (AA)", () => {
        expect(meetsWCAG(text.primary, background.secondary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte primaire sur fond tertiaire (AA)", () => {
        expect(meetsWCAG(text.primary, background.tertiary, "AA")).toBe(true);
      });
    });

    describe("Couleurs d'accentuation sur arrière-plans", () => {
      it("devrait avoir un contraste suffisant pour l'accent primaire sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(accent.primary, background.primary, "AA", true)).toBe(
          true
        );
      });

      it("devrait avoir un contraste suffisant pour l'accent hover sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(accent.hover, background.primary, "AA", true)).toBe(
          true
        );
      });
    });

    describe("Couleurs sémantiques sur arrière-plans", () => {
      it("devrait avoir un contraste suffisant pour la couleur de succès sur fond primaire (AA texte large)", () => {
        expect(
          meetsWCAG(semantic.success, background.primary, "AA", true)
        ).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour la couleur d'erreur sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(semantic.error, background.primary, "AA", true)).toBe(
          true
        );
      });

      it("devrait avoir un contraste suffisant pour la couleur d'avertissement sur fond primaire (AA texte large)", () => {
        expect(
          meetsWCAG(semantic.warning, background.primary, "AA", true)
        ).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour la couleur d'information sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(semantic.info, background.primary, "AA", true)).toBe(
          true
        );
      });
    });
  });

  describe("Thème sombre", () => {
    const { background, text, accent, semantic } = THEMES.dark;

    describe("Texte sur arrière-plans", () => {
      it("devrait avoir un contraste suffisant pour le texte primaire sur fond primaire (AA)", () => {
        expect(meetsWCAG(text.primary, background.primary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte secondaire sur fond primaire (AA)", () => {
        expect(meetsWCAG(text.secondary, background.primary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte tertiaire sur fond primaire (AA)", () => {
        expect(meetsWCAG(text.tertiary, background.primary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte primaire sur fond secondaire (AA)", () => {
        expect(meetsWCAG(text.primary, background.secondary, "AA")).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour le texte primaire sur fond tertiaire (AA)", () => {
        expect(meetsWCAG(text.primary, background.tertiary, "AA")).toBe(true);
      });
    });

    describe("Couleurs d'accentuation sur arrière-plans", () => {
      it("devrait avoir un contraste suffisant pour l'accent primaire sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(accent.primary, background.primary, "AA", true)).toBe(
          true
        );
      });

      it("devrait avoir un contraste suffisant pour l'accent hover sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(accent.hover, background.primary, "AA", true)).toBe(
          true
        );
      });
    });

    describe("Couleurs sémantiques sur arrière-plans", () => {
      it("devrait avoir un contraste suffisant pour la couleur de succès sur fond primaire (AA texte large)", () => {
        expect(
          meetsWCAG(semantic.success, background.primary, "AA", true)
        ).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour la couleur d'erreur sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(semantic.error, background.primary, "AA", true)).toBe(
          true
        );
      });

      it("devrait avoir un contraste suffisant pour la couleur d'avertissement sur fond primaire (AA texte large)", () => {
        expect(
          meetsWCAG(semantic.warning, background.primary, "AA", true)
        ).toBe(true);
      });

      it("devrait avoir un contraste suffisant pour la couleur d'information sur fond primaire (AA texte large)", () => {
        expect(meetsWCAG(semantic.info, background.primary, "AA", true)).toBe(
          true
        );
      });
    });
  });

  describe("Cohérence entre thèmes", () => {
    it("les deux thèmes devraient avoir le même nombre de catégories de couleurs", () => {
      expect(Object.keys(THEMES.light)).toEqual(Object.keys(THEMES.dark));
    });

    it("les deux thèmes devraient avoir la même structure de couleurs d'arrière-plan", () => {
      expect(Object.keys(THEMES.light.background)).toEqual(
        Object.keys(THEMES.dark.background)
      );
    });

    it("les deux thèmes devraient avoir la même structure de couleurs de texte", () => {
      expect(Object.keys(THEMES.light.text)).toEqual(
        Object.keys(THEMES.dark.text)
      );
    });

    it("les deux thèmes devraient avoir la même structure de couleurs d'accentuation", () => {
      expect(Object.keys(THEMES.light.accent)).toEqual(
        Object.keys(THEMES.dark.accent)
      );
    });

    it("les deux thèmes devraient avoir la même structure de couleurs sémantiques", () => {
      expect(Object.keys(THEMES.light.semantic)).toEqual(
        Object.keys(THEMES.dark.semantic)
      );
    });
  });
});
