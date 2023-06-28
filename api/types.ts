export type ShowType = 'tv' | 'movie'

export type ListPaginated<T> = {
  data: T[]
  page: number
  pages: number
}
