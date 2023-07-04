import { mockMovieListPaginated } from 'src/__mocks__/mockMoviesListPaginated'

async function fetchShowList() {
  return { ...mockMovieListPaginated }
}

export async function addToList() {
  return { status: 'success' }
}

async function removeFromList() {
  return { status: 'success' }
}

const actions = {
  fetchShowList,
  addToList,
  removeFromList,
}

export const useShowListsAPI = () => actions
