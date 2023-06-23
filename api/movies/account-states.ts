import { MovieAccountStates } from '@leandrowkz/tmdb'
import { User } from '@supabase/supabase-js'
import { authorize, json } from '../api'
import { isFavorite } from '../favorites/helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  let user: User
  const movieId = Number(searchParams.get('movieId'))
  const accountStates: MovieAccountStates = {
    id: movieId,
    favorite: false,
    watchlist: false,
    rated: false,
  }

  try {
    user = await authorize(req)
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 401)
  }

  try {
    const favorited = await isFavorite(user.id, String(movieId), 'movie')
    accountStates.favorite = favorited
  } catch {
    /* empty */
  }

  return json(accountStates)
}
