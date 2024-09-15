import { create } from "zustand"
import { persist } from "zustand/middleware"

const chromeStorage = {
  getItem: (name) =>
    new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name])
      })
    }),
  setItem: (name, value) =>
    new Promise<void>((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve()
      })
    }),
  removeItem: (name) =>
    new Promise<void>((resolve) => {
      chrome.storage.local.remove([name], () => {
        resolve()
      })
    })
}

interface Item {
  id: number
  title: string
  completeText: string
}

export const useListStore = create(
  persist(
    (set) => ({
      list: [
        {
          id: 1,
          title: "test-1",
          completeText: "test-1-complete"
        },
        {
          id: 2,
          title: "test-2",
          completeText: "test-2-complete"
        }
      ] as Item[],
      add: (index: number, item: Item) =>
        set((list) => [...list.slice(0, index), item, ...list.slice(index)])
    }),
    {
      name: "zustand-chrome-storage",
      storage: chromeStorage
    }
  )
)
