"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => tmdb.people.details(id),
  ["person-details"],
  { revalidate: 1200, tags: ["person"] },
)

export async function getPersonDetails(id: number) {
  return cached(id)
}
