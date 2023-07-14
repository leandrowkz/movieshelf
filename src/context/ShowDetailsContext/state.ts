import type {
  Movie,
  MovieCredits,
  TVShow,
  TVShowCredits,
} from '@leandrowkz/tmdb'
import type { ShowDetailsState } from './types'
import type { UserShowStates } from 'src/types'

export const initialState: ShowDetailsState = {
  show: {} as Movie | TVShow,
  states: {} as UserShowStates,
  credits: {} as MovieCredits | TVShowCredits,
  videos: [],

  isLoading: {
    fetchShow: false,
    fetchCredits: false,
    fetchStates: false,
    fetchVideos: false,
  },

  hasErrors: {
    fetchShow: false,
  },

  fetchShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchStates: () => null,

  setStates: () => null,
}
