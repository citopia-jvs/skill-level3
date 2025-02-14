// getDaysUntilBirthday.test.ts
import { getDaysUntilBirthday } from '@/utils/dateUtils';
import dayjs from 'dayjs';

// A simple test example using Jest:
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
// Here you'd set up a scenario for Feb 29 birthdays.
// Adjust the test date with dayjs or using jest.spyOn to fake the current date.
// For example, if the current date is Feb 28 of a non-leap year,
// then getDaysUntilBirthday from "2000-02-29" should return 0 or 1, depending on your logic.
    });
});