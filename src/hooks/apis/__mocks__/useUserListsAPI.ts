import { mockMoviesListPaginated } from 'src/__mocks__/mockMoviesListPaginated'

async function fetchList() {
  return { ...mockMoviesListPaginated }
}

export async function addToList() {
  return { status: 'success' }
}

async function removeFromList() {
  return { status: 'success' }
}

const actions = {
  fetchList,
  addToList,
  removeFromList,
}

export const useUserListsAPI = () => actions
