import { Movie } from 'src/types/Movie'
import { BaseAPI } from './BaseAPI'
import { APIResponseList } from 'src/types/APIResponseList'

export class MovieAPI extends BaseAPI {
  private accessToken: string

  constructor() {
    super(process.env.REACT_APP_API_URL || '')
    const accessToken = process.env.REACT_APP_API_ACCESS_TOKEN || false

    if (!accessToken) {
      throw Error('Missing API access token.')
    }

    this.accessToken = accessToken
  }

  private getPath(path: string, queryString?: Record<string, string | number>) {
    const params = new URLSearchParams({ ...queryString, api_key: this.accessToken })

    return `${path}${params.toString()}`
  }

  public async fetchMovie(id: number): Promise<Movie> {
    const path = this.getPath(`/movie/${id}`)

    return this.get<Movie>(path)
  }

  public async fetchMovieListByGenre(genres: number[]): Promise<Movie[]> {
    const filters = {
      with_genres: genres.join(',')
    }
    const path = this.getPath(`/discover/movie`, filters)

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }

  public async fetchMovieListMostPopular(page: number = 1): Promise<Movie[]> {
    const filters = { page }

    const path = this.getPath('/movie/popular', filters)

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }

  public async fetchMovieListTrending(): Promise<Movie[]> {
    const path = this.getPath('/trending/movie/week')

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }
}
