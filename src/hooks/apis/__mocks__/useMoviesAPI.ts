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

async function fetchAccountStates() {
  return { ...mockMovieAccountStates }
}

const actions = {
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

export const useMoviesAPI = () => actions
