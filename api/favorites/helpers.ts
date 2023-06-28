import { supabase } from '../api'
import { ShowType } from '../types'

const ITEMS_PER_PAGES = 20

async function getFavoritesMetadata(userId: string, type: ShowType) {
  const { count } = await supabase
    .from('favorites')
    .select('*', { count: 'estimated' })
    .eq('user_id', userId)
    .eq('media_type', type)

  const total = count || 0

  return {
    count: total,
    pages: Math.ceil(total / ITEMS_PER_PAGES),
  }
}

function getFavoritesRange(page: number) {
  const startRow = page * ITEMS_PER_PAGES - ITEMS_PER_PAGES
  const endRow = startRow + ITEMS_PER_PAGES - 1

  return { from: startRow, to: endRow }
}

export async function getFavoritesList(
  userId: string,
  type: ShowType,
  page = 1
) {
  const { count, pages } = await getFavoritesMetadata(userId, type)
  const { from: fromRow, to } = getFavoritesRange(page)

  const toRow = to > count ? count : to

  const { data } = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)
    .eq('media_type', type)
    .order('created_at', { ascending: false })
    .range(fromRow, toRow)

  const favoritesList = {
    data,
    pages,
    page,
  }

  return favoritesList
}

export async function addFavorite(
  userId: string,
  showId: string,
  type: ShowType
) {
  const favorited = await isFavorite(userId, showId, type)

  if (!favorited) {
    await supabase
      .from('favorites')
      .upsert({ user_id: userId, media_id: showId, media_type: type })
  }
}

export async function removeFavorite(
  userId: string,
  showId: string,
  type: ShowType
) {
  await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('media_id', showId)
    .eq('media_type', type)
}

export async function isFavorite(
  userId: string,
  showId: string,
  type: ShowType
): Promise<boolean> {
  const favorites = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)
    .eq('media_id', showId)
    .eq('media_type', type)

  return Boolean(favorites.data?.length)
}
