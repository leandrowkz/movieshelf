import { Country } from '../types/Country'
import { Genre } from '../types/Genre'
import { Language } from '../types/Language'
import { MovieStatus } from '../types/MovieStatus'

export const mockMovieDetails = {
  id: 1010,
  imdb_id: 'IMDB_1010',
  adult: true,
  backdrop_path: '/poster_88797319yhflmbx.jpg',
  belongs_to_collection: true,
  budget: 400019,
  genres: [
    { id: Genre.ACTION, name: 'ACTION' },
    { id: Genre.COMEDY, name: 'COMEDY' },
    { id: Genre.ADVENTURE, name: 'ADVENTURE' },
  ],
  genre_ids: [Genre.ACTION, Genre.COMEDY],
  homepage: 'https://movie1010.org',
  original_language: Language.EN,
  original_title: 'The Mock Adventures of Thunder Movie',
  overview:
    'Elit cupidatat aute Lorem incididunt. Et consequat reprehenderit consectetur quis nulla ipsum ullamco dolore eiusmod.',
  popularity: 16,
  poster_path: '/poster_9991874874.jpg',
  production_companies: [],
  production_countries: [
    {
      iso_3166_1: 'BR' as Country,
      name: 'Brasil',
    },
    {
      iso_3166_1: 'JP' as Country,
      name: 'Japan',
    },
  ],
  release_date: '2000-01-14',
  revenue: 11345443,
  runtime: 123,
  spoken_languages: [],
  status: MovieStatus.RELEASED,
  tagline: 'Consequat ullamco est voluptate non exercitation.',
  title: 'The Mock Adventures of Thunder Movie',
  video: false,
  videos: { results: [] },
  vote_average: 8.44,
  vote_count: 134132,
  casts: {
    cast: [],
    crew: [],
  },
}
