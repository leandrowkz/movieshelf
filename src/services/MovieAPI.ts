import { Movie } from 'src/types/Movie'
import { BaseAPI } from './BaseAPI'

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

  public async fetchMovie(id: number): Promise<Movie> {
    const path = this.getPath(`/movie/${id}`)

    return this.get<Movie>(path)
  }

  private getPath(path: string) {
    const params = new URLSearchParams({ api_key: this.accessToken })

    return `${path}${params.toString()}`
  }
}
