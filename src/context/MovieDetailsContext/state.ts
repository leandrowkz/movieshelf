import { Movie } from '@leandrowkz/tmdb'
import { MovieDetailsState } from './types'
import { UserShowStates } from 'src/types/UserShowStates'

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
}
