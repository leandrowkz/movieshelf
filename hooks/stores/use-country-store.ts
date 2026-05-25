import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { CountryCode } from "@leandrowkz/tmdb"
import { DEFAULT_COUNTRY } from "@/lib/countries"

type CountryStore = {
  country: CountryCode
  setCountry: (country: CountryCode) => void
}

export const useCountryStore = create<CountryStore>()(
  persist(
    (set) => ({
      country: DEFAULT_COUNTRY,
      setCountry: (country) => set({ country }),
    }),
    {
      name: "watch-provider-country",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
