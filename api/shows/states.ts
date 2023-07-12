import { authorize, dispatch } from '../api'
import { isListed } from '../user/lists/helpers'
import type {
  ShowStatesPayload,
  ShowType,
  UserListPayload,
  UserShowStates,
} from '../../src/types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const user = await authorize(req)
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))
    const showType = searchParams.get('showType') as ShowType

    const payload: ShowStatesPayload = {
      userId: user.id,
      showId: String(showId),
      showType,
    }

    const states = await getShowStates(payload)

    return states
  })

export async function getShowStates({
  showId,
  userId,
  showType,
}: ShowStatesPayload): Promise<UserShowStates> {
  const states: UserShowStates = {
    showId: Number(showId),
    rated: null,
    watched: false,
    watchlist: false,
    favorited: false,
  }

  const payload: UserListPayload = {
    userId,
    showId,
    showType,
  } as UserListPayload

  payload.listType = 'favorites'
  states.favorited = await isListed(payload)

  payload.listType = 'watchlist'
  states.watchlist = await isListed(payload)

  payload.listType = 'watched'
  states.watched = await isListed(payload)

  return states
}
