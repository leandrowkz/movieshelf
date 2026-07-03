/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CountryCode,
  MovieItem,
  MovieWatchProviders,
  PersonMovieCredits,
  PersonTVCredits,
  TMDBResponseList,
  TVShowItem,
  TVShowWatchProviders,
  WatchProvider,
} from '@leandrowkz/tmdb'
import {
  type ListPaginated,
  type ShowType,
  type ListByJob,
  type ShowItem,
} from '../types'

export type ShowLists = ListByJob<ShowItem[]>[]
export type Cast = (PersonMovieCredits | PersonTVCredits)['cast']
export type Crew = (PersonMovieCredits | PersonTVCredits)['crew']

export function transformListResponse(
  response: TMDBResponseList<MovieItem[] | TVShowItem[]>,
  showType?: ShowType
) {
  const list: ListPaginated<MovieItem | TVShowItem> = {
    data: [],
    page: 0,
    pages: 0,
    count: 0,
  }

  const { results, page, total_pages, total_results } = response

  list.data = results
  list.page = page
  list.pages = total_pages
  list.count = total_results

  if (showType) {
    list.data.map((item) => {
      item.media_type = showType
      return item
    })
  }

  return list
}

export function getWatchProvidersList(
  response: MovieWatchProviders | TVShowWatchProviders,
  country: CountryCode
) {
  if (!country || !response.results[country as keyof typeof response.results]) {
    return []
  }

  const providersResult =
    response.results[country as keyof typeof response.results]
  const providersResponse: WatchProvider[] = []

  if (providersResult) {
    const existingProviders: number[] = []
    for (const [_key, providersList] of Object.entries(providersResult)) {
      if (Array.isArray(providersList)) {
        providersList.forEach((provider: WatchProvider) => {
          const { provider_id: providerId } = provider

          if (!existingProviders.includes(providerId)) {
            existingProviders.push(providerId)
            providersResponse.push(provider)
          }
        })
      }
    }
  }

  return providersResponse.sort(
    (a, b) => a.display_priority - b.display_priority
  )
}

export function getCastItems(cast: Cast, showType: ShowType): ShowLists {
  const lists: ShowLists = []

  if (cast.length) {
    lists.push({
      job: 'Actor',
      data: cast.map((item) => {
        item.media_type = showType
        return item
      }),
    })
  }

  return lists
}

export function getCrewItems(crew: Crew, showType: ShowType): ShowLists {
  const lists: ShowLists = []

  const crewItems = crew as Array<Crew[number]>

  crewItems.map((movie) => {
    const found = lists.find((item) => item.job === movie.job)

    if (!found && movie.job) {
      const data = crewItems
        .filter((item) => item.job === movie.job)
        .map((movie) => {
          movie.media_type = showType
          return movie
        }) as ShowItem[]

      lists.push({
        data,
        job: movie.job,
      })
    }
  })

  return lists
}
