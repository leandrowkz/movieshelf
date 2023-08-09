import { tmdb, dispatch } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const personId = Number(searchParams.get('personId'))

    const details = await tmdb.people.details(personId)

    return details
  })
