import type {
  DiscoverMovieFilters,
  DiscoverTVShowFilters,
  Genre,
  Movie,
  MovieCredits,
  MovieItem,
  TVShow,
  TVShowCredits,
  TVShowItem,
  Video,
} from '@leandrowkz/tmdb'
import type {
  UserShowStates,
  ShowType,
  ListPaginated,
  RequestQuery,
} from 'src/types'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchCredits(
  showId: number,
  showType: ShowType
): Promise<MovieCredits | TVShowCredits> {
  const path = api.buildPath('/api/shows/credits', { showId, showType })

  return api.get(path)
}

async function fetchDetails(
  showId: number,
  showType: ShowType
): Promise<Movie | TVShow> {
  const path = api.buildPath('/api/shows/details', { showId, showType })

  return api.get(path)
}

async function fetchDiscover(
  showType: ShowType,
  filters?: DiscoverMovieFilters | DiscoverTVShowFilters
): Promise<ListPaginated<MovieItem | TVShowItem>> {
  const path = api.buildPath('/api/shows/discover', {
    ...(filters as RequestQuery),
    showType,
  })

  return api.get(path)
}

async function fetchGenres(showType: ShowType): Promise<Genre[]> {
  const path = api.buildPath('/api/shows/genres', { showType })

  return api.get(path)
}

async function fetchMoviesInTheatres(
  page = 1
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/shows/movies-in-theatres', { page })

  return api.get(path)
}

async function fetchMoviesTrending(
  page = 1
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/shows/movies-trending', { page })

  return api.get(path)
}

async function fetchPopular(
  showType: ShowType,
  page = 1
): Promise<ListPaginated<MovieItem | TVShowItem>> {
  const path = api.buildPath('/api/shows/popular', { page, showType })

  return api.get(path)
}

async function fetchRecommended(
  showId: number,
  showType: ShowType,
  page = 1
): Promise<ListPaginated<MovieItem | TVShowItem>> {
  const path = api.buildPath('/api/shows/recommended', {
    page,
    showType,
    showId,
  })

  return api.get(path)
}

async function fetchSimilar(
  showId: number,
  showType: ShowType,
  page = 1
): Promise<ListPaginated<MovieItem | TVShowItem>> {
  const path = api.buildPath('/api/shows/similar', {
    page,
    showType,
    showId,
  })

  return api.get(path)
}

async function fetchStates(
  showId: number,
  showType: ShowType
): Promise<UserShowStates> {
  const path = api.buildPath('/api/shows/states', { showId, showType })

  return api.get(path)
}

async function fetchTVShowsAiringToday(
  page = 1
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/shows/tv-shows-airing-today', {
    page,
  })

  return api.get(path)
}

async function fetchTVShowsOnTheAir(
  page = 1
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/shows/tv-shows-on-the-air', {
    page,
  })

  return api.get(path)
}

async function fetchTVShowsTopRated(
  page = 1
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/shows/tv-shows-top-rated', {
    page,
  })

  return api.get(path)
}

async function fetchVideos(
  showId: number,
  showType: ShowType
): Promise<Video[]> {
  const path = api.buildPath('/api/shows/videos', { showId, showType })

  return api.get(path)
}

export const useShowsAPI = () => ({
  fetchCredits,
  fetchDetails,
  fetchDiscover,
  fetchGenres,
  fetchMoviesInTheatres,
  fetchMoviesTrending,
  fetchPopular,
  fetchRecommended,
  fetchSimilar,
  fetchStates,
  fetchTVShowsAiringToday,
  fetchTVShowsOnTheAir,
  fetchTVShowsTopRated,
  fetchVideos,
})
