import { mockMovieListPaginated } from 'src/__mocks__/mockMoviesListPaginated'
import { mockTVShowsListPaginated } from 'src/__mocks__/mockTVShowsListPaginated'

async function fetchMovieFavorites() {
  return { ...mockMovieListPaginated }
}

async function fetchTVShowsFavorites() {
  return { ...mockTVShowsListPaginated }
}

export async function addFavoriteMovie() {
  return { status: 'success' }
}

async function removeFavoriteMovie() {
  return { status: 'success' }
}

const actions = {
  addFavoriteMovie,
  removeFavoriteMovie,
  fetchMovieFavorites,
  fetchTVShowsFavorites,
}

export const useFavoritesAPI = () => actions
