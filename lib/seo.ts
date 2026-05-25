import type { Metadata } from "next"
import type { Movie, Person, TVShow } from "@leandrowkz/tmdb"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { getTmdbImageUrl } from "@/lib/images"
import { formatYear } from "@/lib/format"

type BuildMetadataInput = {
  title: string
  description?: string | null
  image?: string | null
  url?: string
  type?: "website" | "article" | "video.movie" | "video.tv_show" | "profile"
}

export function buildMetadata({
  title,
  description,
  image,
  url,
  type = "website",
}: BuildMetadataInput): Metadata {
  const canonical = url ? new URL(url, SITE_URL).toString() : undefined
  const safeDescription = description?.trim() || undefined
  const images = image ? [{ url: image, width: 1280, height: 720 }] : undefined

  return {
    title,
    description: safeDescription,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description: safeDescription,
      url: canonical,
      siteName: SITE_NAME,
      images,
      type: type === "video.tv_show" ? "video.tv_show" : type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images,
    },
  }
}

export function buildMovieJsonLd(movie: Movie) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.overview ?? undefined,
    image: getTmdbImageUrl(movie.backdrop_path, "w1280") ?? undefined,
    datePublished: movie.release_date || undefined,
    genre: movie.genres?.map((g) => g.name),
    aggregateRating:
      movie.vote_average && movie.vote_count
        ? {
            "@type": "AggregateRating",
            ratingValue: movie.vote_average,
            ratingCount: movie.vote_count,
            bestRating: 10,
            worstRating: 0,
          }
        : undefined,
    duration:
      movie.runtime && movie.runtime > 0
        ? `PT${movie.runtime}M`
        : undefined,
  }
}

export function buildTvSeriesJsonLd(show: TVShow) {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: show.name,
    description: show.overview ?? undefined,
    image: getTmdbImageUrl(show.backdrop_path, "w1280") ?? undefined,
    datePublished: show.first_air_date || undefined,
    genre: show.genres?.map((g) => g.name),
    numberOfSeasons: show.number_of_seasons,
    numberOfEpisodes: show.number_of_episodes,
    aggregateRating:
      show.vote_average && show.vote_count
        ? {
            "@type": "AggregateRating",
            ratingValue: show.vote_average,
            ratingCount: show.vote_count,
            bestRating: 10,
            worstRating: 0,
          }
        : undefined,
  }
}

export function buildPersonJsonLd(person: Person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    description: person.biography || undefined,
    image: getTmdbImageUrl(person.profile_path, "h632") ?? undefined,
    birthDate: person.birthday || undefined,
    deathDate: person.deathday || undefined,
    birthPlace: person.place_of_birth || undefined,
  }
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function movieTitleWithYear(movie: Movie | { title: string; release_date?: string }) {
  const year = formatYear(movie.release_date)
  return year ? `${movie.title} (${year})` : movie.title
}

export function showTitleWithYear(show: TVShow | { name: string; first_air_date?: string }) {
  const year = formatYear(show.first_air_date)
  return year ? `${show.name} (${year})` : show.name
}
