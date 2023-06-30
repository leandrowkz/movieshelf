import { ShowType } from '../types'

export type MediaListType = 'favorites' | 'watchlist'

export type MediaListPayload = {
  page?: number
  userId: string
  showId?: string
  showType: ShowType
  listType: MediaListType
}
