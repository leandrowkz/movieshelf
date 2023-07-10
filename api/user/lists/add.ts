import { authorize, dispatch } from '../../api'
import { getShowStates } from '../../shows/states'
import { ShowStatesPayload } from '../../shows/types'
import { addToList, validate } from './helpers'
import { UserListPayload } from './types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request, res: Response) =>
  dispatch(req, res, async (req: Request) => {
    const user = await authorize(req)
    const body = await req.json()

    const payload: UserListPayload = {
      userId: user.id,
      showId: String(body.showId),
      showType: body.showType,
      listType: body.listType,
    }

    await validate(payload)

    await addToList(payload)

    return await getShowStates(payload as ShowStatesPayload)
  })
