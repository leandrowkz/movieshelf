import { TMDB_IMAGE_BASE } from "@/lib/constants"

export const POSTER_SIZES = {
  w92: "w92",
  w154: "w154",
  w185: "w185",
  w342: "w342",
  w500: "w500",
  w780: "w780",
  original: "original",
} as const

export const BACKDROP_SIZES = {
  w300: "w300",
  w780: "w780",
  w1280: "w1280",
  original: "original",
} as const

export const PROFILE_SIZES = {
  w45: "w45",
  w185: "w185",
  h632: "h632",
  original: "original",
} as const

type Size = string

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: Size = "original",
): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}
