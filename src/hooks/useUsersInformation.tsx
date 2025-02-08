import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/userTypes";

export const useUsersInformation = (firstName: string, lastName: string) => {
    return useQuery<User[]>({
        queryKey: ["users", firstName, lastName],
        queryFn: async (): Promise<User[]> => {
            const response = await axios.get(
                `https://dummyjson.com/users/search?q=${lastName}`
            );
            return response.data.users;
        },
        enabled: !!firstName && !!lastName,
        select: (data) =>
            data.map((user) => ({
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
            })),
    });
};
