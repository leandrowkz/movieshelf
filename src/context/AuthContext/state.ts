import type { AuthState } from './types'

export const initialState: AuthState = {
  session: null,

  isAuthenticated: false,
  isAutoSignInDone: false,

  isLoadingSignUp: false,
  isLoadingSignIn: false,
  isLoadingSignOut: false,
  isLoadingResetPassword: false,
  isLoadingUpdatePassword: false,

  signUpErrors: false,
  signInErrors: false,
  signOutErrors: false,
  resetPasswordErrors: false,
  updatePasswordErrors: false,

  signIn: () => Promise.resolve(),
  signInSocial: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  autoSignIn: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  clearSignInErrors: () => null,
  clearSignUpErrors: () => null,
  clearResetPasswordErrors: () => null,
  clearUpdatePasswordErrors: () => null,
}
