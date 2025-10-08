import React, { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';

/**
 * Provider pour le contexte utilisateur.
 * Ce fichier gère l'état global de l'utilisateur (lastName, firstName, birthDate)
 * et le fournit à ses composants enfants.
 */

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState({
        lastName: "", 
        firstName: "", 
        birthDate: ""
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};