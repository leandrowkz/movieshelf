import { APIFetcher } from '../../src/services/APIFetcher'

export class TmdbBaseAPI extends APIFetcher {
  private accessToken: string

  constructor() {
    super(process.env.REACT_APP_TMDB_API_URL || '')
    const accessToken = process.env.REACT_APP_TMDB_API_ACCESS_TOKEN || false

    if (!accessToken) {
      throw Error('Missing API access token.')
    }

    this.accessToken = accessToken
  }

  protected getPath(
    path: string,
    queryString?: Record<string, string | number>
  ) {
    const params = new URLSearchParams({
      ...queryString,
      api_key: this.accessToken,
    })

    return `${path}?${params.toString()}`
  }
}
