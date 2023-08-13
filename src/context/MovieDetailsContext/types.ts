import type {
  CountryCode,
  Movie,
  MovieCredits,
  Video,
  WatchProvider,
} from '@leandrowkz/tmdb'
import type { UserShowStates } from 'src/types'

export type MovieDetailsState = {
  movie: Movie
  states: UserShowStates
  credits: MovieCredits
  videos: Video[]
  providers: WatchProvider[]

  isLoading: {
    fetchMovie: boolean
    fetchStates: boolean
    fetchCredits: boolean
    fetchVideos: boolean
    fetchProviders: boolean
  }

  hasErrors: {
    fetchMovie: boolean
  }

  fetchMovie: (showId: number) => void
  fetchCredits: (showId: number) => void
  fetchStates: (showId: number) => void
  fetchVideos: (showId: number) => void
  fetchProviders: (showId: number, country: CountryCode) => void

  setStates: (states: UserShowStates) => void
}
