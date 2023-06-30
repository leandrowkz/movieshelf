import { supabase } from '../api'
import { MediaListPayload } from './types'

const ITEMS_PER_PAGES = 20

async function getMedialistMetadata({
  userId,
  showType,
  listType,
}: MediaListPayload) {
  const { count } = await supabase
    .from('medialist')
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

function getMedialistRange(page: number) {
  const startRow = page * ITEMS_PER_PAGES - ITEMS_PER_PAGES
  const endRow = startRow + ITEMS_PER_PAGES - 1

  return { from: startRow, to: endRow }
}

export async function getMedialist({
  userId,
  showType,
  listType,
  page = 1,
}: MediaListPayload) {
  const { count, pages } = await getMedialistMetadata({
    userId,
    showType,
    listType,
  })
  const { from, to: endRow } = getMedialistRange(page)

  const to = endRow > count ? count : endRow

  const { data } = await supabase
    .from('showlists')
    .select()
    .eq('user_id', userId)
    .eq('show_type', showType)
    .eq('list_type', listType)
    .order('created_at', { ascending: false })
    .range(from, to)

  return { data, pages, page }
}

export async function addToList({
  userId,
  showId,
  showType,
  listType,
}: MediaListPayload) {
  const listed = await isListed({ userId, showId, showType, listType })

  if (!listed) {
    await supabase.from('showlists').upsert({
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
}: MediaListPayload) {
  await supabase
    .from('favorites')
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
}): Promise<boolean> {
  const result = await supabase
    .from('showlists')
    .select()
    .eq('user_id', userId)
    .eq('show_id', showId)
    .eq('show_type', showType)
    .eq('list_type', listType)

  return Boolean(result.data?.length)
}
