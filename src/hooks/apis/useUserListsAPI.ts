import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'
import { APIClient } from './APIClient'
import { ListPaginated } from 'src/types/ListPaginated'
import { ListType } from 'src/types/ListType'

const api = new APIClient('')

async function fetchList(
  page = 1,
  listType: ListType,
  showType: ShowType
): Promise<ListPaginated<MovieItem> | ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/user/lists', {
    page,
    listType,
    showType,
  })

  return api.get(path)
}

async function addToList(
  listType: ListType,
  showId: number,
  showType: ShowType
) {
  const path = api.buildPath('/api/user/lists/add')

  return api.post(path, { showId, showType, listType })
}

async function removeFromList(
  listType: ListType,
  showId: number,
  showType: ShowType
) {
  const path = api.buildPath('/api/user/lists/remove')

  return api.post(path, { showId, showType, listType })
}

export const useUserListsAPI = () => ({
  fetchList,
  addToList,
  removeFromList,
})
