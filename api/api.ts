/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMDB } from '@leandrowkz/tmdb'
import { createClient } from '@supabase/supabase-js'
import { AuthorizationError } from './exceptions'
import { ZodError } from 'zod'

export const tmdb = new TMDB({
  apiKey: process.env.REACT_APP_TMDB_API_ACCESS_TOKEN || '',
})

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_API_URL || '',
  process.env.REACT_APP_SUPABASE_API_SECRET_TOKEN || ''
)

export const json = (content: any, status = 200) => {
  const body = JSON.stringify(content)
  const headers = {
    'content-type': 'application/json',
    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
  }

  return new Response(body, { headers, status })
}

export async function authorize(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new AuthorizationError('INVALID_ACCESS_TOKEN')
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    throw new AuthorizationError('UNAUTHORIZED')
  }

  return data.user
}

export async function dispatch(
  req: Request,
  res: Response,
  action: (...args: any) => Promise<any>
) {
  const response: any = {
    data: {},
    status: 200,
  }

  try {
    response.data = await action(req, res)
  } catch (e) {
    if (e instanceof AuthorizationError) {
      response.data = e.message
      response.status = 401
    } else if (e instanceof ZodError) {
      response.data = e.issues
      response.status = 422
    } else if (e instanceof Error) {
      response.data = e.message
      response.status = 500
    }
  }

  return json(response.data, response.status)
}
