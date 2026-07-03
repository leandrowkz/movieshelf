import type {
  CountryCode,
  Movie,
  MovieCredits,
  Video,
  WatchProvider,
} from '@leandrowkz/tmdb'

export type MovieDetailsState = {
  movie: Movie
  credits: MovieCredits
  videos: Video[]
  providers: WatchProvider[]

  isLoading: {
    fetchMovie: boolean
    fetchCredits: boolean
    fetchVideos: boolean
    fetchProviders: boolean
  }

  hasErrors: {
    fetchMovie: boolean
  }

  fetchMovie: (showId: number) => void
  fetchCredits: (showId: number) => void
  fetchVideos: (showId: number) => void
  fetchProviders: (showId: number, country: CountryCode) => void
}
