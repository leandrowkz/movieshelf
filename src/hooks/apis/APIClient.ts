import { useSupabase } from 'src/hooks/useSupabase'
import { Nullable } from 'src/types/Nullable'
import { RequestBody } from 'src/types/RequestBody'
import { RequestPayload } from 'src/types/RequestPayload'

export class APIClient {
  private headers: Headers
  private url: string
  private accessToken: Nullable<string>

  constructor(url: string) {
    this.url = url
    this.accessToken = null
    this.headers = new Headers({
      'Content-Type': 'application/json',
    })
  }

  public async authenticate() {
    if (this.accessToken) {
      return
    }

    const { supabase } = useSupabase()
    const { data } = await supabase.auth.getSession()

    if (data.session) {
      const { session } = data

      this.addHeader('Authorization', `Bearer ${session.access_token}`)
      this.accessToken = session.access_token
    }
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
    await this.authenticate()

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

  public buildPath(
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
