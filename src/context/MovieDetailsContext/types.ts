import type { Movie, PersonCast, Video } from '@leandrowkz/tmdb'
import type { Nullable, UserShowStates } from 'types'

export type MovieDetailsState = {
  movie: Nullable<Movie>
  states: UserShowStates
  cast: PersonCast[]
  crew: PersonCast[]
  videos: Video[]
  isLoadingMovie: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingStates: boolean
  hasMovieErrors: boolean
  fetchMovie: (movieId: number) => void
  fetchCredits: (movieId: number) => void
  fetchVideos: (movieId: number) => void
  fetchStates: (movieId: number) => void
  setStates: (states: UserShowStates) => void
}
