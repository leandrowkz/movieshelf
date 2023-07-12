import { APIClient } from './APIClient'
import type { UserShowStates, ShowType } from 'types'

const api = new APIClient('')

async function fetchStates(
  showId: number,
  showType: ShowType
): Promise<UserShowStates> {
  const path = api.buildPath('/api/shows/states', { showId, showType })

  return api.get(path)
}

export const useShowsAPI = () => ({
  fetchStates,
})
