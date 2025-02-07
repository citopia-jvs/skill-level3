import dayjs from 'dayjs';

export const getDaysUntilBirthday = (birthDate: string): number => {
    if (!birthDate) return 0;

    const today = dayjs();
    const birthday = dayjs(birthDate);
    const nextBirthday = birthday.year(today.year());

    if (nextBirthday.isBefore(today)) {
        return nextBirthday.add(1, 'year').diff(today, 'day');
    }

    return nextBirthday.diff(today, 'day');
};