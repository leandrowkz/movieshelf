import { AuthState } from './types'

export const initialState: AuthState = {
  session: null,

  isAuthenticated: false,
  isAutoSignInDone: false,

  isLoadingSignUp: false,
  isLoadingSignIn: false,
  isLoadingSignOut: false,

  signUpErrors: false,
  signInErrors: false,
  signOutErrors: false,

  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  autoSignIn: () => Promise.resolve(),
  clearSignInErrors: () => null,
  clearSignUpErrors: () => null,
}
