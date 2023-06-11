import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { api } from '../services/AuthAPI'
import type { EmailAndPasswordOnly, User, WithPassword } from 'src/types/User'

type AuthState = {
  session: any

  isLoadingSignUp: boolean
  isLoadingSignIn: boolean

  signUpErrors: Error | false
  signInErrors: Error | false

  signUp: (user: WithPassword<User>) => void
  signIn: ({ email, password }: EmailAndPasswordOnly) => void
}

export const AuthContext = createContext<AuthState>({
  session: {},

  isLoadingSignUp: false,
  isLoadingSignIn: false,

  signUpErrors: false,
  signInErrors: false,

  signUp: () => null,
  signIn: () => null,
})

export const GenresContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState(null)
  const [signUpErrors, setSignUpErrors] = useState<Error | false>(false)
  const [signInErrors, setSignInErrors] = useState<Error | false>(false)
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)

  const signIn = useCallback(
    async ({ email, password }: EmailAndPasswordOnly) => {
      try {
        setIsLoadingSignIn(true)
        setSignInErrors(false)

        const data = await api.signIn(email, password)

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
    async (user: WithPassword<User>) => {
      try {
        setIsLoadingSignUp(true)
        setSignUpErrors(false)

        const data = await api.signUp(user)

        setSession(data)
      } catch (e) {
        if (e instanceof Error) {
          setSignUpErrors(e)
        }
      } finally {
        setIsLoadingSignUp(false)
      }
    },
    [api]
  )

  const state = {
    session,

    signInErrors,
    signUpErrors,

    isLoadingSignIn,
    isLoadingSignUp,

    signIn,
    signUp,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
