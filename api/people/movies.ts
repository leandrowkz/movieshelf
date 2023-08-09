import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListByJob } from '../../src/types'
import { dispatch, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

type MovieLists = ListByJob<MovieItem[]>[]

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const personId = Number(searchParams.get('personId'))

    const { cast, crew } = await tmdb.people.movieCredits(personId)

    const lists: MovieLists = []

    crew.map((movie) => {
      const found = lists.find((item) => item.job === movie.job)

      if (!found && movie.job) {
        lists.push({
          job: movie.job,
          data: crew.filter((item) => item.job === movie.job) as MovieItem[],
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
