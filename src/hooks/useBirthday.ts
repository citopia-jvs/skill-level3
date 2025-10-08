import { useMemo } from "react";
import type { BirthdayInfo } from "../types/user";
import { calculateDaysUntilBirthday, isToday } from "../utils/dateHelpers";

export const useBirthday = (birthDate: string): BirthdayInfo | null => {
  return useMemo(() => {
    if (!birthDate) return null;

    const birthDateObj = new Date(birthDate);

    const daysUntilBirthday = calculateDaysUntilBirthday(birthDate);
    const isTodayBirthday = isToday(birthDateObj);

    const today = new Date();
    const currentYear = today.getFullYear();
    const nextBirthday = new Date(
      currentYear,
      birthDateObj.getMonth(),
      birthDateObj.getDate()
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    return {
      daysUntilBirthday,
      nextBirthday,
      isTodayBirthday,
    };
  }, [birthDate]);
};
