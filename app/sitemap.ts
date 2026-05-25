import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { getMoviesPopular } from "@/actions/movies/get-movies-popular"
import { getMoviesTrending } from "@/actions/movies/get-movies-trending"
import { getShowsPopular } from "@/actions/shows/get-shows-popular"
import { getShowsTopRated } from "@/actions/shows/get-shows-top-rated"
import { getMovieGenres } from "@/actions/genres/get-movie-genres"
import { getShowGenres } from "@/actions/genres/get-show-genres"

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [
    moviesPop1,
    moviesPop2,
    moviesPop3,
    moviesTrending,
    showsPop1,
    showsPop2,
    showsPop3,
    showsTop,
    movieGenres,
    showGenres,
  ] = await Promise.all([
    getMoviesPopular(1).catch(() => ({ data: [] })),
    getMoviesPopular(2).catch(() => ({ data: [] })),
    getMoviesPopular(3).catch(() => ({ data: [] })),
    getMoviesTrending().catch(() => ({ data: [] })),
    getShowsPopular(1).catch(() => ({ data: [] })),
    getShowsPopular(2).catch(() => ({ data: [] })),
    getShowsPopular(3).catch(() => ({ data: [] })),
    getShowsTopRated(1).catch(() => ({ data: [] })),
    getMovieGenres().catch(() => []),
    getShowGenres().catch(() => []),
  ])

  const movieIds = new Set<number>()
  ;[...moviesPop1.data, ...moviesPop2.data, ...moviesPop3.data, ...moviesTrending.data].forEach(
    (m) => movieIds.add(m.id),
  )

  const showIds = new Set<number>()
  ;[...showsPop1.data, ...showsPop2.data, ...showsPop3.data, ...showsTop.data].forEach((s) =>
    showIds.add(s.id),
  )

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/movie`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/show`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  const movieGenreUrls: MetadataRoute.Sitemap = movieGenres.map((g) => ({
    url: `${SITE_URL}/movie/genre/${g.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const showGenreUrls: MetadataRoute.Sitemap = showGenres.map((g) => ({
    url: `${SITE_URL}/show/genre/${g.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const movieUrls: MetadataRoute.Sitemap = Array.from(movieIds).map((id) => ({
    url: `${SITE_URL}/movie/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const showUrls: MetadataRoute.Sitemap = Array.from(showIds).map((id) => ({
    url: `${SITE_URL}/show/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticUrls, ...movieGenreUrls, ...showGenreUrls, ...movieUrls, ...showUrls]
}
