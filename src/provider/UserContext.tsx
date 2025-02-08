import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserContextType } from "../types/userTypes";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const handleUserInformation = (values: User) => {
        setUser(values);
    };

    return (
        <UserContext.Provider value={{ user, handleUserInformation }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserProvider = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
