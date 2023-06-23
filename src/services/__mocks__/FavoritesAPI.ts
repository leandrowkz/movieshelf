import type { Movie, TVShow } from '@leandrowkz/tmdb'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { mockTVShow } from 'src/__mocks__/mockTVShow'

class FavoritesAPI {
  public async fetchMovieFavorites(): Promise<Movie[]> {
    return [
      { ...mockMovieDetails },
      { ...mockMovieDetails },
      { ...mockMovieDetails },
      { ...mockMovieDetails },
    ]
  }

  public async fetchTVShowsFavorites(): Promise<TVShow[]> {
    return [
      { ...mockTVShow },
      { ...mockTVShow },
      { ...mockTVShow },
      { ...mockTVShow },
    ]
  }

  public async addFavorite() {
    return { status: 'success' }
  }

  public async removeFavorite() {
    return { status: 'success' }
  }
}

export const api = new FavoritesAPI()
