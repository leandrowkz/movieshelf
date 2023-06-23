import { json, authorize } from '../api'
import { User } from '@supabase/supabase-js'
import { removeFavorite } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  let user: User

  try {
    user = await authorize(req)
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 401)
  }

  const body = await req.json()
  const { showId, showType } = body

  try {
    await removeFavorite(user.id, showId, showType)

    return json({ status: 'success' })
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 400)
  }
}
