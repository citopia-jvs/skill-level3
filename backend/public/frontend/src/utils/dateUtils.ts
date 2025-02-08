const calculateDaysUntilBirthday = (birthDate: string) => {
    if (!birthDate) return "N/A";

    const today = new Date();
    const birth = new Date(birthDate);

    birth.setFullYear(today.getFullYear());

    if (birth < today) {
        birth.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = birth.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default calculateDaysUntilBirthday;
