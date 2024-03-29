import React, { type PropsWithChildren, createContext, useState } from 'react'
import type { DropdownState } from './types'
import { initialState } from './state'

export const DropdownContext = createContext<DropdownState>({ ...initialState })

export const DropdownContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const state = {
    isOpen,
    open,
    close,
    toggle,
  }

  return (
    <DropdownContext.Provider value={state}>
      {children}
    </DropdownContext.Provider>
  )
}
