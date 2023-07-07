import { APIClient } from './APIClient'
import { UserShowStates } from 'src/types/UserShowStates'
import { ShowType } from 'src/types/ShowType'

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
