import { TVShow, TVShowAccountStates } from '@leandrowkz/tmdb'
import { TVShowDetailsState } from './types'

export const initialState: TVShowDetailsState = {
  tvShow: {} as TVShow,
  cast: [],
  crew: [],
  videos: [],
  accountStates: {} as TVShowAccountStates,
  isLoadingTVShow: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  hasTVShowErrors: false,
  isLoadingAccountStates: false,
  fetchTVShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchAccountStates: () => null,
}
