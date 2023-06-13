import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { api } from '../services/AuthAPI'
import type { User } from 'src/types/User'
import type { Session } from 'src/types/Session'
import { Nullable } from 'src/types/Nullable'
import { Falsable } from 'src/types/Falsable'

type AuthState = {
  session: Nullable<Session>

  isLoadingSignIn: boolean
  isLoadingSignUp: boolean

  signInErrors: Falsable<Error>
  signUpErrors: Falsable<Error>

  signIn: ({
    email,
    password,
  }: Pick<User, 'email' | 'password'>) => Promise<void>
  signUp: (user: User) => Promise<void>
  clearSignInErrors: () => void
  clearSignUpErrors: () => void
}

export const AuthContext = createContext<AuthState>({
  session: null,

  isLoadingSignUp: false,
  isLoadingSignIn: false,

  signUpErrors: false,
  signInErrors: false,

  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  clearSignInErrors: () => null,
  clearSignUpErrors: () => null,
})

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Nullable<Session>>(null)
  const [signUpErrors, setSignUpErrors] = useState<Error | false>(false)
  const [signInErrors, setSignInErrors] = useState<Error | false>(false)
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)

  const signIn = useCallback(
    async ({ email, password }: Pick<User, 'email' | 'password'>) => {
      try {
        clearSignInErrors()
        setIsLoadingSignIn(true)

        const data = await api.signIn(email, password || '')

        setSession(data)
      } catch (e) {
        if (e instanceof Error) {
          setSignInErrors(e)
        }
      } finally {
        setIsLoadingSignIn(false)
      }
    },
    [api]
  )

  const signUp = useCallback(
    async (user: User) => {
      try {
        clearSignUpErrors()
        setIsLoadingSignUp(true)

        const data = await api.signUp(user)

        setSession(data)
      } catch (e) {
        if (e instanceof Error) {
          setSignUpErrors(e)
        }
        throw e
      } finally {
        setIsLoadingSignUp(false)
      }
    },
    [api]
  )

  const clearSignInErrors = () => setSignInErrors(false)
  const clearSignUpErrors = () => setSignUpErrors(false)

  const state = {
    session,

    signInErrors,
    signUpErrors,

    isLoadingSignIn,
    isLoadingSignUp,

    signIn,
    signUp,
    clearSignInErrors,
    clearSignUpErrors,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
