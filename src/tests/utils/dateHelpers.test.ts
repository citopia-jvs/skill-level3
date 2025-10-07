import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  isValidDate,
  formatDate,
  isToday,
  calculateDaysUntilBirthday,
} from "../../utils/dateHelpers";

describe("date-utils", () => {
  describe("isValidDate", () => {
    it("devrait retourner true pour une date valide au format ISO", () => {
      expect(isValidDate("2024-01-15")).toBe(true);
    });

    it("devrait retourner true pour une date valide au format US", () => {
      expect(isValidDate("01/15/2024")).toBe(true);
    });

    it("devrait retourner false pour une chaîne invalide", () => {
      expect(isValidDate("not-a-date")).toBe(false);
    });

    it("devrait retourner false pour une chaîne vide", () => {
      expect(isValidDate("")).toBe(false);
    });

    it("devrait retourner false pour une date impossible", () => {
      expect(isValidDate("2024-02-30")).toBe(false);
    });
  });

  describe("formatDate", () => {
    it("devrait formater une date en français par défaut", () => {
      const result = formatDate("2024-06-15");
      expect(result).toBe("15 juin 2024");
    });

    it("devrait formater une date avec une locale spécifiée (en-US)", () => {
      const result = formatDate("2024-06-15", "en-US");
      expect(result).toBe("June 15, 2024");
    });

    it("devrait formater une date avec une locale spécifiée (es-ES)", () => {
      const result = formatDate("2024-06-15", "es-ES");
      expect(result).toBe("15 de junio de 2024");
    });

    it("devrait gérer les dates au format timestamp", () => {
      const result = formatDate("2024-12-25T10:30:00Z");
      expect(result).toBe("25 décembre 2024");
    });
  });

  describe("isToday", () => {
    it("devrait retourner true pour la date actuelle", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it("devrait retourner true même avec des heures différentes", () => {
      const todayMorning = new Date();
      todayMorning.setHours(8, 30, 0, 0);
      expect(isToday(todayMorning)).toBe(true);
    });

    it("devrait retourner false pour hier", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it("devrait retourner false pour demain", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe("calculateDaysUntilBirthday", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("devrait calculer les jours restants jusqu'à un anniversaire futur cette année", () => {
      vi.setSystemTime(new Date("2024-06-15T12:00:00"));
      const days = calculateDaysUntilBirthday("1990-12-25");
      expect(days).toBe(193);
    });

    it("devrait calculer pour un anniversaire passé cette année (année suivante)", () => {
      vi.setSystemTime(new Date("2024-06-15T12:00:00"));
      const days = calculateDaysUntilBirthday("1990-01-01");
      expect(days).toBe(200);
    });

    it("devrait retourner 1 si l'anniversaire est demain", () => {
      vi.setSystemTime(new Date("2024-06-14T12:00:00"));
      const days = calculateDaysUntilBirthday("1990-06-15");
      expect(days).toBe(1);
    });

    it("devrait retourner 0 si l'anniversaire est aujourd'hui", () => {
      vi.setSystemTime(new Date("2024-06-15T12:00:00"));
      const days = calculateDaysUntilBirthday("1990-06-15");
      expect(days).toBe(0);
    });

    it("devrait gérer les années bissextiles", () => {
      vi.setSystemTime(new Date("2024-02-28T12:00:00"));
      const days = calculateDaysUntilBirthday("1990-02-29");
      expect(days).toBe(2);
    });
  });
});
