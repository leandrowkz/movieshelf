import { User, WithPassword } from 'src/types/User'
import { APIFetcher } from './APIFetcher'

export class AuthAPI extends APIFetcher {
  constructor() {
    super('')
  }

  public async signIn(email: string, password: string): Promise<any> {
    const body = {
      email,
      password,
    }
    const path = this.getPath('/api/auth/sign-in')

    return this.post(path, body)
  }

  public async signUp(user: WithPassword<User>): Promise<any> {
    const body = { user }
    const path = this.getPath('/api/auth/sign-in')

    return this.post(path, body)
  }
}

export const api = new AuthAPI()
