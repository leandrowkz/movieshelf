import type { Movie, MovieCredits } from '@leandrowkz/tmdb'
import type { MovieDetailsState } from './types'
import type { UserShowStates } from 'src/types'

export const initialState: MovieDetailsState = {
  movie: {} as Movie,
  states: {} as UserShowStates,
  credits: {} as MovieCredits,
  videos: [],

  isLoading: {
    fetchMovie: false,
    fetchCredits: false,
    fetchStates: false,
    fetchVideos: false,
  },

  hasErrors: {
    fetchMovie: false,
  },

  fetchMovie: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchStates: () => null,

  setStates: () => null,
}
