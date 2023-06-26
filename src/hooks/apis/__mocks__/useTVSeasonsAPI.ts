import { mockTVSeason } from 'src/__mocks__/mockTVSeason'

async function fetchDetails() {
  return { ...mockTVSeason }
}

const actions = {
  fetchDetails,
}

export const useTVSeasonsAPI = () => actions
