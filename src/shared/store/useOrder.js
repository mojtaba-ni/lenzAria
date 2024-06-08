import { create } from 'zustand'

export const useOrder = create((set) => ({
  orderList: [],
  updateOrderList: (data) => set((state) => ({ orderList : [...state.orderList,data]})),
}))