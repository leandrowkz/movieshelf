import type { Movie, MovieCredits } from '@leandrowkz/tmdb'
import type { MovieDetailsState } from './types'

export const initialState: MovieDetailsState = {
  movie: {} as Movie,
  credits: {} as MovieCredits,
  videos: [],
  providers: [],

  isLoading: {
    fetchMovie: false,
    fetchCredits: false,
    fetchVideos: false,
    fetchProviders: false,
  },

  hasErrors: {
    fetchMovie: false,
  },

  fetchMovie: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchProviders: () => null,
}
