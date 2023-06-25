/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockTVSeason } from 'src/__mocks__/mockTVSeason'

class TVSeasonsAPI {
  public async fetchDetails(tvShowId: number, seasonNumber: number) {
    return { ...mockTVSeason }
  }
}

export const api = new TVSeasonsAPI()
