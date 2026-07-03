import { GenreCode, type Movie } from '@leandrowkz/tmdb'

export const mockMovieDetails: Movie = {
  id: 1010,
  imdb_id: 'IMDB_1010',
  media_type: 'movie',
  adult: false,
  backdrop_path: '/poster_88797319yhflmbx.jpg',
  belongs_to_collection: null,
  budget: 400019,
  genres: [
    { id: GenreCode.ACTION, name: 'ACTION' },
    { id: GenreCode.COMEDY, name: 'COMEDY' },
    { id: GenreCode.ADVENTURE, name: 'ADVENTURE' },
  ],
  genre_ids: [GenreCode.ACTION, GenreCode.COMEDY],
  homepage: 'https://movie1010.org',
  original_language: 'en-US',
  original_title: 'The Mock Adventures of Thunder Movie',
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
  release_date: '2000-01-14',
  revenue: 11345443,
  runtime: 123,
  spoken_languages: [],
  status: 'Released',
  tagline: 'Consequat ullamco est voluptate non exercitation.',
  title: 'The Mock Adventures of Thunder Movie',
  video: false,
  vote_average: 8.44,
  vote_count: 134132,
}
