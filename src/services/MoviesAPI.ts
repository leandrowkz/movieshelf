import { Movie } from 'src/types/Movie'
import { APIFetcher } from './APIFetcher'
import { MovieCredits } from 'src/types/MovieCredits'
import { MovieVideo } from 'src/types/MovieVideo'
import { MovieGenre } from 'src/types/MovieGenre'

export class MoviesAPI extends APIFetcher {
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

  public async fetchDetails(movieId: number): Promise<Movie> {
    const path = this.getPath('/api/movies-details', { movieId })

    return this.get<Movie>(path)
  }

  public async fetchListSimilar(movieId: number): Promise<Movie[]> {
    const path = this.getPath('/api/movies-similar', { movieId })

    return await this.get<Movie[]>(path)
  }

  public async fetchListRecommended(movieId: number): Promise<Movie[]> {
    const path = this.getPath('/api/movies-recommended', { movieId })

    return this.get<Movie[]>(path)
  }

  public async fetchListInTheatres(filters = {}): Promise<Movie[]> {
    const path = this.getPath('/api/movies-in-theatres', filters)

    return this.get<Movie[]>(path)
  }

  public async fetchListByGenre(
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

  public async fetchListMostPopular(page = 1): Promise<Movie[]> {
    const filters = { page }

    const path = this.getPath('/api/movies-popular', filters)

    return this.get<Movie[]>(path)
  }

  public async fetchListTrending(): Promise<Movie[]> {
    const path = this.getPath('/api/movies-trending')

    return this.get<Movie[]>(path)
  }

  public async fetchCredits(movieId: number): Promise<MovieCredits> {
    const path = this.getPath('/api/movies-credits', { movieId })

    return this.get<MovieCredits>(path)
  }

  public async fetchVideos(movieId: number): Promise<MovieVideo[]> {
    const path = this.getPath('/api/movies-videos', { movieId })

    return this.get<MovieVideo[]>(path)
  }

  public async fetchGenres(): Promise<MovieGenre[]> {
    const path = this.getPath('/api/genres-movie')

    return this.get<MovieGenre[]>(path)
  }
}

export const moviesAPI = new MoviesAPI()
