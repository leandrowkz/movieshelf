import { DiscoverAPI } from './DiscoverAPI'
import { GenresAPI } from './GenresAPI'
import { MoviesAPI } from './MoviesAPI'
import { TrendingAPI } from './TrendingAPI'

class TmdbAPI {
  public discover: DiscoverAPI
  public genres: GenresAPI
  public movies: MoviesAPI
  public trending: TrendingAPI

  constructor() {
    this.discover = new DiscoverAPI()
    this.genres = new GenresAPI()
    this.movies = new MoviesAPI()
    this.trending = new TrendingAPI()
  }
}

export const api = new TmdbAPI()
