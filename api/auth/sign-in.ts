import { ZodError } from 'zod'
import { json, supabase } from '../api'
import { type User, UserSchema } from '../../src/types/User'
import { transform } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const data = await req.json()

  try {
    UserSchema.pick({ email: true, password: true }).parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      return json(e.flatten().fieldErrors, 422)
    }
  }

  try {
    const authData = await login(data)

    return json(transform(authData))
  } catch (e) {
    if (e instanceof Error) {
      return json(e, 400)
    }
  }
}

async function login(user: User) {
  const { email, password = '' } = user

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}
