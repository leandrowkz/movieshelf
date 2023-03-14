import { TmdbDiscoverAPI } from './TmdbDiscoverAPI'
import { TmdbMoviesAPI } from './TmdbMoviesAPI'
import { TmdbTrendingAPI } from './TmdbTrendingAPI'

class TmdbAPI {
  public discover: TmdbDiscoverAPI
  public movies: TmdbMoviesAPI
  public trending: TmdbTrendingAPI

  constructor() {
    this.discover = new TmdbDiscoverAPI()
    this.movies = new TmdbMoviesAPI()
    this.trending = new TmdbTrendingAPI()
  }
}

export const api = new TmdbAPI()
