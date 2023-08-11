import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListByJob } from 'src/types'
import { mockMoviesListPaginated } from './mockMoviesListPaginated'

export const mockPersonMoviesLists: ListByJob<MovieItem[]>[] = [
  {
    job: 'Actor',
    data: [...mockMoviesListPaginated.data],
  },
  {
    job: 'Director',
    data: [...mockMoviesListPaginated.data.slice(0, 8)],
  },
  {
    job: 'Writer',
    data: [...mockMoviesListPaginated.data.slice(0, 6)],
  },
  {
    job: 'Producer',
    data: [...mockMoviesListPaginated.data.slice(0, 4)],
  },
  {
    job: 'Executive Producer',
    data: [...mockMoviesListPaginated.data.slice(0, 2)],
  },
]
