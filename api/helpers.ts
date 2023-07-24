import type {
  MovieItem,
  SearchMultiSearchResponse,
  TMDBResponseList,
  TVShowItem,
} from '@leandrowkz/tmdb'
import type {
  ListPaginated,
  ShowStatesPayload,
  ShowType,
  UserListPayload,
  UserShowStates,
} from '../src/types'
import { isListed } from './user/lists/helpers'

export function transformListResponse(
  response:
    | TMDBResponseList<MovieItem[] | TVShowItem[]>
    | SearchMultiSearchResponse,
  showType?: ShowType
) {
  const list: ListPaginated<MovieItem | TVShowItem> = {
    data: [],
    page: 0,
    pages: 0,
    count: 0,
  }

  const { results, page, total_pages, total_results } = response

  list.data = results as (MovieItem | TVShowItem)[]
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
