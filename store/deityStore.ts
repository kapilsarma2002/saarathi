import { create } from 'zustand'

export type Deity = 'rama' | 'krishna'

interface DeityState {
  currentDeity: Deity
  setDeity: (deity: Deity) => void
}

export const useDeityStore = create<DeityState>((set) => ({
  currentDeity: 'krishna',
  setDeity: (deity) => set({ currentDeity: deity })
}))