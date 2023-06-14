import { json, supabase } from '../api'
import { transform } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { token } = await req.json()

  if (!token) {
    return json(new Error('Invalid access token.'), 401)
  }

  try {
    const authData = await loginWithJWT(token)

    return json(transform(authData))
  } catch (e) {
    if (e instanceof Error) {
      return json(e, 401)
    }
  }
}

async function loginWithJWT(jwt: string) {
  const { data, error } = await supabase.auth.getUser(jwt)

  console.log(data, error)

  if (error) {
    throw error
  }

  return data
}
