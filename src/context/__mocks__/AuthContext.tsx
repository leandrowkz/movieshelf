import React, { PropsWithChildren, createContext } from 'react'
import { mockSession } from 'src/__mocks__/mockSession'
import { initialState } from '../state'
import type { AuthState } from '../types'

const mockState: AuthState = {
  ...initialState,
  session: { ...mockSession },
}

export const AuthContext = createContext<AuthState>({ ...mockState })

export const AuthContextProvider = ({
  children,
  state = { ...mockState },
}: PropsWithChildren & { state?: AuthState }) => {
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
