import React, { createContext } from 'react'
import { mockSession } from 'src/__mocks__/mockSession'
import { initialState } from '../AuthContext/state'
import type { AuthState } from '../AuthContext/types'
import type { PropsWithState } from 'src/types'

const mockState: AuthState = {
  ...initialState,
  session: { ...mockSession },
}

export const AuthContext = createContext<AuthState>({ ...mockState })

export const AuthContextProvider = ({
  children,
  state = { ...mockState },
}: PropsWithState<AuthState>) => {
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
