import { supabase } from '../api'

type ShowType = 'tv' | 'movie'

export async function getFavoritesList(userId: string, type: ShowType) {
  const favorites = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)
    .eq('media_type', type)
    .order('created_at', { ascending: false })

  return favorites
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
