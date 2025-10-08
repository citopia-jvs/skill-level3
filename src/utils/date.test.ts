import { daysLeft, getTimeUntilBirthday } from "./date";
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

describe('getTimeUntilBirthday', () => {
  test('returns 0d and isBirthdayToday=true when its birthday', () => {
    const today = new Date();
    const r = getTimeUntilBirthday(today.toISOString().split('T')[0]);
    expect(r.isBirthdayToday).toBe(true);
  });

  test('returns isBirthdayToday=false when its tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const r = getTimeUntilBirthday(tomorrow.toISOString().split('T')[0]);
    expect(r.isBirthdayToday).toBe(false);
    expect(r.days).toBe(0);
    expect(r.hours).toBeGreaterThanOrEqual(0);
    expect(r.minutes).toBeGreaterThanOrEqual(0);
    expect(r.seconds).toBeGreaterThanOrEqual(0);
  });

  test('return greater than 360 days when its next year birthday', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const r = getTimeUntilBirthday(pastDate.toISOString().split('T')[0]);
    expect(r.days).toBeGreaterThan(360);
    expect(r.isBirthdayToday).toBe(false);
  });
});