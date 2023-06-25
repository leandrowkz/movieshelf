/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  Movie,
  MovieAccountStates,
  MovieCredits,
  MovieItem,
  Video,
} from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockMovieCredits } from 'src/__mocks__/mockMovieCredits'
import { mockMoviesListsByGenres } from 'src/__mocks__/mockMoviesListsByGenres'
import { mockMovieAccountStates } from 'src/__mocks__/mockMovieAccountStates'

function getMockMovies(amount: number): MovieItem[] {
  const movies: MovieItem[] = []

  for (let i = 0; i < amount; i++) {
    movies.push({ ...mockMovieDetails })
  }

  return movies
}

async function fetchDetails(movieId: number): Promise<Movie> {
  return { ...mockMovieDetails }
}

async function fetchListSimilar(movieId: number): Promise<MovieItem[]> {
  return getMockMovies(10)
}

async function fetchListRecommended(movieId: number): Promise<MovieItem[]> {
  return getMockMovies(10)
}

async function fetchListInTheatres(filters = {}): Promise<MovieItem[]> {
  return getMockMovies(10)
}

async function fetchListByGenre(
  genres: number[],
  filters = {}
): Promise<MovieItem[]> {
  return getMockMovies(10)
}

async function fetchListMostPopular(page = 1): Promise<MovieItem[]> {
  return getMockMovies(10)
}

async function fetchListTrending(): Promise<MovieItem[]> {
  return getMockMovies(10)
}

async function fetchCredits(movieId: number): Promise<MovieCredits> {
  return { ...mockMovieCredits }
}

async function fetchVideos(movieId: number): Promise<Video[]> {
  return [{ ...mockVideo }]
}

async function fetchListsByGenres(): Promise<ListByGenre<MovieItem>[]> {
  return mockMoviesListsByGenres
}

async function fetchAccountStates(): Promise<MovieAccountStates> {
  return { ...mockMovieAccountStates }
}

export default {
  fetchAccountStates,
  fetchCredits,
  fetchDetails,
  fetchListByGenre,
  fetchListInTheatres,
  fetchListMostPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTrending,
  fetchListsByGenres,
  fetchVideos,
}
