import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { json, tmdb, authorize } from '../api'
import { User } from '@supabase/supabase-js'
import { getShowList } from './helpers'
import { ListPaginated } from '../types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  return dispatch(req, async (req) => {
    const user = await authorize(req)

    const list: ListPaginated<MovieItem | TVShowItem> = {
      data: [],
      page: 0,
      pages: 0,
    }

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page'))
    const showType = searchParams.get('showType')
    const listType = searchParams.get('listType')

    const payload = {
      page,
      showType,
      listType,
      userId: user.id,
    }

    const { data, pages } = await getShowList(payload)

    if (data) {
      list.page = Number(page)
      list.pages = pages

      const getDetails =
        showType === 'tv' ? tmdb.tvShows.details : tmdb.movies.details

      await Promise.all(
        data.map(async (row) => {
          try {
            const show = await getDetails(Number(row.media_id))

            if (show) {
              list.data.push(show)
            }
          } catch (e) {
            /* empty */
          }
        })
      )
    }

    return list
  })
}

const dispatch = async (req, action: (req: Request) => Promise<any>) => {
  const response: any = {
    data: {},
    status: 200,
  }

  try {
    response.data = await action(req)
  } catch (e) {
    // if (e instanceof AuthorizationError) {
    //   response.data = 'UNAUTHORIZED'
    //   response.status = 401
    // } else if (e instanceof ValidationError) {
    //   response.data = 'UNPROCESSABLE_ENTITY'
    //   response.status = 422
    // } else if (e instanceof Error) {
    //   response = e.message
    // }

    if (e instanceof Error) {
      response.data = e.message
      response.status = 500
    }
  }

  return json(response.data, response.status)
}
