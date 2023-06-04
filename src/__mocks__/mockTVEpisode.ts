import { type TVEpisode } from '@leandrowkz/tmdb'

type Episode = TVEpisode & { runtime: number }

export const mockTVEpisode: Episode = {
  id: 2020,
  still_path: '/poster_88797319yhflmbx.jpg',
  name: 'The Mock Adventures of Thunder Show',
  overview:
    'Elit cupidatat aute Lorem incididunt. Et consequat reprehenderit consectetur quis nulla ipsum ullamco dolore eiusmod.',
  vote_average: 8.44,
  vote_count: 134132,
  media_type: 'tv',
  runtime: 20,
  air_date: '2020-12-14',
  production_code: null,
  season_number: 0,
  episode_number: 0,
  crew: [],
  guest_stars: [],
}
