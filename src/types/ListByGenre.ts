import type { Genre } from '@leandrowkz/tmdb'

export type ListByGenre<T> = {
  genre: Genre
  data: T
}
