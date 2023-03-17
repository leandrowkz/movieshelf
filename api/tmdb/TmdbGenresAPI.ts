import { TmdbAPIResponseGenre } from '../../src/types/TmdbAPIResponseGenre'
import { TmdbBaseAPI } from './TmdbBaseAPI'

export class TmdbGenresAPI extends TmdbBaseAPI {
  /**
   * Get the list of official genres for movies.
   *
   * @returns Promise<Genre[]>
   * @see https://developers.themoviedb.org/3/genres/get-movie-list
   */
  public async movie(): Promise<TmdbAPIResponseGenre> {
    const path = this.getPath('/genre/movie/list')

    return this.get<TmdbAPIResponseGenre>(path)
  }

  /**
   * Get the list of official genres for TV shows.
   *
   * @returns Promise<Genre[]>
   * @see https://developers.themoviedb.org/3/genres/get-tv-list
   */
  public async tv(): Promise<TmdbAPIResponseGenre> {
    const path = this.getPath('/genre/tv/list')

    return this.get<TmdbAPIResponseGenre>(path)
  }
}
