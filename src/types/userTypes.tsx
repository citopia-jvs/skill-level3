export interface User {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    image?: string;
}

export interface UserContextType {
    user: User | null;
    handleUserInformation: (values: User) => void;
}
