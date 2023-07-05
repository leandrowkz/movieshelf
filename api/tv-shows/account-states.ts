import { TVShowAccountStates } from '@leandrowkz/tmdb'
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
    const showId = Number(searchParams.get('tvShowId'))
    const accountStates: TVShowAccountStates = {
      id: showId,
      favorite: false,
      watchlist: false,
      rated: null,
    }

    const favoritesPayload: UserListPayload = {
      userId: user.id,
      showId: String(showId),
      listType: 'favorites',
      showType: 'tv',
    }

    const favorited = await isListed(favoritesPayload)
    accountStates.favorite = favorited

    return accountStates
  })
