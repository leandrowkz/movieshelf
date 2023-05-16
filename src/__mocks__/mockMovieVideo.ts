import { Country } from '../types/Country'
import { Language } from '../types/Language'
import { MovieVideo } from '../types/MovieVideo'

export const mockMovieVideo: MovieVideo = {
  id: 'MOVIE_442',
  iso_639_1: Language.EN,
  iso_3166_1: 'US' as Country,
  key: 'watchXyysy124Fbc',
  name: 'Mock Trailer Movie',
  official: true,
  published_at: '2000-02-21',
  site: 'Youtube',
  size: 1224241,
  type: 'Trailer',
}
