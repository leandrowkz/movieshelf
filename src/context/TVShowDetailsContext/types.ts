import { PersonCast, PersonCrew, TVShow, TVShowVideos } from '@leandrowkz/tmdb'
import { UserShowStates } from 'src/types/UserShowStates'

export type TVShowDetailsState = {
  tvShow: TVShow
  cast: PersonCast[]
  crew: PersonCrew[]
  videos: TVShowVideos['results']
  states: UserShowStates
  isLoadingTVShow: boolean
  isLoadingCredits: boolean
  isLoadingVideos: boolean
  isLoadingStates: boolean
  hasTVShowErrors: boolean
  fetchTVShow: (tvShowId: number) => void
  fetchCredits: (tvShowId: number) => void
  fetchVideos: (tvShowId: number) => void
  fetchStates: (movieId: number) => void
}
