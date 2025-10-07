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