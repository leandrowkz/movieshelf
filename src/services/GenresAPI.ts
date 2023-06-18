import type { Genre } from '@leandrowkz/tmdb'
import { APIFetcherPublic } from './APIFetcherPublic'

export class GenresAPI extends APIFetcherPublic {
  constructor() {
    super('')
  }

  public async fetchMoviesGenres(): Promise<Genre[]> {
    const path = this.getPath('/api/genres/movies')

    return this.get<Genre[]>(path)
  }

  public async fetchTVShowsGenres(): Promise<Genre[]> {
    const path = this.getPath('/api/genres/tv-shows')

    return this.get<Genre[]>(path)
  }
}

export const api = new GenresAPI()
