import type {
  MovieItem,
  Movie,
  Genre,
  Video,
  MovieCredits,
} from '@leandrowkz/tmdb'
import { APIFetcher } from './APIFetcher'

export class MoviesAPI extends APIFetcher {
  constructor() {
    super('')
  }

  public async fetchDetails(movieId: number): Promise<Movie> {
    const path = this.getPath('/api/movies-details', { movieId })

    return this.get<Movie>(path)
  }

  public async fetchListSimilar(movieId: number): Promise<MovieItem[]> {
    const path = this.getPath('/api/movies-similar', { movieId })

    return await this.get<MovieItem[]>(path)
  }

  public async fetchListRecommended(movieId: number): Promise<MovieItem[]> {
    const path = this.getPath('/api/movies-recommended', { movieId })

    return this.get<MovieItem[]>(path)
  }

  public async fetchListInTheatres(filters = {}): Promise<MovieItem[]> {
    const path = this.getPath('/api/movies-in-theatres', filters)

    return this.get<MovieItem[]>(path)
  }

  public async fetchListByGenre(
    genres: number[],
    filters = {}
  ): Promise<MovieItem[]> {
    const fetchFilters = {
      with_genres: genres.join(','),
      ...filters,
    }
    const path = this.getPath('api/movies-genres', fetchFilters)

    return this.get<MovieItem[]>(path)
  }

  public async fetchListMostPopular(page = 1): Promise<MovieItem[]> {
    const filters = { page }

    const path = this.getPath('/api/movies-popular', filters)

    return this.get<MovieItem[]>(path)
  }

  public async fetchListTrending(): Promise<MovieItem[]> {
    const path = this.getPath('/api/movies-trending')

    return this.get<MovieItem[]>(path)
  }

  public async fetchCredits(movieId: number): Promise<MovieCredits> {
    const path = this.getPath('/api/movies-credits', { movieId })

    return this.get<MovieCredits>(path)
  }

  public async fetchVideos(movieId: number): Promise<Video[]> {
    const path = this.getPath('/api/movies-videos', { movieId })

    return this.get<Video[]>(path)
  }
}

export const moviesAPI = new MoviesAPI()
