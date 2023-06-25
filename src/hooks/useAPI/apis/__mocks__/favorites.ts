import { Movie, TVShow } from '@leandrowkz/tmdb'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockTVShow } from 'src/__mocks__/mockTVShow'

async function fetchMovieFavorites(): Promise<Movie[]> {
  return [
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
  ]
}

async function fetchTVShowsFavorites(): Promise<TVShow[]> {
  return [
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
  ]
}

async function addFavoriteMovie() {
  return { status: 'success' }
}

async function removeFavoriteMovie() {
  return { status: 'success' }
}

export default {
  addFavoriteMovie,
  removeFavoriteMovie,
  fetchMovieFavorites,
  fetchTVShowsFavorites,
}
