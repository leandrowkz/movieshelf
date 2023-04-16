/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMDB } from '@leandrowkz/tmdb'

export const tmdb = new TMDB({
  apiKey: process.env.REACT_APP_TMDB_API_ACCESS_TOKEN || '',
})

export const json = (content: any, status = 200) => {
  const body = JSON.stringify(content)
  const headers = {
    'content-type': 'application/json',
    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
  }

  return new Response(body, { headers, status })
}
