/**
 * La fonction calculateDaysToBirthday permet de calculer le nombre de jours avant le prochain anniversaire d'un utilisateur
 * @param birthDate - date de naissance de l'utilisateur
 * @returns le nombre de jours avant le prochain anniversaire de l'utilisateur
 */

export function calculateDaysToBirthday(birthDate: Date | null | undefined): number {
    if(!birthDate) {
        return -1;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());
    nextBirthday.setHours(0, 0, 0, 0);

    if( nextBirthday.getTime() < today.getTime()) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const differenceOfTime = nextBirthday.getTime() - today.getTime();
    const daysToBirthday = Math.floor(differenceOfTime / (1000 * 60 * 60 * 24));

    return daysToBirthday;
}