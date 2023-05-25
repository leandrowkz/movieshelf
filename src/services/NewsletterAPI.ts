import { APIFetcher } from './APIFetcher'

export class NewsletterAPI extends APIFetcher {
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
