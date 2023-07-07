export const showTypes = ['tv', 'movie'] as const
export type ShowType = (typeof showTypes)[number]

export const userListTypes = ['favorites', 'watchlist', 'watched'] as const
export type UserListType = (typeof userListTypes)[number]

export type ListPaginated<T> = {
  data: T[]
  page: number
  pages: number
}

export type UserShowStates = {
  showId: number
  favorited: boolean
  watchlist: boolean
  watched: boolean
  rated: number | null
}
