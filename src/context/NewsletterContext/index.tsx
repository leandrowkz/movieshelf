import React, { PropsWithChildren, createContext, useState } from 'react'
import { NewsletterState } from './types'
import { initialState } from './state'
import { useNewsletterAPI } from 'src/hooks/apis/useNewsletterAPI'

export const NewsletterContext = createContext<NewsletterState>({
  ...initialState,
})

export const NewsletterContextProvider = ({ children }: PropsWithChildren) => {
  const api = useNewsletterAPI()
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
