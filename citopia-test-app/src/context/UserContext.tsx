import React, { createContext } from 'react';

/**
 * Type du contexte utilisateur.
 * Ce fichier contient l'objet "user" avec lastName, firstName et birthDate
 * et la fonction "setUser" pour mettre à jour ces valeurs.
 */

export interface User {
    lastName: string;
    firstName: string;
    birthDate: string;
}

// Contexte utilisateur initialisé à undefined.
export interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
