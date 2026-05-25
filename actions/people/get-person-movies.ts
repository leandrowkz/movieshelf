"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { getCastItems, getCrewItems } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number) => {
    const person = await tmdb.people.details(id)
    const isActor = person.known_for_department === "Acting"
    const { cast, crew } = await tmdb.people.movieCredits(id)

    const castItems = getCastItems(cast, "movie")
    const crewItems = getCrewItems(crew, "movie").sort(
      (a, b) => b.data.length - a.data.length,
    )

    return isActor ? [...castItems, ...crewItems] : [...crewItems, ...castItems]
  },
  ["person-movies"],
  { revalidate: 86400, tags: ["person"] },
)

export async function getPersonMovies(id: number) {
  return cached(id)
}
