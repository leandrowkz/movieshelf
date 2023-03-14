import { Movie } from 'src/types/Movie'
import { APIFetcher } from './APIFetcher'

export class MovieAPI extends APIFetcher {
  constructor() {
    super('')
  }

  private getPath(
    path: string,
    queryString: Record<string, string | number> = {}
  ) {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(queryString)) {
      params.append(key, value.toString())
    }

    return `${path}?${params.toString()}`
  }

  public async fetchMovieDetails(id: number): Promise<Movie> {
    const path = this.getPath('/api/movies-details', { id })

    return this.get<Movie>(path)
  }

  public async fetchMovieListSimilar(id: number): Promise<Movie[]> {
    const path = this.getPath('/api/movies-similar', { id })

    return await this.get<Movie[]>(path)
  }

  public async fetchMovieListRecommended(id: number): Promise<Movie[]> {
    const path = this.getPath('/api/movies-recommended', { id })

    return this.get<Movie[]>(path)
  }

  public async fetchMovieListInTheatres(filters = {}): Promise<Movie[]> {
    const path = this.getPath('/api/movies-in-theatres', filters)

    return this.get<Movie[]>(path)
  }

  public async fetchMovieListByGenre(
    genres: number[],
    filters = {}
  ): Promise<Movie[]> {
    const fetchFilters = {
      with_genres: genres.join(','),
      ...filters,
    }
    const path = this.getPath('api/movies-genres', fetchFilters)

    return this.get<Movie[]>(path)
  }

  public async fetchMovieListMostPopular(page = 1): Promise<Movie[]> {
    const filters = { page }

    const path = this.getPath('/api/movies-popular', filters)

    return this.get<Movie[]>(path)
  }

  public async fetchMovieListTrending(): Promise<Movie[]> {
    const path = this.getPath('/api/movie-trending')

    return this.get<Movie[]>(path)
  }
}
