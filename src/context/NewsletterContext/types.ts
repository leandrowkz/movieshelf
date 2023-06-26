export type NewsletterState = {
  isLoadingSubscribe: boolean
  hasSubscribeErrors: boolean
  hasSubscribeSuccess: boolean
  clearSubscribeStatuses: () => void
  subscribeNewsletter: (email: string) => void
}
