import { supabase } from '../api'

export async function getFavoritesList(userId: string, type: 'tv' | 'movie') {
  const favorites = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)
    .eq('media_type', type)

  return favorites
}

export async function addFavorite(
  userId: string,
  showId: string,
  type: 'tv' | 'movie'
) {
  await supabase
    .from('favorites')
    .upsert({ user_id: userId, media_id: showId, media_type: type })
}

export async function authorize(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new Error('INVALID_ACCESS_TOKEN')
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    throw new Error('UNAUTHORIZED')
  }

  return data.user
}
