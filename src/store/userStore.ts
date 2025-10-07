import {create} from 'zustand'

interface UserState {
  name: string
  firstName: string
  birthDate: string
  setName: (name: string) => void
  setFirstName: (firstName: string) => void
  setBirthDate: (birthDate: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  firstName: '',
  birthDate: '',
  setName: (name) => set({ name }),
  setFirstName: (firstName) => set({ firstName }),
  setBirthDate: (birthDate) => set({ birthDate }),
}))
