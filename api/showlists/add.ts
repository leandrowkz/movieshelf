import { json, authorize } from '../api'
import { User } from '@supabase/supabase-js'
import { addToList } from './helpers'

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

  const payload = {
    userId: user.id,
    showId: body.showId,
    showType: body.showType,
    listType: body.listType,
  }

  try {
    await addToList(payload)

    return json({ status: 'success' })
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 400)
  }
}
