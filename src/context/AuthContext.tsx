import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { createClient } from '@supabase/supabase-js'
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
  signInFromStorage: () => void
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_API_URL || '',
  process.env.REACT_APP_SUPABASE_API_SECRET_TOKEN || ''
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transform(data: any): Session {
  console.log('TRYING TO TRANSFORM', data)
  const { user } = data

  return {
    user: {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email,
    },
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
  }
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
  signInFromStorage: () => null,
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

        defineSession(data)
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

        const { name, email, password = '' } = user

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        })

        defineSession(transform(data))
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

  const signInFromStorage = async () => {
    try {
      defineSession(null)
      const { data, error } = await supabase.auth.getSession()

      console.log('SIGNIN FROM STORAGE', transform(data.session))

      defineSession(transform(data.session))
    } catch (e) {
      console.log('ERROR', e)
      /* emmpty */
    }
  }

  const defineSession = (session: Nullable<Session>) => {
    console.log('DEFINE SESSION', session)
    setSession(session)
  }

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
    signInFromStorage,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
