import type { TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from 'src/types'
import { mockGenresTVShowsCodes } from './mockGenresTVShowsCodes'
import { mockTVShowsListPaginated } from './mockTVShowsListPaginated'

export const mockGenresTVShowsLists: ListByGenre<ListPaginated<TVShowItem>>[] =
  [
    {
      genre: mockGenresTVShowsCodes[0],
      data: { ...mockTVShowsListPaginated },
    },
    {
      genre: mockGenresTVShowsCodes[1],
      data: { ...mockTVShowsListPaginated },
    },
    {
      genre: mockGenresTVShowsCodes[2],
      data: { ...mockTVShowsListPaginated },
    },
  ]
