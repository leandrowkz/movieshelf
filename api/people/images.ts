import { tmdb, dispatch } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const personId = Number(searchParams.get('personId'))

    // @ts-expect-error return type with error
    const { profiles } = await tmdb.people.images(personId)

    return profiles
  })
