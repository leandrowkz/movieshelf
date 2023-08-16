import React, {
  type PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import type { User, Nullable, Session } from 'src/types'
import type { AuthState, SupabaseSession } from './types'
import { useSupabase } from 'src/hooks/useSupabase'
import { initialState } from './state'

export const AuthContext = createContext<AuthState>({ ...initialState })

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { supabase, transformSession } = useSupabase()
  const [session, setSession] = useState<Nullable<Session>>(null)
  const [signUpErrors, setSignUpErrors] = useState<Error | false>(false)
  const [signInErrors, setSignInErrors] = useState<Error | false>(false)
  const [signOutErrors, setSignOutErrors] = useState<Error | false>(false)
  const [resetPasswordErrors, setResetPasswordErrors] = useState<Error | false>(
    false
  )
  const [updatePasswordErrors, setUpdatePasswordErrors] = useState<
    Error | false
  >(false)
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false)
  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false)
  const [isLoadingUpdatePassword, setIsLoadingUpdatePassword] = useState(false)
  const [isAutoSignInDone, setIsAutoSignInDone] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setSignInData = (data: SupabaseSession) => {
    if (data && data.session) {
      setSession(transformSession(data))
      setIsAuthenticated(true)
    }

    setIsAutoSignInDone(true)
  }

  const signIn = useCallback(
    async ({ email, password = '' }: Pick<User, 'email' | 'password'>) => {
      clearSignInErrors()
      setIsLoadingSignIn(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setIsLoadingSignIn(false)

      if (error) {
        setSignInErrors(error)
        throw error
      }

      setSignInData(data)
    },
    [supabase]
  )

  const signInSocial = useCallback(
    async (provider: 'google') => {
      clearSignInErrors()
      setIsLoadingSignIn(true)

      const { error } = await supabase.auth.signInWithOAuth({ provider })

      setIsLoadingSignIn(false)

      if (error) {
        setSignInErrors(error)
        throw error
      }
    },
    [supabase]
  )

  const signUp = useCallback(
    async (user: User) => {
      clearSignUpErrors()
      setIsLoadingSignUp(true)

      const { name, email, password = '' } = user

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      setIsLoadingSignUp(false)

      console.log(data, error)

      if (error) {
        setSignUpErrors(error)
        throw error
      }

      /**
       * User already exists.
       *
       * @see https://github.com/supabase/supabase-js/issues/296#issuecomment-1372552875
       */
      if (data.user?.identities?.length === 0) {
        const error = new Error('An account already exists with this email.')
        setSignUpErrors(error)
        throw error
      }

      setSignInData(data)
    },
    [supabase]
  )

  const resetPassword = useCallback(
    async (email: string) => {
      clearResetPasswordErrors()
      setIsLoadingResetPassword(true)

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // redirectTo: 'https://movieshelf.app/reset-password/success',
        redirectTo: 'http://localhost:3000/new-password',
      })

      setIsLoadingResetPassword(false)

      if (error) {
        setResetPasswordErrors(error)
        throw error
      }
    },
    [supabase]
  )

  const updatePassword = useCallback(
    async (newPassword: string) => {
      clearUpdatePasswordErrors()
      setIsLoadingUpdatePassword(true)

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      setIsLoadingUpdatePassword(false)

      if (error) {
        setUpdatePasswordErrors(error)
        throw error
      }
    },
    [supabase]
  )

  const signOut = async () => {
    setSession(null)
    setSignOutErrors(false)
    setIsLoadingSignOut(true)
    setIsAuthenticated(false)

    const { error } = await supabase.auth.signOut()

    setIsLoadingSignOut(false)

    if (error) {
      setSignOutErrors(error)
      throw error
    }
  }

  const autoSignIn = async () => {
    setSession(null)
    setIsAutoSignInDone(false)

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      setSignInErrors(error)
      throw error
    }

    setSignInData(data as SupabaseSession)
  }

  const clearSignInErrors = () => setSignInErrors(false)
  const clearSignUpErrors = () => setSignUpErrors(false)
  const clearResetPasswordErrors = () => setResetPasswordErrors(false)
  const clearUpdatePasswordErrors = () => setUpdatePasswordErrors(false)

  const state = {
    session,

    isAuthenticated,
    isAutoSignInDone,

    signInErrors,
    signUpErrors,
    signOutErrors,
    resetPasswordErrors,
    updatePasswordErrors,

    isLoadingSignIn,
    isLoadingSignUp,
    isLoadingSignOut,
    isLoadingResetPassword,
    isLoadingUpdatePassword,

    signIn,
    signInSocial,
    signUp,
    signOut,
    autoSignIn,
    resetPassword,
    updatePassword,
    clearSignInErrors,
    clearSignUpErrors,
    clearResetPasswordErrors,
    clearUpdatePasswordErrors,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
