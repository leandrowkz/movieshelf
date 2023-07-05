import type { UserListType, ShowType } from '../../types'

export type ShowListPayload = {
  page?: number
  userId: string
  showId?: string
  showType: ShowType
  listType: UserListType
}
