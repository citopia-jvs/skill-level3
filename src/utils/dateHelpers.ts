export const isValidDate = (dateString: string): boolean => {
  // Vérifier que la chaîne n'est pas vide
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  const date = new Date(dateString);

  // Vérifier que la date est valide
  if (isNaN(date.getTime())) {
    return false;
  }

  // Vérifier que la date correspond bien à la chaîne entrée
  // Cela permet de détecter les dates impossibles comme "2024-02-30"
  // qui sont automatiquement converties par JavaScript
  if (dateString.includes("-")) {
    const [year, month, day] = dateString.split("T")[0].split("-");
    const parsedYear = date.getFullYear();
    const parsedMonth = date.getMonth() + 1;
    const parsedDay = date.getDate();

    return (
      parsedYear === parseInt(year) &&
      parsedMonth === parseInt(month) &&
      parsedDay === parseInt(day)
    );
  }

  return true;
};

export const formatDate = (
  dateString: string,
  locale: string = "fr-FR"
): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const calculateDaysUntilBirthday = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  const nextBirthday = new Date(currentYear, birth.getMonth(), birth.getDate());
  nextBirthday.setHours(0, 0, 0, 0);

  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const diffTime = nextBirthday.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
