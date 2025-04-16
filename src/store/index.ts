import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
    firstname: string;
    lastname: string;
    birthday: Date;
}

type StoreState = {
    user: User | null;
    setUser: (user: User | null) => void;
}

//Création d'un store persistant dans l'async storage
const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user })
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useStore;