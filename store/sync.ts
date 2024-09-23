import { create } from "zustand"
import { persist, type PersistStorage } from "zustand/middleware"

import { syncStorage } from "."

const storageAdaptor = {
  getItem: async (name: string) => {
    const result = await syncStorage.get<string>(name)
    return result ?? null
  },
  setItem: async (name: string, value: string) => {
    await syncStorage.set(name, value)
  },
  removeItem: async (name: string) => {
    await syncStorage.remove(name)
  }
}

interface Item {
  id: string
  title: string
  completeText: string
}

interface Store {
  list: Item[]
  add: (item: Item, index?: number) => void
  remove: (id: string) => void
}

export const useSyncCompleteListStore = create(
  persist<Store>(
    (set) => ({
      list: [],
      add: (item: Item, index?: number) => {
        if (index === undefined) {
          set((state) => ({ list: [...state.list, item] }))
          return
        }
        set((state) => ({
          list: [
            ...state.list.slice(0, index),
            item,
            ...state.list.slice(index)
          ]
        }))
      },
      remove: (id: string) =>
        set((state) => ({ list: state.list.filter((i) => i.id !== id) }))
    }),
    {
      name: "zustand-chrome-storage",
      storage: storageAdaptor as unknown as PersistStorage<Store>
    }
  )
)
