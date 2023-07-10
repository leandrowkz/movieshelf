import type { UserListType, ShowType } from '../../types'

export type UserListPayload = {
  page?: number
  userId: string
  showId?: string
  showType: ShowType
  listType: UserListType
}
