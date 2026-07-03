import { mockTVSeason } from '../../../__mocks__/mockTVSeason'

async function fetchDetails() {
  return { ...mockTVSeason }
}

const actions = {
  fetchDetails,
}

export const useTVSeasonsAPI = () => actions
