import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { APIFetcherAuth } from './APIFetcherAuth'
import { ShowType } from 'src/types/ShowType'

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

  public async addFavorite(showId: number, showType: ShowType) {
    await this.initializeAuthentication()

    const path = this.getPath('/api/favorites/add')

    return this.post(path, { showId, showType })
  }

  public async removeFavorite(showId: number, showType: ShowType) {
    await this.initializeAuthentication()

    const path = this.getPath('/api/favorites/remove')

    return this.post(path, { showId, showType })
  }
}

export const api = new FavoritesAPI()
