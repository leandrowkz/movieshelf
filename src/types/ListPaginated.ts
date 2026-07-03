export type ListPaginated<T> = {
  data: T[]
  page: number
  pages: number
  count: number
  isLoading?: boolean
  hasErrors?: boolean
}
