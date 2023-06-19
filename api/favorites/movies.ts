import type { MovieItem } from '@leandrowkz/tmdb'
import { json, tmdb } from '../api'
import { User } from '@supabase/supabase-js'
import { authorize, getFavoritesList } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const favorites: MovieItem[] = []
  let user: User

  try {
    user = await authorize(req)
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 401)
  }

  try {
    const { data } = await getFavoritesList(user.id, 'movie')

    if (data) {
      await Promise.all(
        data.map(async (row) => {
          const movie = await tmdb.movies.details(Number(row.media_id))

          if (movie) {
            favorites.push(movie)
          }
        })
      )
    }
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 400)
  }

  return json(favorites)
}
