import type { AuthResponse } from '@supabase/supabase-js'
import type { Falsable, Nullable, Session, User } from 'src/types'

export type SupabaseSession = Pick<AuthResponse, 'data'>['data']

export type AuthState = {
  session: Nullable<Session>

  isAuthenticated: boolean
  isAutoSignInDone: boolean

  isLoadingSignIn: boolean
  isLoadingSignUp: boolean
  isLoadingSignOut: boolean
  isLoadingResetPassword: boolean
  isLoadingUpdatePassword: boolean

  signInErrors: Falsable<Error>
  signUpErrors: Falsable<Error>
  signOutErrors: Falsable<Error>
  resetPasswordErrors: Falsable<Error>
  updatePasswordErrors: Falsable<Error>

  signIn: ({
    email,
    password,
  }: Pick<User, 'email' | 'password'>) => Promise<void>
  signInSocial: (provider: 'google') => Promise<void>
  signUp: (user: User) => Promise<void>
  signOut: () => Promise<void>
  autoSignIn: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  clearSignInErrors: () => void
  clearSignUpErrors: () => void
  clearResetPasswordErrors: () => void
  clearUpdatePasswordErrors: () => void
}
