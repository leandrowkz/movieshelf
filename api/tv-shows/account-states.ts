import { TVShowAccountStates } from '@leandrowkz/tmdb'
import { User } from '@supabase/supabase-js'
import { authorize, json } from '../api'
import { isFavorite } from '../favorites/helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  let user: User
  const tvShowId = Number(searchParams.get('tvShowId'))
  const accountStates: TVShowAccountStates = {
    id: tvShowId,
    favorite: false,
    watchlist: false,
    rated: null,
  }

  try {
    user = await authorize(req)
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 401)
  }

  try {
    const favorited = await isFavorite(user.id, String(tvShowId), 'tv')
    accountStates.favorite = favorited
  } catch {
    /* empty */
  }

  return json(accountStates)
}
