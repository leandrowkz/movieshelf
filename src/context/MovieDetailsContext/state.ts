import type { Movie } from '@leandrowkz/tmdb'
import type { MovieDetailsState } from './types'
import type { UserShowStates } from 'src/types'

export const initialState: MovieDetailsState = {
  movie: {} as Movie,
  states: {} as UserShowStates,
  cast: [],
  crew: [],
  videos: [],
  isLoadingMovie: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  isLoadingStates: false,
  hasMovieErrors: false,
  fetchMovie: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchStates: () => null,
  setStates: () => null,
}
