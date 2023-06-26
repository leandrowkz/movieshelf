import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockTVShow } from 'src/__mocks__/mockTVShow'

async function fetchMovieFavorites() {
  return [
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
  ]
}

async function fetchTVShowsFavorites() {
  return [
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
  ]
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
