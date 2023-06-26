import {
  PersonCast,
  PersonCrew,
  TVShow,
  TVShowAccountStates,
  TVShowVideos,
} from '@leandrowkz/tmdb'

export type TVShowDetailsState = {
  tvShow: TVShow
  cast: PersonCast[]
  crew: PersonCrew[]
  videos: TVShowVideos['results']
  accountStates: TVShowAccountStates
  isLoadingTVShow: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingAccountStates: boolean
  hasTVShowErrors: boolean
  fetchTVShow: (tvShowId: number) => void
  fetchCredits: (tvShowId: number) => void
  fetchVideos: (tvShowId: number) => void
  fetchAccountStates: (movieId: number) => void
}
