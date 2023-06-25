/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockTVSeason } from 'src/__mocks__/mockTVSeason'

async function fetchDetails(tvShowId: number, seasonNumber: number) {
  return { ...mockTVSeason }
}

export default {
  fetchDetails,
}
