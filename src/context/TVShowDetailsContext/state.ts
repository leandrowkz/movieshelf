import type { TVShow, TVShowCredits } from '@leandrowkz/tmdb'
import type { TVShowDetailsState } from './types'
import type { UserShowStates } from 'src/types'

export const initialState: TVShowDetailsState = {
  tvShow: {} as TVShow,
  states: {} as UserShowStates,
  credits: {} as TVShowCredits,
  videos: [],
  providers: [],

  isLoading: {
    fetchTVShow: false,
    fetchCredits: false,
    fetchStates: false,
    fetchVideos: false,
    fetchProviders: false,
  },

  hasErrors: {
    fetchTVShow: false,
  },

  fetchTVShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchStates: () => null,
  fetchProviders: () => null,

  setStates: () => null,
}
