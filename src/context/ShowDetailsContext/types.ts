import type {
  Movie,
  MovieCredits,
  TVShow,
  TVShowCredits,
  Video,
} from '@leandrowkz/tmdb'
import type { ShowType, UserShowStates } from 'src/types'

export type ShowDetailsState = {
  show: Movie | TVShow
  states: UserShowStates
  credits: MovieCredits | TVShowCredits
  videos: Video[]

  isLoading: {
    fetchShow: boolean
    fetchStates: boolean
    fetchCredits: boolean
    fetchVideos: boolean
  }

  hasErrors: {
    fetchShow: boolean
  }

  fetchShow: (showId: number, showType: ShowType) => void
  fetchCredits: (showId: number, showType: ShowType) => void
  fetchStates: (showId: number, showType: ShowType) => void
  fetchVideos: (showId: number, showType: ShowType) => void

  setStates: (states: UserShowStates) => void
}
