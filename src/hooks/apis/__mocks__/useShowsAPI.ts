import { mockShowStates } from 'src/__mocks__/mockShowStates'

async function fetchStates() {
  return { ...mockShowStates }
}

const apis = {
  fetchStates,
}

export const useShowsAPI = () => apis
