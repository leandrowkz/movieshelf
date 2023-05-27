import { GenreCode, type TVShow } from '@leandrowkz/tmdb'

export const mockTVShow: TVShow = {
  id: 2020,
  backdrop_path: '/poster_88797319yhflmbx.jpg',
  genres: [
    { id: GenreCode.ACTION, name: 'ACTION' },
    { id: GenreCode.COMEDY, name: 'COMEDY' },
    { id: GenreCode.ADVENTURE, name: 'ADVENTURE' },
  ],
  genre_ids: [GenreCode.ACTION, GenreCode.COMEDY],
  homepage: 'https://movie1010.org',
  original_language: 'en-AU',
  name: 'The Mock Adventures of Thunder Show',
  overview:
    'Elit cupidatat aute Lorem incididunt. Et consequat reprehenderit consectetur quis nulla ipsum ullamco dolore eiusmod.',
  popularity: 16,
  poster_path: '/poster_9991874874.jpg',
  production_companies: [],
  production_countries: [
    {
      iso_3166_1: 'BR',
      name: 'Brasil',
    },
    {
      iso_3166_1: 'JP',
      name: 'Japan',
    },
  ],
  first_air_date: '2000-01-14',
  last_air_date: '2005-05-11',
  spoken_languages: [],
  tagline: 'Consequat ullamco est voluptate non exercitation.',
  vote_average: 8.44,
  vote_count: 134132,
  media_type: 'tv',
  created_by: [],
  episode_run_time: [],
  in_production: false,
  languages: [],
  last_episode_to_air: {
    id: 0,
    name: '',
    media_type: undefined,
    overview: '',
    air_date: '',
    production_code: null,
    season_number: 0,
    episode_number: 0,
    still_path: null,
    vote_average: 0,
    vote_count: 0,
    crew: [],
    guest_stars: [],
  },
  next_episode_to_air: null,
  networks: [],
  number_of_episodes: 89,
  number_of_seasons: 10,
  origin_country: [],
  original_name: '',
  seasons: [],
  status: 'Ended',
  type: 'Scripted',
}
