import { authorize, dispatch } from '../api'
import type { ShowStatesPayload } from '../../src/types'
import { getShowStates } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const user = await authorize(req)
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))

    const payload: ShowStatesPayload = {
      userId: user.id,
      showId: String(showId),
      showType: 'tv',
    }

    const states = await getShowStates(payload)

    return states
  })
