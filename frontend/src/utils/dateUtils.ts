import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';  // Import the leap year plugin

// Extend dayjs with the isLeapYear plugin
dayjs.extend(isLeapYear);

export const getDaysUntilBirthday = (birthDate: string): number => {
    if (!birthDate) return 0;

    const today = dayjs();
    const birthday = dayjs(birthDate);
    let nextBirthday = birthday.year(today.year());

    // Check if the birthday is on February 29th and handle the leap year case
    if (birthday.month() === 1 && birthday.date() === 29) {
        if (!nextBirthday.isLeapYear()) {
            // Move to the next leap year and adjust if needed
            nextBirthday = nextBirthday.add(1, 'year');
            if (!nextBirthday.isLeapYear()) {
                // If the next year isn't a leap year, fallback to February 28th
                nextBirthday = nextBirthday.month(1).date(28);
            }
        }
    }

    // If the next birthday has already passed in the current year, add 1 year
    if (nextBirthday.isBefore(today)) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    return nextBirthday.diff(today, 'day');
};
