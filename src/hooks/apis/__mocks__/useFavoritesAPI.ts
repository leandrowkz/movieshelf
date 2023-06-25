import { Movie, TVShow } from '@leandrowkz/tmdb'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockTVShow } from 'src/__mocks__/mockTVShow'

export async function fetchMovieFavorites(): Promise<Movie[]> {
  return [
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
  ]
}

export async function fetchTVShowsFavorites(): Promise<TVShow[]> {
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

export const useFavoritesAPI = () => ({
  addFavoriteMovie,
  removeFavoriteMovie,
  fetchMovieFavorites,
  fetchTVShowsFavorites,
})
