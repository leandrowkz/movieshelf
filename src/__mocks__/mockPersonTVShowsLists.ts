import type { TVShowItem } from '@leandrowkz/tmdb'
import type { ListByJob } from 'src/types'
import { mockTVShowsListPaginated } from './mockTVShowsListPaginated'

export const mockPersonTVShowsLists: ListByJob<TVShowItem[]>[] = [
  {
    job: 'Actor',
    data: [...mockTVShowsListPaginated.data],
  },
  {
    job: 'Director',
    data: [...mockTVShowsListPaginated.data.slice(0, 8)],
  },
  {
    job: 'Writer',
    data: [...mockTVShowsListPaginated.data.slice(0, 6)],
  },
  {
    job: 'Producer',
    data: [...mockTVShowsListPaginated.data.slice(0, 4)],
  },
]
