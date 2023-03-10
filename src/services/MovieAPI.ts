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
    const params = new URLSearchParams({
      ...queryString,
      api_key: this.accessToken,
    })

    return `${path}?${params.toString()}`
  }

  public async fetchMovieDetails(id: number): Promise<Movie> {
    const path = this.getPath(`/movie/${id}`, {
      append_to_response: 'videos,casts',
    })

    return this.get<Movie>(path)
  }

  public async fetchMovieListSimilar(
    id: number,
    filters = {}
  ): Promise<Movie[]> {
    const path = this.getPath(`/movie/${id}/similar`, filters)

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }

  public async fetchMovieListRecommended(
    id: number,
    filters = {}
  ): Promise<Movie[]> {
    const path = this.getPath(`/movie/${id}/recommendations`, filters)

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }

  public async fetchMovieListInTheatres(filters = {}): Promise<Movie[]> {
    const path = this.getPath('/movie/now_playing', filters)

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }

  public async fetchMovieListByGenre(
    genres: number[],
    additionalFilters = {}
  ): Promise<Movie[]> {
    const filters = {
      with_genres: genres.join(','),
      ...additionalFilters,
    }
    const path = this.getPath(`/discover/movie`, filters)

    const response = await this.get<APIResponseList<Movie>>(path)

    return response.results
  }

  public async fetchMovieListMostPopular(page = 1): Promise<Movie[]> {
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
