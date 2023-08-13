import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockMovieCredits } from 'src/__mocks__/mockMovieCredits'
import { mockShowStates } from 'src/__mocks__/mockShowStates'
import { mockWatchProvider } from 'src/__mocks__/mockWatchProvider'
import { mockMoviesListPaginated } from 'src/__mocks__/mockMoviesListPaginated'

async function fetchCredits() {
  return { ...mockMovieCredits }
}

async function fetchVideos() {
  return [{ ...mockVideo }]
}

async function fetchStates() {
  return { ...mockShowStates }
}

async function fetchWatchProviders() {
  return [{ ...mockWatchProvider }, { ...mockWatchProvider }]
}

async function fetchMovie() {
  return { ...mockMovieDetails }
}

async function fetchListSimilar() {
  return { ...mockMoviesListPaginated }
}

async function fetchListRecommended() {
  return { ...mockMoviesListPaginated }
}

async function fetchListInTheatres() {
  return { ...mockMoviesListPaginated }
}

async function fetchListPopular() {
  return { ...mockMoviesListPaginated }
}

async function fetchListTrending() {
  return { ...mockMoviesListPaginated }
}

async function fetchListDiscover() {
  return { ...mockMoviesListPaginated }
}

async function fetchListSearch() {
  return { ...mockMoviesListPaginated }
}

const actions = {
  fetchMovie,
  fetchCredits,
  fetchVideos,
  fetchStates,
  fetchWatchProviders,
  fetchListSearch,
  fetchListPopular,
  fetchListDiscover,
  fetchListInTheatres,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTrending,
}

export const useMoviesAPI = () => actions
