import React, { PropsWithChildren, createContext, useState } from 'react'

type DropdownState = {
  isOpen: boolean
  close: () => void
  toggle: () => void
}

export const DropdownContext = createContext<DropdownState>({
  isOpen: false,
  close: () => null,
  toggle: () => null,
})

export const DropdownContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  const state = {
    isOpen,
    close,
    toggle,
  }

  return (
    <DropdownContext.Provider value={state}>
      {children}
    </DropdownContext.Provider>
  )
}
