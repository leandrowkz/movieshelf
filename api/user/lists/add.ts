import { authorize, dispatch } from '../../api'
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
      showId: body.showId,
      showType: body.showType,
      listType: body.listType,
    }

    await validate(payload)

    await addToList(payload)

    return { status: 'success' }
  })
