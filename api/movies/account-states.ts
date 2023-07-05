import { MovieAccountStates } from '@leandrowkz/tmdb'
import { authorize, dispatch } from '../api'
import { isListed } from '../user/lists/helpers'
import { UserListPayload } from '../user/lists/types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request, res: Response) =>
  dispatch(req, res, async () => {
    const { searchParams } = new URL(req.url)
    const user = await authorize(req)
    const movieId = Number(searchParams.get('movieId'))
    const accountStates: MovieAccountStates = {
      id: movieId,
      favorite: false,
      watchlist: false,
      rated: false,
    }

    const favoritesPayload: UserListPayload = {
      userId: user.id,
      showId: String(movieId),
      listType: 'favorites',
      showType: 'movie',
    }

    const favorited = await isListed(favoritesPayload)
    accountStates.favorite = favorited

    return accountStates
  })
