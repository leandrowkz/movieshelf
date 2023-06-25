import { APIClient } from './APIClient'

const api = new APIClient('')

async function subscribe(email: string): Promise<{ success: boolean }> {
  const path = api.buildPath('/api/newsletter')
  const body = { email }

  return api.post(path, body)
}

export default {
  subscribe,
}
