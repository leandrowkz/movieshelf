import { authorize, dispatch } from '../api'
import { addToList } from './helpers'
import { ShowListPayload } from './types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request, res: Response) =>
  dispatch(req, res, async (req: Request) => {
    const user = await authorize(req)
    const body = await req.json()

    const payload: ShowListPayload = {
      userId: user.id,
      showId: body.showId,
      showType: body.showType,
      listType: body.listType,
    }

    await addToList(payload)

    return { status: 'success' }
  })
