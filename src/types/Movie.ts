import { Company } from './Company'
import { Genre } from './Genre'
import { MovieCountry } from './MovieCountry'
import { MovieLanguage } from './MovieLanguage'
import { Language } from './Language'
import { MovieStatus } from './MovieStatus'

export type Movie = {
  id: number,
  imdb_id: string,
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: boolean | null,
  budget: number,
  genres: Genre[],
  homepage: string,
  original_language: Language,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: Company[],
  production_countries: MovieCountry[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: MovieLanguage[],
  status: MovieStatus,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}
