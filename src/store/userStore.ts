import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  name: string
  firstName: string
  birthDate: string
  setName: (name: string) => void
  setFirstName: (firstName: string) => void
  setBirthDate: (birthDate: string) => void
}

export const useUserStore = create<UserState>()(persist(
    (set) => ({
        name: '',
        firstName: '',
        birthDate: '',
        setName: (name) => set({ name }),
        setFirstName: (firstName) => set({ firstName }),
        setBirthDate: (birthDate) => set({ birthDate }),
    }),
    { name: 'user-key' }
));