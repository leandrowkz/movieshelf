import { User } from './User'

export type Session = {
  user: User
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}
