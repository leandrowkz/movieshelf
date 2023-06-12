import { Session } from '../../src/types/Session'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transform(data: any): Session {
  const { user, session } = data

  return {
    user: {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email,
    },
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    tokenType: session.token_type,
    expiresIn: session.expires_in,
  }
}
