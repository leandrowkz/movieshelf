"use server"

import { unstable_cache } from "next/cache"
import type { Image } from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => {
    const response = (await tmdb.people.images(id)) as unknown as {
      id: number
      profiles: Image[]
    }
    return response.profiles
  },
  ["person-images"],
  { revalidate: 86400, tags: ["person"] },
)

export async function getPersonImages(id: number) {
  return cached(id)
}
