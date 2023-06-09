import { TVShowItem } from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'
import { mockGenresTVShows } from './mockGenresTVShows'
import { mockTVShow } from './mockTVShow'

export const mockTVShowsListsByGenres: ListByGenre<TVShowItem>[] = [
  {
    genre: mockGenresTVShows[0],
    data: [{ ...mockTVShow }, { ...mockTVShow }, { ...mockTVShow }],
  },
  {
    genre: mockGenresTVShows[1],
    data: [{ ...mockTVShow }, { ...mockTVShow }, { ...mockTVShow }],
  },
  {
    genre: mockGenresTVShows[2],
    data: [{ ...mockTVShow }, { ...mockTVShow }, { ...mockTVShow }],
  },
]
