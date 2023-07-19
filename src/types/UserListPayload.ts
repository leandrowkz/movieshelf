import type { ShowType } from './ShowType'
import type { UserListType } from './UserListType'

export type UserListPayload = {
  page?: number
  userId: string
  showId?: string
  showType: ShowType
  listType: UserListType
}
