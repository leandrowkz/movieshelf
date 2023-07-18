import { dispatch, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async () =>
  dispatch(async () => {
    const { genres } = await tmdb.genres.movie()

    return genres
  })
