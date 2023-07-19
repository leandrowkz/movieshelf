import type { TVShow, TVShowCredits, Video } from '@leandrowkz/tmdb'
import type { UserShowStates } from 'src/types'

export type TVShowDetailsState = {
  tvShow: TVShow
  states: UserShowStates
  credits: TVShowCredits
  videos: Video[]

  isLoading: {
    fetchTVShow: boolean
    fetchStates: boolean
    fetchCredits: boolean
    fetchVideos: boolean
  }

  hasErrors: {
    fetchTVShow: boolean
  }

  fetchTVShow: (showId: number) => void
  fetchCredits: (showId: number) => void
  fetchStates: (showId: number) => void
  fetchVideos: (showId: number) => void

  setStates: (states: UserShowStates) => void
}
