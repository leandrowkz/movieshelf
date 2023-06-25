import React, { PropsWithChildren, createContext, useState } from 'react'
import { useAPI } from 'src/hooks/useAPI'

type MovieDetailsState = {
  isLoadingSubscribe: boolean
  hasSubscribeErrors: boolean
  hasSubscribeSuccess: boolean
  clearSubscribeStatuses: () => void
  subscribeNewsletter: (email: string) => void
}

export const NewsletterContext = createContext<MovieDetailsState>({
  isLoadingSubscribe: false,
  hasSubscribeErrors: false,
  hasSubscribeSuccess: false,
  clearSubscribeStatuses: () => null,
  subscribeNewsletter: () => null,
})

export const NewsletterContextProvider = ({ children }: PropsWithChildren) => {
  const api = useAPI('newsletter')
  const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false)
  const [hasSubscribeErrors, setHasSubscribeErrors] = useState(false)
  const [hasSubscribeSuccess, setHasSubscribeSuccess] = useState(false)

  const subscribeNewsletter = async (email: string) => {
    try {
      setIsLoadingSubscribe(true)
      clearSubscribeStatuses()

      await api.subscribe(email)
      setHasSubscribeSuccess(true)
    } catch (e) {
      setHasSubscribeErrors(true)
    } finally {
      setIsLoadingSubscribe(false)
    }
  }

  const clearSubscribeStatuses = () => {
    setHasSubscribeErrors(false)
    setHasSubscribeSuccess(false)
  }

  const state = {
    isLoadingSubscribe,
    hasSubscribeErrors,
    hasSubscribeSuccess,
    clearSubscribeStatuses,
    subscribeNewsletter,
  }

  return (
    <NewsletterContext.Provider value={state}>
      {children}
    </NewsletterContext.Provider>
  )
}
