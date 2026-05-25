"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { getCastItems, getCrewItems } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number) => {
    const person = await tmdb.people.details(id)
    const isActor = person.known_for_department === "Acting"
    const { cast, crew } = await tmdb.people.tvCredits(id)

    const castItems = getCastItems(cast, "tv")
    const crewItems = getCrewItems(crew, "tv").sort(
      (a, b) => b.data.length - a.data.length,
    )

    return isActor ? [...castItems, ...crewItems] : [...crewItems, ...castItems]
  },
  ["person-shows"],
  { revalidate: 86400, tags: ["person"] },
)

export async function getPersonShows(id: number) {
  return cached(id)
}
