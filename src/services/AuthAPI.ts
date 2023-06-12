import { APIFetcher } from './APIFetcher'
import type { Session } from 'src/types/Session'
import type { User } from 'src/types/User'

export class AuthAPI extends APIFetcher {
  constructor() {
    super('')
  }

  public async signIn(email: string, password: string): Promise<Session> {
    const body = {
      email,
      password,
    }
    const path = this.getPath('/api/auth/sign-in')

    return this.post(path, body)
  }

  public async signUp(user: User): Promise<Session> {
    const path = this.getPath('/api/auth/sign-up')

    return this.post(path, user)
  }
}

export const api = new AuthAPI()
