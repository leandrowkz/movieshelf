import type {
  CountryCode,
  TVShow,
  TVShowCredits,
  Video,
  WatchProvider,
} from '@leandrowkz/tmdb'

export type TVShowDetailsState = {
  tvShow: TVShow
  credits: TVShowCredits
  videos: Video[]
  providers: WatchProvider[]

  isLoading: {
    fetchTVShow: boolean
    fetchCredits: boolean
    fetchVideos: boolean
    fetchProviders: boolean
  }

  hasErrors: {
    fetchTVShow: boolean
  }

  fetchTVShow: (showId: number) => void
  fetchCredits: (showId: number) => void
  fetchVideos: (showId: number) => void
  fetchProviders: (showId: number, country: CountryCode) => void
}
