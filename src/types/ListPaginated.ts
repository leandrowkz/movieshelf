export type ListPaginated<T> = {
  data: T[]
  page: number
  pages: number
  isLoading?: boolean
  hasErrors?: boolean
}
