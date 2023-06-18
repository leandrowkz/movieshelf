import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { APIFetcherAuth } from './APIFetcherAuth'

export class FavoritesAPI extends APIFetcherAuth {
  constructor() {
    super('')
  }

  public async fetchMovieFavorites(): Promise<MovieItem[]> {
    await this.initializeAuthentication()

    const path = this.getPath('/api/favorites/movies')

    return this.get<MovieItem[]>(path)
  }

  public async fetchTVShowsFavorites(): Promise<TVShowItem[]> {
    await this.initializeAuthentication()

    const path = this.getPath('/api/favorites/tv')

    return this.get<TVShowItem[]>(path)
  }
}

export const api = new FavoritesAPI()
