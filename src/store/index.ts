import { create } from 'zustand';

export type User = {
    firstname: string;
    lastname: string;
    birthday: Date;
}

type StoreState = {
    user: User | null;
    setUser: (user: User) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user })
}))

export default useStore;