import type { User } from 'src/types/User'
import type { Session } from 'src/types/Session'
import { Nullable } from 'src/types/Nullable'
import { Falsable } from 'src/types/Falsable'

export type AuthState = {
  session: Nullable<Session>

  isLoadingSignIn: boolean
  isLoadingSignUp: boolean
  isLoadingSignOut: boolean

  signInErrors: Falsable<Error>
  signUpErrors: Falsable<Error>
  signOutErrors: Falsable<Error>

  signIn: ({
    email,
    password,
  }: Pick<User, 'email' | 'password'>) => Promise<void>
  signUp: (user: User) => Promise<void>
  signOut: () => void
  autoSignIn: () => void
  clearSignInErrors: () => void
  clearSignUpErrors: () => void
}
