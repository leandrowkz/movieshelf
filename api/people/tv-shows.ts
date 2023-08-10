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

    crew.map((show) => {
      const found = lists.find((item) => item.job === show.job)

      if (!found && show.job) {
        const data = crew
          .filter((item) => item.job === show.job)
          .map((show) => {
            show.media_type = 'tv'
            return show
          }) as TVShowItem[]

        lists.push({
          data,
          job: show.job,
        })
      }
    })

    lists.sort((a, b) => b.data.length - a.data.length)

    if (cast.length) {
      lists.push({
        job: 'Actor',
        data: cast.map((item) => {
          item.media_type = 'tv'
          return item
        }),
      })
    }

    return lists
  })
