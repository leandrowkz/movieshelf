export const showTypes = ['tv', 'movie'] as const
export type ShowType = (typeof showTypes)[number]

export const userListTypes = ['favorites', 'watchlist'] as const
export type UserListType = (typeof userListTypes)[number]

export type ListPaginated<T> = {
  data: T[]
  page: number
  pages: number
}
