import { getDaysUntilBirthday } from '@/utils/dateUtils';
import dayjs from 'dayjs';

describe('getDaysUntilBirthday', () => {
    test('returns 0 when no birthDate is provided', () => {
        expect(getDaysUntilBirthday("")).toBe(0);
    });

    test('calculates days for a birthday that has not yet passed this year', () => {
        const today = dayjs().startOf('day');
// Suppose the birthday is tomorrow
        const tomorrow = today.add(1, 'day').format('YYYY-MM-DD');
        expect(getDaysUntilBirthday(tomorrow)).toBe(1);
    });

    test('handles leap day birthdays properly', () => {
// Scenario for Feb 29 birthdays.
    });
});