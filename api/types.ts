export type ShowType = 'tv' | 'movie'

export type ListType = 'favorites' | 'watchlist'

export type ListPaginated<T> = {
  data: T[]
  page: number
  pages: number
}
