import dayjs from "dayjs";

const getDummyImage = async (firstname: string, lastname: string, height: number, width: number) => {
    try {
        const response = await fetch(`https://dummyjson.com/image/${ width }x${ height }/008080/ffffff?text=${ firstname } ${ lastname }`);
        const blob: Blob = await response.blob();

        // Conversion du Blob en base64
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                resolve(base64data);
            };
            reader.onerror = () => {
                reject(new Error('Failed to convert blob to base64'));
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(error)
        throw error;
    }
}

const getNbrDaysUntilBirthday = (birthdate: Date) => {
    const today = dayjs().startOf('day');
    const birthDate = dayjs(birthdate).startOf('day');

    let nextBirthday = dayjs(new Date(
        today.year(),
        birthDate.month(),
        birthDate.date()
    )).startOf('day');
    
    // Si cette date est déjà passée, on prend l'anniversaire de l'année prochaine
    if (nextBirthday.isBefore(today)) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    // Retour du nombre de jours entre aujourd'hui et le prochain anniversaire
    return nextBirthday.diff(today, 'day');
}

export { 
    getDummyImage,
    getNbrDaysUntilBirthday
};