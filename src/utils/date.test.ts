import { daysLeft } from "./date";
import { describe, expect, test } from '@jest/globals';

describe("daysLeft", () => {
    test("return 0 if birthday is today", () => {
        const today = new Date();
        const birthDate = today.toISOString().split('T')[0];
        expect(daysLeft(birthDate)).toBe(0);
    });

    test("return 1 if birthday is tomorrow", () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const birthDate = tomorrow.toISOString().split('T')[0];
        expect(daysLeft(birthDate)).toBe(1);
    });

    test("return 24 if birthday is in 24 days", () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 24);
        const birthDate = futureDate.toISOString().split('T')[0];
        expect(daysLeft(birthDate)).toBe(24);
    });

    test("return 364 if birthday was yesterday", () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const birthDate = pastDate.toISOString().split('T')[0];
        expect(daysLeft(birthDate)).toBe(364);
    });
});