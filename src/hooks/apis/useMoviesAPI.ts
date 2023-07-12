import type { MovieItem, Movie, Video, MovieCredits } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated, UserShowStates } from 'src/types'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchDetails(movieId: number): Promise<Movie> {
  const path = api.buildPath('/api/movies/details', { movieId })

  return api.get<Movie>(path)
}

async function fetchListSimilar(movieId: number): Promise<MovieItem[]> {
  const path = api.buildPath('/api/movies/similar', { movieId })

  return await api.get<MovieItem[]>(path)
}

async function fetchListRecommended(movieId: number): Promise<MovieItem[]> {
  const path = api.buildPath('/api/movies/recommended', { movieId })

  return api.get<MovieItem[]>(path)
}

async function fetchListInTheatres(filters = {}): Promise<MovieItem[]> {
  const path = api.buildPath('/api/movies/in-theatres', filters)

  return api.get<MovieItem[]>(path)
}

async function fetchListPaginatedByGenre(
  genres: number[],
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const fetchFilters = {
    with_genres: genres.join(','),
    ...filters,
  }
  const path = api.buildPath('api/movies/list-by-genre', fetchFilters)

  return api.get(path)
}

async function fetchListByGenre(
  genres: number[],
  filters = {}
): Promise<MovieItem[]> {
  const fetchFilters = {
    with_genres: genres.join(','),
    ...filters,
  }
  const path = api.buildPath('api/movies/by-genre', fetchFilters)

  return api.get<MovieItem[]>(path)
}

async function fetchListsByGenres(
  genres: number[]
): Promise<ListByGenre<MovieItem>[]> {
  const fetchFilters = { with_genres: genres.join(',') }
  const path = api.buildPath('api/movies/lists-by-genres', fetchFilters)

  return api.get<ListByGenre<MovieItem>[]>(path)
}

async function fetchListMostPopular(page = 1): Promise<MovieItem[]> {
  const filters = { page }

  const path = api.buildPath('/api/movies/popular', filters)

  return api.get<MovieItem[]>(path)
}

async function fetchListTrending(): Promise<MovieItem[]> {
  const path = api.buildPath('/api/movies/trending')

  return api.get<MovieItem[]>(path)
}

async function fetchCredits(movieId: number): Promise<MovieCredits> {
  const path = api.buildPath('/api/movies/credits', { movieId })

  return api.get<MovieCredits>(path)
}

async function fetchVideos(movieId: number): Promise<Video[]> {
  const path = api.buildPath('/api/movies/videos', { movieId })

  return api.get<Video[]>(path)
}

async function fetchStates(showId: number): Promise<UserShowStates> {
  const path = api.buildPath('/api/shows/states', {
    showId,
    showType: 'movie',
  })

  return api.get(path)
}

export const useMoviesAPI = () => ({
  fetchCredits,
  fetchDetails,
  fetchListByGenre,
  fetchListInTheatres,
  fetchListMostPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTrending,
  fetchListsByGenres,
  fetchListPaginatedByGenre,
  fetchVideos,
  fetchStates,
})
