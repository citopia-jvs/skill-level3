import axios from 'axios';

export interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl?: string;
}

/**
 * Fetch a random user from DummyJSON API.
 * Falls back to a default user if DummyJSON fails.
 */
export const fetchUser = async (): Promise<User> => {
    try {
        console.log("Fetching user from DummyJSON...");

        // Fetch a random user (instead of always using /1)
        const response = await axios.get("https://dummyjson.com/users");

        if (response.data.users && response.data.users.length > 0) {
            const randomUser = response.data.users[Math.floor(Math.random() * response.data.users.length)];
            console.log("Selected User:", randomUser);

            return {
                firstName: randomUser.firstName,
                lastName: randomUser.lastName,
                birthDate: randomUser.birthDate || '',
                avatarUrl: randomUser.image || `https://i.pravatar.cc/150?u=${randomUser.firstName}-${randomUser.lastName}`
            };
        }

        console.warn("No users found in DummyJSON, using fallback user...");
    } catch (error) {
        console.error("❌ Error fetching user:", error);
    }

    // 🛑 Fallback if API fails
    return {
        firstName: "John",
        lastName: "Doe",
        birthDate: "1990-01-01",
        avatarUrl: "https://i.pravatar.cc/150?u=John-Doe"
    };
};
