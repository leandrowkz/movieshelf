import { ZodError } from 'zod'
import { json, supabase } from '../api'
import { type User, UserSchema } from '../../src/types/User'
import { transform } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const body = await req.json()

  try {
    UserSchema.required({ password: true }).parse(body)
  } catch (e) {
    if (e instanceof ZodError) {
      return json(e.flatten().fieldErrors, 422)
    }
  }

  try {
    const authData = await insert(body)

    return json(transform(authData))
  } catch (e) {
    if (e instanceof Error) {
      return json(e, 400)
    }
  }
}

async function insert(user: User) {
  const { name, email, password = '' } = user

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    throw error
  }

  return data
}
