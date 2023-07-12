import { z } from 'zod'
import { supabase } from '../../api'
import { showTypes, userListTypes, type UserListPayload } from '../../../types'

const ITEMS_PER_PAGES = 20

export async function getShowListMetadata({
  userId,
  showType,
  listType,
}: UserListPayload) {
  const { count } = await supabase
    .from('userlists')
    .select('*', { count: 'estimated' })
    .eq('user_id', userId)
    .eq('show_type', showType)
    .eq('list_type', listType)

  const total = count || 0

  return {
    count: total,
    pages: Math.ceil(total / ITEMS_PER_PAGES),
  }
}

function getShowListRange(page: number) {
  const startRow = page * ITEMS_PER_PAGES - ITEMS_PER_PAGES
  const endRow = startRow + ITEMS_PER_PAGES - 1

  return { from: startRow, to: endRow }
}

export async function getShowList({
  userId,
  showType,
  listType,
  page = 1,
}: UserListPayload) {
  const { count, pages } = await getShowListMetadata({
    userId,
    showType,
    listType,
  })
  const { from, to: endRow } = getShowListRange(page)

  const to = endRow > count ? count : endRow

  const { data } = await supabase
    .from('userlists')
    .select()
    .eq('user_id', userId)
    .eq('show_type', showType)
    .eq('list_type', listType)
    .order('created_at', { ascending: false })
    .range(from, to)

  return { data, pages, page, count }
}

export async function addToList({
  userId,
  showId,
  showType,
  listType,
}: UserListPayload) {
  const listed = await isListed({ userId, showId, showType, listType })

  if (!listed) {
    await supabase.from('userlists').upsert({
      user_id: userId,
      show_id: showId,
      show_type: showType,
      list_type: listType,
    })
  }
}

export async function removeFromList({
  userId,
  showId,
  showType,
  listType,
}: UserListPayload) {
  await supabase
    .from('userlists')
    .delete()
    .eq('user_id', userId)
    .eq('show_id', showId)
    .eq('show_type', showType)
    .eq('list_type', listType)
}

export async function isListed({
  userId,
  showId,
  showType,
  listType,
}: UserListPayload): Promise<boolean> {
  const result = await supabase
    .from('userlists')
    .select()
    .eq('user_id', userId)
    .eq('show_id', showId)
    .eq('show_type', showType)
    .eq('list_type', listType)

  return Boolean(result.data?.length)
}

export async function validate(payload: UserListPayload) {
  const schema = z.object({
    userId: z.string().nonempty(),
    showId: z.string().nonempty(),
    showType: z.enum(showTypes),
    listType: z.enum(userListTypes),
  })

  schema.parse(payload)
}
