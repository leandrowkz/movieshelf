type RequestBody = Record<string, string | boolean | number | object | null>

type RequestPayload = {
  path: string
  body?: RequestBody
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
}

export abstract class APIFetcherPublic {
  private headers: Headers
  private url: string

  constructor(url: string) {
    this.url = url
    this.headers = new Headers({
      'Content-Type': 'application/json',
    })
  }

  public async get<T>(path: string) {
    const options: RequestPayload = {
      path,
      method: 'GET',
    }

    return this.request<T>(options)
  }

  public async post<T>(path: string, body?: RequestBody) {
    const options: RequestPayload = {
      path,
      body,
      method: 'POST',
    }

    return this.request<T>(options)
  }

  public async put<T>(path: string, body?: RequestBody) {
    const options: RequestPayload = {
      path,
      body,
      method: 'PUT',
    }

    return this.request<T>(options)
  }

  public async delete<T>(path: string) {
    const options: RequestPayload = {
      path,
      method: 'DELETE',
    }

    return this.request<T>(options)
  }

  public addHeader(key: string, value: string) {
    if (!this.headers.has(key)) {
      this.headers.append(key, value)
    }
  }

  private async request<T>({ path, method, body }: RequestPayload) {
    const url = `${this.url}/${path}`.replace('//', '/')
    const options: RequestInit = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
    }

    const response = await fetch(url, options)

    return this.toJSON<T>(response)
  }

  private async toJSON<T>(response: Response) {
    if (response.ok) {
      return response.json() as unknown as T
    }

    const error = await response.json()

    throw Error(error.message || error)
  }

  protected getPath(
    path: string,
    queryString: Record<string, string | number> = {}
  ) {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(queryString)) {
      params.append(key, value.toString())
    }

    return `${path}?${params.toString()}`
  }
}
