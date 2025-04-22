import { create } from 'zustand'

export const useSearch = create((set) => ({
  title: null,
  updateTitle: () => set((state) => ({ title: state })),
}))