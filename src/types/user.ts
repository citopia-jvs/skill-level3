export type User = {
  firstName: string;
  lastName: string;
  birthDate: string;
};

export interface UserStore {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setBirthDate: (birthDate: string) => void;
  setUser: (user: Partial<User>) => void;
  resetUser: () => void;
}

export interface BirthdayInfo {
  daysUntilBirthday: number;
  nextBirthday: Date;
  isTodayBirthday: boolean;
}
