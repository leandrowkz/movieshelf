import { dispatch, tmdb } from '../api'
import { type ShowLists, getCastItems, getCrewItems } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const personId = Number(searchParams.get('personId'))

    const person = await tmdb.people.details(personId)
    const isActor = person.known_for_department === 'Acting'

    const { cast, crew } = await tmdb.people.movieCredits(personId)

    const castItems = getCastItems(cast, 'movie')
    const crewItems = getCrewItems(crew, 'movie').sort(
      (a, b) => b.data.length - a.data.length
    )

    const lists: ShowLists = isActor
      ? [...castItems, ...crewItems]
      : [...crewItems, ...castItems]

    return lists
  })
