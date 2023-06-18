import { APIFetcherPublic } from './APIFetcherPublic'

export class NewsletterAPI extends APIFetcherPublic {
  constructor() {
    super('')
  }

  public async subscribe(email: string): Promise<{ success: boolean }> {
    const path = this.getPath('/api/newsletter')
    const body = { email }

    return this.post(path, body)
  }
}

export const newsletterAPI = new NewsletterAPI()
