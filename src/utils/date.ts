export function daysLeft(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    birth.setFullYear(today.getFullYear());

    const diff = birth.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));

    if (days < 0) {
        birth.setFullYear(today.getFullYear() + 1);
        const newDiff = birth.getTime() - today.getTime();
        return Math.ceil(newDiff / (1000 * 3600 * 24));
    }
    return days > 0 ? days : 0;
}

export function getTimeUntilBirthday(birthDate: string) {
    const today = new Date();
    const birth = new Date(birthDate);
    birth.setFullYear(today.getFullYear());

    if (birth < today) birth.setFullYear(today.getFullYear() + 1);

    const diff = birth.getTime() - today.getTime();

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isBirthdayToday: isSameDay(today, new Date(birthDate)) };
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth()
  );
}