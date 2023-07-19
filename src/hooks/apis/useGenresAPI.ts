import type { Genre, MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from 'src/types'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchMoviesGenresCodes(): Promise<Genre[]> {
  const path = api.buildPath('/api/genres/codes-movies')

  return api.get(path)
}

async function fetchMoviesGenresLists(
  filters = {}
): Promise<ListByGenre<ListPaginated<MovieItem>>[]> {
  const path = api.buildPath('/api/genres/lists-movies', filters)

  return api.get(path)
}

async function fetchTVShowsGenresCodes(): Promise<Genre[]> {
  const path = api.buildPath('/api/genres/codes-tv-shows')

  return api.get(path)
}

async function fetchTVShowsGenresLists(
  filters = {}
): Promise<ListByGenre<ListPaginated<TVShowItem>>[]> {
  const path = api.buildPath('/api/genres/lists-tv-shows', filters)

  return api.get(path)
}

export const useGenresAPI = () => ({
  fetchMoviesGenresCodes,
  fetchMoviesGenresLists,
  fetchTVShowsGenresCodes,
  fetchTVShowsGenresLists,
})
