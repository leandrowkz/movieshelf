import type { PersonMovieCredits, PersonTVCredits } from '@leandrowkz/tmdb'
import type { ListByJob, ShowItem, ShowType } from '../../src/types'

export type ShowLists = ListByJob<ShowItem[]>[]
export type Cast = (PersonMovieCredits | PersonTVCredits)['cast']
export type Crew = (PersonMovieCredits | PersonTVCredits)['crew']

export function getCastItems(cast: Cast, showType: ShowType): ShowLists {
  const lists: ShowLists = []

  if (cast.length) {
    lists.push({
      job: 'Actor',
      data: cast.map((item) => {
        item.media_type = showType
        return item
      }),
    })
  }

  return lists
}

export function getCrewItems(crew: Crew, showType: ShowType): ShowLists {
  const lists: ShowLists = []

  crew.map((movie) => {
    const found = lists.find((item) => item.job === movie.job)

    if (!found && movie.job) {
      const data = crew
        .filter((item) => item.job === movie.job)
        .map((movie) => {
          movie.media_type = showType
          return movie
        }) as ShowItem[]

      lists.push({
        data,
        job: movie.job,
      })
    }
  })

  return lists
}
