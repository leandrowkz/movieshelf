import type { MovieItem, Person, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByJob } from 'src/types'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchPerson(personId: number): Promise<Person> {
  const path = api.buildPath('/api/people', { personId })

  return api.get(path)
}

async function fetchMovies(
  personId: number
): Promise<ListByJob<MovieItem[]>[]> {
  const path = api.buildPath('/api/people/movies', { personId })

  return api.get(path)
}

async function fetchTVShows(
  personId: number
): Promise<ListByJob<TVShowItem[]>[]> {
  const path = api.buildPath('/api/people/movies', { personId })

  return api.get(path)
}

export const usePeopleAPI = () => ({
  fetchPerson,
  fetchMovies,
  fetchTVShows,
})
