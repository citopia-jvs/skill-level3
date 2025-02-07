export const calculateDaysUntilBirthday = (birthdate: Date) => {
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
  const timeDifference = nextBirthday.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
};

export const calculateAge = (date: Date) => {
  const today = new Date();
  const birthDate = new Date(date || '');
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
