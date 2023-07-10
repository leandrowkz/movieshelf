import { TVShow } from '@leandrowkz/tmdb'
import { TVShowDetailsState } from './types'
import { UserShowStates } from 'src/types/UserShowStates'

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
