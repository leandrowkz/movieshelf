import type { Movie, MovieCredits, Video } from '@leandrowkz/tmdb'
import type { UserShowStates } from 'src/types'

export type MovieDetailsState = {
  movie: Movie
  states: UserShowStates
  credits: MovieCredits
  videos: Video[]

  isLoading: {
    fetchMovie: boolean
    fetchStates: boolean
    fetchCredits: boolean
    fetchVideos: boolean
  }

  hasErrors: {
    fetchMovie: boolean
  }

  fetchMovie: (showId: number) => void
  fetchCredits: (showId: number) => void
  fetchStates: (showId: number) => void
  fetchVideos: (showId: number) => void

  setStates: (states: UserShowStates) => void
}
