import { ShowType } from './ShowType'
import { UserListType } from './UserListType'

export type UserListPayload = {
  page?: number
  userId: string
  showId?: string
  showType: ShowType
  listType: UserListType
}
