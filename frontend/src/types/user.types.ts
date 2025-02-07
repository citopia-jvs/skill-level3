// src/types/user.types.ts
export interface UserState {
    firstName: string;
    lastName: string;
    birthDate: string;
    loading: boolean;
    error: string | null;
    avatarUrl: string | null;
}