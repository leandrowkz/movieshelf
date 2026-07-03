/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMDB } from '@leandrowkz/tmdb'
import { ZodError } from 'zod'

export const tmdb = new TMDB({
  // Server-only secret: no REACT_APP_ prefix, so CRA never inlines it into the
  // public client bundle. This file is imported exclusively by the `api/` edge
  // functions, which read env vars at runtime on Vercel.
  apiKey: process.env.TMDB_API_ACCESS_TOKEN || '',
})

export const json = (content: any, status = 200) => {
  const body = JSON.stringify(content)
  const headers = {
    'content-type': 'application/json',
    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
  }

  return new Response(body, { headers, status })
}

export async function dispatch(action: (...args: any) => Promise<any>) {
  const response: any = {
    data: {},
    status: 200,
  }

  try {
    response.data = await action()
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      response.data = e.issues
      response.status = 422
    } else if (e instanceof Error) {
      response.data = e.message
      response.status = 500
    }
  }

  return json(response.data, response.status)
}
