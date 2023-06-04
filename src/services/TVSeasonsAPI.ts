import type { TVSeason } from '@leandrowkz/tmdb'
import { APIFetcher } from './APIFetcher'

class TVSeasonsAPI extends APIFetcher {
  constructor() {
    super('')
  }

  public async fetchDetails(
    tvShowId: number,
    seasonNumber: number
  ): Promise<TVSeason> {
    const path = this.getPath('/api/tv-seasons/details', {
      tvShowId,
      seasonNumber,
    })

    return this.get<TVSeason>(path)
  }
}

export const api = new TVSeasonsAPI()
