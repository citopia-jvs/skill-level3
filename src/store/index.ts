import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
    firstname?: string;
    lastname?: string;
    birthday?: Date;
    avatar?: string | null;
}

type StoreState = {
    user: User | null;
    setUser: (user: User | null) => void;
    setUserAvatar: (avatar: string | null) => void;
}

//Création d'un store persistant dans l'async storage
const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      setUserAvatar: (avatar: string | null) => set((state) => ({
        user: { ...state.user, avatar }
      })),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useStore;