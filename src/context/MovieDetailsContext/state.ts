import { Movie, MovieAccountStates } from '@leandrowkz/tmdb'
import { MovieDetailsState } from './types'

export const initialState: MovieDetailsState = {
  movie: {} as Movie,
  accountStates: {} as MovieAccountStates,
  cast: [],
  crew: [],
  videos: [],
  isLoadingMovie: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  isLoadingAccountStates: false,
  hasMovieErrors: false,
  fetchMovie: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchAccountStates: () => null,
}
