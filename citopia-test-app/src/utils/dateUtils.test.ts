import { describe, test, expect } from "vitest";
import { calculateDaysToBirthday } from "./dateUtils";

/**
 * Tests unitaires pour la fonction calculateDaysToBirthday
 * Cette fonction permet de calculer le nombre de jours restant avant le prochain anniversaire
 * en partant de la date de naissance d'un utilisateur
 */
describe("calculateDaysToBirthday", () => {
    test("should return -1 if birthday is not defined", () => {
        expect(calculateDaysToBirthday(null)).toBe(-1);
    });

    test("should return 0 if birthday is today", () => {
        const today = new Date();
        expect(calculateDaysToBirthday(today)).toBe(0);
    });

    test("should return a positive number if birthday is in the future", () => {
        const futurDate = new Date();
        futurDate.setDate(futurDate.getDate() + 10);
        expect(calculateDaysToBirthday(futurDate)).toBe(10);
    });

    test("should return the number of days until next year birthday", () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const days = calculateDaysToBirthday(pastDate);
        expect(days).toBeGreaterThan(0);
    });
});