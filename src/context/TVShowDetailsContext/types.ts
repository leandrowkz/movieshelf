import type {
  CountryCode,
  TVShow,
  TVShowCredits,
  Video,
  WatchProvider,
} from '@leandrowkz/tmdb'
import type { UserShowStates } from 'src/types'

export type TVShowDetailsState = {
  tvShow: TVShow
  states: UserShowStates
  credits: TVShowCredits
  videos: Video[]
  providers: WatchProvider[]

  isLoading: {
    fetchTVShow: boolean
    fetchStates: boolean
    fetchCredits: boolean
    fetchVideos: boolean
    fetchProviders: boolean
  }

  hasErrors: {
    fetchTVShow: boolean
  }

  fetchTVShow: (showId: number) => void
  fetchCredits: (showId: number) => void
  fetchStates: (showId: number) => void
  fetchVideos: (showId: number) => void
  fetchProviders: (showId: number, country: CountryCode) => void

  setStates: (states: UserShowStates) => void
}
