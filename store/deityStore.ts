import { create } from 'zustand'

type Deity = 'rama' | 'krishna'

interface DeityState {
  currentDeity: Deity
  setDeity: (deity: Deity) => void
}

export const useDeityStore = create<DeityState>((set) => ({
  currentDeity: 'krishna',
  setDeity: (deity) => set({ currentDeity: deity })
}))