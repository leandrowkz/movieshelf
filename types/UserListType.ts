export const userListTypes = ['favorites', 'watchlist', 'watched'] as const
export type UserListType = (typeof userListTypes)[number]
