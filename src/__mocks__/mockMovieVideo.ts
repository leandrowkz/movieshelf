import { Country } from 'src/types/Country'
import { Language } from 'src/types/Language'
import { MovieVideo } from 'src/types/MovieVideo'

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
