import type { MovieItem } from '@leandrowkz/tmdb'
import { json, tmdb, authorize } from '../api'
import { User } from '@supabase/supabase-js'
import { getFavoritesList } from './helpers'
import { ListPaginated } from '../types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const favorites: ListPaginated<MovieItem> = {
    data: [],
    page: 0,
    pages: 0,
  }

  let user: User

  try {
    user = await authorize(req)
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))

    return json(error.message, 401)
  }

  try {
    const { data, pages } = await getFavoritesList(
      user.id,
      'movie',
      Number(page)
    )

    if (data) {
      favorites.page = Number(page)
      favorites.pages = pages

      await Promise.all(
        data.map(async (row) => {
          try {
            const movie = await tmdb.movies.details(Number(row.media_id))

            if (movie) {
              favorites.data.push(movie)
            }
          } catch (e) {
            /* empty */
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
