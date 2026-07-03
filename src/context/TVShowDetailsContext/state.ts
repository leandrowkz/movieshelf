import type { TVShow, TVShowCredits } from '@leandrowkz/tmdb'
import type { TVShowDetailsState } from './types'

export const initialState: TVShowDetailsState = {
  tvShow: {} as TVShow,
  credits: {} as TVShowCredits,
  videos: [],
  providers: [],

  isLoading: {
    fetchTVShow: false,
    fetchCredits: false,
    fetchVideos: false,
    fetchProviders: false,
  },

  hasErrors: {
    fetchTVShow: false,
  },

  fetchTVShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchProviders: () => null,
}
