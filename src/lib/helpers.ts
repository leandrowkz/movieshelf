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
  type ShowStatesPayload,
  type ShowType,
  type UserShowStates,
  type ListByJob,
  type ShowItem,
  showTypes,
  userListTypes,
  type UserListPayload,
} from '../types'
import { z } from 'zod'
import { supabase } from './api'

export type ShowLists = ListByJob<ShowItem[]>[]
export type Cast = (PersonMovieCredits | PersonTVCredits)['cast']
export type Crew = (PersonMovieCredits | PersonTVCredits)['crew']

const ITEMS_PER_PAGES = 20

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

export async function getShowStates({
  showId,
  userId,
  showType,
}: ShowStatesPayload): Promise<UserShowStates> {
  const states: UserShowStates = {
    showId: Number(showId),
    rated: null,
    watched: false,
    watchlist: false,
    favorited: false,
  }

  const payload: UserListPayload = {
    userId,
    showId,
    showType,
  } as UserListPayload

  payload.listType = 'favorites'
  states.favorited = await isListed(payload)

  payload.listType = 'watchlist'
  states.watchlist = await isListed(payload)

  payload.listType = 'watched'
  states.watched = await isListed(payload)

  return states
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

export async function getShowListMetadata({
  userId,
  showType,
  listType,
}: UserListPayload) {
  const { count } = await supabase
    .from('userlists')
    .select('*', { count: 'estimated' })
    .eq('user_id', userId)
    .eq('show_type', showType)
    .eq('list_type', listType)

  const total = count || 0

  return {
    count: total,
    pages: Math.ceil(total / ITEMS_PER_PAGES),
  }
}

function getShowListRange(page: number) {
  const startRow = page * ITEMS_PER_PAGES - ITEMS_PER_PAGES
  const endRow = startRow + ITEMS_PER_PAGES - 1

  return { from: startRow, to: endRow }
}

export async function getShowList({
  userId,
  showType,
  listType,
  page = 1,
}: UserListPayload) {
  const { count, pages } = await getShowListMetadata({
    userId,
    showType,
    listType,
  })
  const { from, to: endRow } = getShowListRange(page)

  const to = endRow > count ? count : endRow

  const { data } = await supabase
    .from('userlists')
    .select()
    .eq('user_id', userId)
    .eq('show_type', showType)
    .eq('list_type', listType)
    .order('created_at', { ascending: false })
    .range(from, to)

  return { data, pages, page, count }
}

export async function addToList({
  userId,
  showId,
  showType,
  listType,
}: UserListPayload) {
  const listed = await isListed({ userId, showId, showType, listType })

  if (!listed) {
    await supabase.from('userlists').upsert({
      user_id: userId,
      show_id: showId,
      show_type: showType,
      list_type: listType,
    })
  }
}

export async function removeFromList({
  userId,
  showId,
  showType,
  listType,
}: UserListPayload) {
  await supabase
    .from('userlists')
    .delete()
    .eq('user_id', userId)
    .eq('show_id', showId)
    .eq('show_type', showType)
    .eq('list_type', listType)
}

export async function isListed({
  userId,
  showId,
  showType,
  listType,
}: UserListPayload): Promise<boolean> {
  const result = await supabase
    .from('userlists')
    .select()
    .eq('user_id', userId)
    .eq('show_id', showId)
    .eq('show_type', showType)
    .eq('list_type', listType)

  return Boolean(result.data?.length)
}

export async function validate(payload: UserListPayload) {
  const schema = z.object({
    userId: z.string().nonempty(),
    showId: z.string().nonempty(),
    showType: z.enum(showTypes),
    listType: z.enum(userListTypes),
  })

  schema.parse(payload)
}
