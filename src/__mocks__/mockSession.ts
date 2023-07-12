import type { Session } from 'src/types'

export const mockSession: Session = {
  user: {
    id: 'USER_ID',
    email: 'user@example.com',
    name: 'MOCK USER',
  },
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
  tokenType: 'JWT',
  expiresIn: 3600,
}
