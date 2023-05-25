import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { newsletterAPI } from '../services/NewsletterAPI'

type MovieDetailsState = {
  isLoadingSubscribe: boolean
  hasSubscribeErrors: boolean
  subscribeNewsletter: (email: string) => void
}

export const NewsletterContext = createContext<MovieDetailsState>({
  isLoadingSubscribe: false,
  hasSubscribeErrors: false,
  subscribeNewsletter: () => null,
})

export const NewsletterContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false)
  const [hasSubscribeErrors, setHasSubscribeErrors] = useState(false)

  const subscribeNewsletter = useCallback(
    async (email: string) => {
      try {
        setIsLoadingSubscribe(true)

        await newsletterAPI.subscribe(email)
      } catch (e) {
        setHasSubscribeErrors(true)
      } finally {
        setIsLoadingSubscribe(false)
      }
    },
    [newsletterAPI]
  )

  const state = {
    isLoadingSubscribe,
    hasSubscribeErrors,
    subscribeNewsletter,
  }

  return (
    <NewsletterContext.Provider value={state}>
      {children}
    </NewsletterContext.Provider>
  )
}
