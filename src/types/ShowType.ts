export const showTypes = ['tv', 'movie'] as const
export type ShowType = (typeof showTypes)[number]
