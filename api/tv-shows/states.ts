import { authorize, dispatch } from '../api'
import { isListed } from '../user/lists/helpers'
import { UserListPayload } from '../user/lists/types'
import { UserShowStates } from '../types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request, res: Response) =>
  dispatch(req, res, async () => {
    const { searchParams } = new URL(req.url)
    const user = await authorize(req)
    const tvShowId = Number(searchParams.get('tvShowId'))

    const states: UserShowStates = {
      showId: tvShowId,
      rated: null,
      watched: false,
      watchlist: false,
      favorited: false,
    }

    const payload: UserListPayload = {
      userId: user.id,
      showId: String(tvShowId),
      showType: 'movie',
    } as UserListPayload

    payload.listType = 'favorites'
    states.favorited = await isListed(payload)

    payload.listType = 'watchlist'
    states.watchlist = await isListed(payload)

    payload.listType = 'watched'
    states.watched = await isListed(payload)

    return states
  })
