import type { TVShow } from '@leandrowkz/tmdb'
import type { TVShowDetailsState } from './types'
import type { UserShowStates } from 'types'

export const initialState: TVShowDetailsState = {
  tvShow: {} as TVShow,
  cast: [],
  crew: [],
  videos: [],
  states: {} as UserShowStates,
  isLoadingTVShow: false,
  isLoadingCredits: false,
  isLoadingVideos: false,
  hasTVShowErrors: false,
  isLoadingStates: false,
  fetchTVShow: () => null,
  fetchCredits: () => null,
  fetchVideos: () => null,
  fetchStates: () => null,
  setStates: () => null,
}
