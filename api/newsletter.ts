import { z } from 'zod'
import { dispatch, json, supabase } from './api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request, res: Response) =>
  dispatch(req, res, async (req: Request) => {
    const body = await req.json()
    const { email } = body
    const schema = z.string().email()

    schema.parse(email)

    const response = await insert(email)

    return json(response)
  })

async function insert(email: string) {
  const found = await supabase.from('newsletter').select().eq('email', email)

  if (found.data?.length) {
    return found
  }

  return await supabase.from('newsletter').insert({ email })
}
