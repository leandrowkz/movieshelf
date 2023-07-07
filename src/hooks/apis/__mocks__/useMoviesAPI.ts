/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MovieItem } from '@leandrowkz/tmdb'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockMovieCredits } from 'src/__mocks__/mockMovieCredits'
import { mockMoviesListsByGenres } from 'src/__mocks__/mockMoviesListsByGenres'
import { mockMovieListPaginated } from 'src/__mocks__/mockMoviesListPaginated'
import { mockShowStates } from 'src/__mocks__/mockShowStates'

function getMockMovies(amount: number): MovieItem[] {
  const movies: MovieItem[] = []

  for (let i = 0; i < amount; i++) {
    movies.push({ ...mockMovieDetails })
  }

  return movies
}

async function fetchDetails() {
  return { ...mockMovieDetails }
}

async function fetchListSimilar() {
  return getMockMovies(10)
}

async function fetchListRecommended() {
  return getMockMovies(10)
}

async function fetchListInTheatres() {
  return getMockMovies(10)
}

async function fetchListByGenre() {
  return getMockMovies(10)
}

async function fetchListMostPopular() {
  return getMockMovies(10)
}

async function fetchListTrending() {
  return getMockMovies(10)
}

async function fetchCredits() {
  return { ...mockMovieCredits }
}

async function fetchVideos() {
  return [{ ...mockVideo }]
}

async function fetchListsByGenres() {
  return [...mockMoviesListsByGenres]
}

async function fetchStates() {
  return { ...mockShowStates }
}

async function fetchListPaginatedByGenre() {
  return { ...mockMovieListPaginated }
}

const actions = {
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
}

export const useMoviesAPI = () => actions
