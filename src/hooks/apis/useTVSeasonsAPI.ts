import type { TVSeason } from '@leandrowkz/tmdb'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchDetails(
  tvShowId: number,
  seasonNumber: number
): Promise<TVSeason> {
  const path = api.buildPath('/api/tv-seasons/details', {
    tvShowId,
    seasonNumber,
  })

  return api.get<TVSeason>(path)
}

export const useTVSeasonsAPI = () => ({
  fetchDetails,
})
