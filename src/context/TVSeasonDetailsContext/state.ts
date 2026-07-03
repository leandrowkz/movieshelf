import type { TVSeason } from '@leandrowkz/tmdb'
import type { TVSeasonDetailsState } from './types'

export const initialState: TVSeasonDetailsState = {
  season: {} as TVSeason,
  episodes: [],
  isLoadingSeason: false,
  hasSeasonErrors: false,
  fetchSeasonDetails: () => null,
}
