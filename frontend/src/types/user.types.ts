export interface UserState {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl: string | undefined; // Avoid using null, use undefined
}
