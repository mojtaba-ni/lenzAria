import { create } from 'zustand'

export const useFavorite = create((set) => ({
  favoriteList: [],
  updateFavoriteList: (data) => set((state) => ({ favoriteList : [...state.favoriteList,data]})),
}))