import type { User } from 'src/types/User'
import type { Session } from 'src/types/Session'
import { Nullable } from 'src/types/Nullable'
import { Falsable } from 'src/types/Falsable'
import { AuthResponse } from '@supabase/supabase-js'

export type SupabaseSession = Pick<AuthResponse, 'data'>['data']

export type AuthState = {
  session: Nullable<Session>

  isAuthenticated: boolean
  isAutoSignInDone: boolean

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
  signOut: () => Promise<void>
  autoSignIn: () => Promise<void>
  clearSignInErrors: () => void
  clearSignUpErrors: () => void
}
