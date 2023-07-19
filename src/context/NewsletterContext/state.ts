import type { NewsletterState } from './types'

export const initialState: NewsletterState = {
  isLoadingSubscribe: false,
  hasSubscribeErrors: false,
  hasSubscribeSuccess: false,
  clearSubscribeStatuses: () => null,
  subscribeNewsletter: () => null,
}
