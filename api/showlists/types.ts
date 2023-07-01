import type { ListType, ShowType } from '../types'

export type ShowListPayload = {
  page?: number
  userId: string
  showId?: string
  showType: ShowType
  listType: ListType
}
