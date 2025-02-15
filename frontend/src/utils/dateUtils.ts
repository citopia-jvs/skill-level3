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
            nextBirthday = nextBirthday.add(1, 'year');
            if (!nextBirthday.isLeapYear()) {
                nextBirthday = nextBirthday.month(1).date(28); // Fallback to Feb 28th
            }
        }
    }

    // If the next birthday has already passed in the current year, add 1 year
    if (nextBirthday.isBefore(today)) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    const daysUntilBirthday = nextBirthday.diff(today, 'day');

    // Ensure if it's the next day, it returns 1
    if (daysUntilBirthday === 0 && nextBirthday.isAfter(today)) {
        return 1;
    }

    return daysUntilBirthday;
};
