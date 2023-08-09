import type { TVShowItem } from '@leandrowkz/tmdb'
import type { ListByJob } from '../../src/types'
import { dispatch, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

type MovieLists = ListByJob<TVShowItem[]>[]

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const personId = Number(searchParams.get('personId'))

    const { cast, crew } = await tmdb.people.tvCredits(personId)

    const lists: MovieLists = []

    crew.map((movie) => {
      const found = lists.find((item) => item.job === movie.job)

      if (!found && movie.job) {
        lists.push({
          job: movie.job,
          data: crew.filter((item) => item.job === movie.job) as TVShowItem[],
        })
      }
    })

    if (cast.length) {
      lists.push({
        job: 'Actor',
        data: cast,
      })
    }

    return lists
  })
