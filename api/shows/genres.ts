import { tmdb, dispatch } from '../api'
import type { ShowType } from '../../src/types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showType = searchParams.get('showType') as ShowType

    const genres =
      showType === 'movie' ? await tmdb.genres.movie() : await tmdb.genres.tv()

    return genres
  })
