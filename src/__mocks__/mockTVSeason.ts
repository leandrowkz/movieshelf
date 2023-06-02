import { type TVSeason } from '@leandrowkz/tmdb'
import { mockTVEpisode } from './mockTVEpisode'

export const mockTVSeason: TVSeason = {
  _id: 'SEASON_ID',
  id: 3030,
  poster_path: '/poster_88797319yhflmbx.jpg',
  name: 'Season 4 Mock',
  overview: 'Anim ullamco excepteur eiusmod eu velit.',
  air_date: '2020-12-14',
  season_number: 0,
  episodes: [{ ...mockTVEpisode }],
}
