import { authorize, dispatch } from '../../api'
import { getShowStates } from '../../shows/states'
import type { ShowStatesPayload, UserListPayload } from '../../../src/types'
import { removeFromList, validate } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const user = await authorize(req)
    const body = await req.json()

    const payload: UserListPayload = {
      userId: user.id,
      showId: String(body.showId),
      showType: body.showType,
      listType: body.listType,
    }

    await validate(payload)

    await removeFromList(payload)

    return await getShowStates(payload as ShowStatesPayload)
  })
