import type { TVShowItem } from '@leandrowkz/tmdb'
import { json, tmdb } from '../api'
import { User } from '@supabase/supabase-js'
import { authorize, getFavoritesList } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const favorites: TVShowItem[] = []
  let user: User

  try {
    user = await authorize(req)
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 401)
  }

  try {
    const { data } = await getFavoritesList(user.id, 'tv')

    if (data) {
      await Promise.all(
        data.map(async (row) => {
          const tvShow = await tmdb.tvShows.details(Number(row.media_id))

          if (tvShow) {
            favorites.push(tvShow)
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
