import type { TVEpisodeItem, TVSeason } from '@leandrowkz/tmdb'

export type TVSeasonDetailsState = {
  season: TVSeason
  episodes: TVEpisodeItem[]
  isLoadingSeason: boolean
  hasSeasonErrors: boolean
  fetchSeasonDetails: (tvShowId: number, seasonNumber: number) => void
}
