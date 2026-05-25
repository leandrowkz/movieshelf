import { create } from "zustand"

type SearchStore = {
  open: boolean
  setOpen: (open: boolean) => void
  openSearch: () => void
  closeSearch: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openSearch: () => set({ open: true }),
  closeSearch: () => set({ open: false }),
}))
