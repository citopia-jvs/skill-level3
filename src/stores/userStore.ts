import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserStore } from "../types/user";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      birthDate: "",
      setFirstName: (firstName: string) => set({ firstName }),
      setLastName: (lastName: string) => set({ lastName }),
      setBirthDate: (birthDate: string) => set({ birthDate }),
      setUser: (user: Partial<User>) => set(user),
      resetUser: () =>
        set(() => ({ firstName: "", lastName: "", birthDate: "" })),
    }),
    { name: "user-storage" }
  )
);
