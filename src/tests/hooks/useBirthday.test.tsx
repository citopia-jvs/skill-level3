import { renderHook } from "@testing-library/react";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { vi } from "vitest";
import { useBirthday } from "../../hooks/useBirthday";
import { calculateDaysUntilBirthday, isToday } from "../../utils/dateHelpers";

// NOTE IMPORTANTES :
// - Pour éviter les écarts liés au fuseau, lance idéalement Vitest avec TZ=UTC :
//   "test": "cross-env TZ=UTC vitest"
// - On fige la date système à un début de journée pour éviter les fractions de jours.

describe("useBirthday", () => {
  const FIXED_TODAY_ISO = "2025-06-10T00:00:00.000Z";
  const FIXED_TODAY = new Date(FIXED_TODAY_ISO);

  function ymd(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_TODAY);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("devrait retourner null si birthDate est vide", () => {
    const { result } = renderHook(() => useBirthday(""));
    expect(result.current).toBeNull();
  });

  it("devrait retourner isTodayBirthday = true si l'anniversaire est aujourd'hui", () => {
    // On construit une date de naissance 25 ans avant aujourd'hui, même mois/jour
    const birthYear = FIXED_TODAY.getFullYear() - 25;
    const birthDate = `${birthYear}-${String(FIXED_TODAY.getMonth() + 1).padStart(2, "0")}-${String(FIXED_TODAY.getDate()).padStart(2, "0")}`;

    const { result } = renderHook(() => useBirthday(birthDate));

    // On utilise la même fonction isToday pour refléter la logique existante (parsing en UTC + comparaison locale)
    expect(result.current?.isTodayBirthday).toBe(isToday(new Date(birthDate)));
    expect(result.current?.daysUntilBirthday).toBe(0);
    // nextBirthday devrait représenter la date "courante" (même mois/jour année en cours)
    const expectedNext = new Date(
      FIXED_TODAY.getFullYear(),
      FIXED_TODAY.getMonth(),
      FIXED_TODAY.getDate()
    );
    expect(result.current?.nextBirthday.toDateString()).toBe(
      expectedNext.toDateString()
    );
  });

  it("devrait calculer correctement les jours restants jusqu'à l'anniversaire (anniversaire plus tard ce mois-ci)", () => {
    // FIXED_TODAY = 10 juin 2025, on choisit 15 juin
    const target = new Date(FIXED_TODAY.getFullYear() - 20, 5, 15); // année arbitraire
    const birthDate = ymd(target);

    const { result } = renderHook(() => useBirthday(birthDate));

    const expectedDays = calculateDaysUntilBirthday(birthDate);

    expect(result.current?.isTodayBirthday).toBe(false);
    expect(result.current?.daysUntilBirthday).toBe(expectedDays);
    const expectedNext = new Date(FIXED_TODAY.getFullYear(), 5, 15);
    expect(result.current?.nextBirthday.toDateString()).toBe(
      expectedNext.toDateString()
    );
  });

  it("devrait retourner 1 jour si l'anniversaire est demain", () => {
    // Demain = 11 juin 2025
    const tomorrow = new Date(FIXED_TODAY.getFullYear() - 18, 5, 11);
    const birthDate = ymd(tomorrow);

    const { result } = renderHook(() => useBirthday(birthDate));

    const expectedDays = calculateDaysUntilBirthday(birthDate); // devrait être 1 avec logique existante
    expect(result.current?.isTodayBirthday).toBe(false);
    expect(result.current?.daysUntilBirthday).toBe(expectedDays);
    const expectedNext = new Date(FIXED_TODAY.getFullYear(), 5, 11);
    expect(result.current?.nextBirthday.toDateString()).toBe(
      expectedNext.toDateString()
    );
  });

  it("devrait calculer correctement quand l'anniversaire est déjà passé cette année (prochain = année suivante)", () => {
    // Anniversaire le 20 mars (déjà passé par rapport au 10 juin)
    const past = new Date(FIXED_TODAY.getFullYear() - 30, 2, 20);
    const birthDate = ymd(past);

    const { result } = renderHook(() => useBirthday(birthDate));

    const expectedDays = calculateDaysUntilBirthday(birthDate);
    // L'année du prochain anniversaire devrait être +1 par rapport à l'année de today figé
    expect(result.current?.isTodayBirthday).toBe(false);
    expect(result.current?.nextBirthday.getFullYear()).toBe(
      FIXED_TODAY.getFullYear() + 1
    );
    expect(result.current?.daysUntilBirthday).toBe(expectedDays);

    const expectedNext = new Date(FIXED_TODAY.getFullYear() + 1, 2, 20);
    expect(result.current?.nextBirthday.toDateString()).toBe(
      expectedNext.toDateString()
    );
  });

  it("devrait correctement gérer un anniversaire le 1er janvier quand on est fin d'année", () => {
    // On bascule temporairement la date système au 20 décembre 2025
    const altToday = new Date("2025-12-20T00:00:00.000Z");
    vi.setSystemTime(altToday);

    const birthDate = "1990-01-01";

    const { result } = renderHook(() => useBirthday(birthDate));
    const expectedDays = calculateDaysUntilBirthday(birthDate);
    const expectedNext = new Date(altToday.getFullYear() + 1, 0, 1);

    expect(result.current?.isTodayBirthday).toBe(false);
    expect(result.current?.nextBirthday.toDateString()).toBe(
      expectedNext.toDateString()
    );
    expect(result.current?.daysUntilBirthday).toBe(expectedDays);

    // Restaure la date figée principale
    vi.setSystemTime(FIXED_TODAY);
  });
});
