import type {
  CountryCode,
  Genre,
  Movie,
  MovieCredits,
  MovieItem,
  MovieWatchProviders,
  PersonMovieCredits,
  PersonTVCredits,
  TMDBResponseList,
  TVShow,
  TVShowCredits,
  TVShowItem,
  TVShowWatchProviders,
  WatchProvider,
} from "@leandrowkz/tmdb"
import type { ListPaginated } from "@/types/list-paginated"
import type { ShowItem } from "@/types/show-item"
import type { ShowType } from "@/types/show-type"
import type { ListByJob } from "@/types/list-by-job"

export function transformListResponse<T extends MovieItem | TVShowItem>(
  response: TMDBResponseList<T[]>,
  showType?: ShowType,
): ListPaginated<T> {
  const data = showType
    ? response.results.map((item) => ({ ...item, media_type: showType }) as T)
    : response.results

  return {
    data,
    page: response.page,
    pages: response.total_pages,
    count: response.total_results,
  }
}

export function getWatchProvidersList(
  response: MovieWatchProviders | TVShowWatchProviders,
  country: CountryCode,
): WatchProvider[] {
  const regionResult =
    response.results?.[country as keyof typeof response.results]
  if (!regionResult) return []

  const seen = new Set<number>()
  const providers: WatchProvider[] = []

  for (const [, list] of Object.entries(regionResult)) {
    if (!Array.isArray(list)) continue
    for (const provider of list as WatchProvider[]) {
      if (!seen.has(provider.provider_id)) {
        seen.add(provider.provider_id)
        providers.push(provider)
      }
    }
  }

  return providers.sort((a, b) => a.display_priority - b.display_priority)
}

export function getShowTitle(show: Movie | TVShow | MovieItem | TVShowItem) {
  return "title" in show ? show.title : show.name
}

export function getShowReleaseDate(
  show: Movie | TVShow | MovieItem | TVShowItem,
) {
  return "release_date" in show ? show.release_date : show.first_air_date
}

export function getShowOriginalTitle(
  show: Movie | TVShow | MovieItem | TVShowItem,
) {
  return "original_title" in show
    ? show.original_title
    : (show as TVShow | TVShowItem).original_name
}

export function getCreditsDirector(credits: MovieCredits | TVShowCredits) {
  return credits.crew.find((person) => person.job === "Director")?.name ?? null
}

export function getCreditsCreators(credits: TVShowCredits | { created_by?: { name: string }[] }) {
  if ("created_by" in credits && credits.created_by) {
    return credits.created_by.map((c) => c.name)
  }
  return []
}

type Cast = (PersonMovieCredits | PersonTVCredits)["cast"]
type Crew = (PersonMovieCredits | PersonTVCredits)["crew"]

export function getCastItems(cast: Cast, showType: ShowType): ListByJob<ShowItem[]>[] {
  if (!cast.length) return []
  return [
    {
      job: "Actor",
      data: cast.map((item) => ({ ...item, media_type: showType }) as ShowItem),
    },
  ]
}

export function getCrewItems(crew: Crew, showType: ShowType): ListByJob<ShowItem[]>[] {
  const lists: ListByJob<ShowItem[]>[] = []
  const items = crew as Array<Crew[number]>

  for (const item of items) {
    if (!item.job) continue
    if (lists.find((l) => l.job === item.job)) continue

    const data = items
      .filter((x) => x.job === item.job)
      .map((x) => ({ ...x, media_type: showType }) as ShowItem)

    lists.push({ job: item.job, data })
  }

  return lists
}

export function sortGenresByPopularity(genres: Genre[], priority: number[]) {
  return [...genres].sort((a, b) => {
    const ai = priority.indexOf(a.id)
    const bi = priority.indexOf(b.id)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}
