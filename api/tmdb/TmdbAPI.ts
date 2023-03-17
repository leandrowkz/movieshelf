import { TmdbDiscoverAPI } from './TmdbDiscoverAPI'
import { TmdbGenresAPI } from './TmdbGenresAPI'
import { TmdbMoviesAPI } from './TmdbMoviesAPI'
import { TmdbTrendingAPI } from './TmdbTrendingAPI'

class TmdbAPI {
  public discover: TmdbDiscoverAPI
  public genres: TmdbGenresAPI
  public movies: TmdbMoviesAPI
  public trending: TmdbTrendingAPI

  constructor() {
    this.discover = new TmdbDiscoverAPI()
    this.genres = new TmdbGenresAPI()
    this.movies = new TmdbMoviesAPI()
    this.trending = new TmdbTrendingAPI()
  }
}

export const api = new TmdbAPI()
