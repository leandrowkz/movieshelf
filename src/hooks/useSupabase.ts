/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'
import type { Nullable, Session } from 'src/types'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_API_URL || '',
  process.env.REACT_APP_SUPABASE_API_ACCESS_TOKEN || ''
)

function transformSession(data: any): Nullable<Session> {
  if (!data.session) {
    return null
  }

  const { user } = data.session
  const { access_token, refresh_token, expires_in, token_type } = data.session

  return {
    user: {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email,
    },
    accessToken: access_token,
    refreshToken: refresh_token,
    tokenType: token_type,
    expiresIn: expires_in,
  }
}

export const useSupabase = () => ({
  supabase,
  transformSession,
})
