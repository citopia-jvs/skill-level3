import { describe, it, expect } from "vitest";
import {
  getRelativeLuminance,
  getContrastRatio,
  meetsWCAG,
} from "../../utils//colorContrast";

describe("color-utils", () => {
  describe("getRelativeLuminance", () => {
    it("devrait calculer la luminance relative pour le blanc", () => {
      expect(getRelativeLuminance("#ffffff")).toBeCloseTo(1, 2);
    });

    it("devrait calculer la luminance relative pour le noir", () => {
      expect(getRelativeLuminance("#000000")).toBe(0);
    });

    it("devrait calculer correctement pour une couleur grise", () => {
      const luminance = getRelativeLuminance("#808080");
      expect(luminance).toBeGreaterThan(0);
      expect(luminance).toBeLessThan(1);
    });

    it("devrait gérer les couleurs sans le symbole #", () => {
      expect(getRelativeLuminance("ffffff")).toBeCloseTo(1, 2);
    });
  });

  describe("getContrastRatio", () => {
    it("devrait retourner 21 pour noir sur blanc", () => {
      expect(getContrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
    });

    it("devrait retourner 1 pour deux couleurs identiques", () => {
      expect(getContrastRatio("#ff0000", "#ff0000")).toBe(1);
    });

    it("devrait être symétrique (couleur1 vs couleur2 = couleur2 vs couleur1)", () => {
      const ratio1 = getContrastRatio("#ff0000", "#00ff00");
      const ratio2 = getContrastRatio("#00ff00", "#ff0000");
      expect(ratio1).toBeCloseTo(ratio2, 5);
    });

    it("devrait calculer le ratio pour des couleurs intermédiaires", () => {
      const ratio = getContrastRatio("#666666", "#cccccc");
      expect(ratio).toBeGreaterThan(1);
      expect(ratio).toBeLessThan(21);
    });
  });

  describe("meetsWCAG", () => {
    describe("niveau AA", () => {
      it("devrait retourner true pour noir sur blanc (texte normal)", () => {
        expect(meetsWCAG("#000000", "#ffffff", "AA", false)).toBe(true);
      });

      it("devrait retourner false si le ratio est inférieur à 4.5 (texte normal)", () => {
        expect(meetsWCAG("#777777", "#ffffff", "AA", false)).toBe(false);
      });

      it("devrait retourner true si le ratio est supérieur à 3.0 (texte large)", () => {
        expect(meetsWCAG("#777777", "#ffffff", "AA", true)).toBe(true);
      });

      it("devrait utiliser AA par défaut si non spécifié", () => {
        expect(meetsWCAG("#000000", "#ffffff")).toBe(true);
      });
    });

    describe("niveau AAA", () => {
      it("devrait retourner true pour noir sur blanc (texte normal)", () => {
        expect(meetsWCAG("#000000", "#ffffff", "AAA", false)).toBe(true);
      });

      it("devrait retourner false si le ratio est inférieur à 7.0 (texte normal)", () => {
        // Utilisons une couleur qui génère un ratio < 7.0
        expect(meetsWCAG("#666666", "#ffffff", "AAA", false)).toBe(false);
      });

      it("devrait retourner true si le ratio est supérieur à 4.5 (texte large)", () => {
        expect(meetsWCAG("#595959", "#ffffff", "AAA", true)).toBe(true);
      });
    });

    it("devrait gérer uniquement le format hex à 6 caractères", () => {
      expect(meetsWCAG("#000000", "#ffffff", "AA")).toBe(true);
    });
  });
});
