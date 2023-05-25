import { json, supabase } from './api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const email = 'leandrowkz@gmail.com'

  const response = await supabase.from('newsletter').insert({ email })

  return json(response)
}
