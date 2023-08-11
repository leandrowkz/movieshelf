import type { Image, MovieItem, Person, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByJob } from 'src/types'

export type PeopleState = {
  person: Person
  movies: ListByJob<MovieItem[]>[]
  tvShows: ListByJob<TVShowItem[]>[]
  images: {
    data: Image[]
    open: boolean
    active: Image
  }

  isLoading: {
    fetchPerson: boolean
    fetchImages: boolean
    fetchMovies: boolean
    fetchTVShows: boolean
  }

  hasErrors: {
    fetchPerson: boolean
    fetchImages: boolean
    fetchMovies: boolean
    fetchTVShows: boolean
  }

  fetchPerson: (personId: number) => void
  fetchImages: (personId: number) => void
  fetchMovies: (personId: number) => void
  fetchTVShows: (personId: number) => void

  setActiveImage: (image: Image) => void
  openModalImage: (image: Image) => void
  closeModalImage: () => void
}
