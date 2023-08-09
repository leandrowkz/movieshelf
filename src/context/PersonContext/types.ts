import type { MovieItem, Person, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByJob } from 'src/types'

export type PersonState = {
  person: Person
  movies: ListByJob<MovieItem[]>[]
  tvShows: ListByJob<TVShowItem[]>[]

  isLoading: {
    fetchPerson: boolean
    fetchMovies: boolean
    fetchTVShows: boolean
  }

  hasErrors: {
    fetchPerson: boolean
    fetchMovies: boolean
    fetchTVShows: boolean
  }

  fetchPerson: (personId: number) => void
  fetchMovies: (personId: number) => void
  fetchTVShows: (personId: number) => void
}
