import type { TVShowItem } from '@leandrowkz/tmdb'
import { mockTVShow } from 'src/__mocks__/mockTVShow'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockTVShowCredits } from 'src/__mocks__/mockTVShowCredits'
import { mockTVShowsListsByGenres } from 'src/__mocks__/mockTVShowsListsByGenres'
import { mockTVShowsListPaginated } from 'src/__mocks__/mockTVShowsListPaginated'
import { mockShowStates } from 'src/__mocks__/mockShowStates'

function getMockTVShows(amount: number): TVShowItem[] {
  const shows: TVShowItem[] = []

  for (let i = 0; i < amount; i++) {
    shows.push({ ...mockTVShow })
  }

  return shows
}

async function fetchDetails() {
  return { ...mockTVShow }
}

async function fetchListSimilar() {
  return getMockTVShows(10)
}

async function fetchListRecommended() {
  return getMockTVShows(10)
}

async function fetchListByGenre() {
  return getMockTVShows(10)
}

async function fetchCredits() {
  return { ...mockTVShowCredits }
}

async function fetchVideos() {
  return [{ ...mockVideo }]
}

async function fetchListPopular() {
  return getMockTVShows(10)
}

async function fetchListOnTheAir() {
  return getMockTVShows(10)
}

async function fetchListAiringToday() {
  return getMockTVShows(10)
}

async function fetchListTopRated() {
  return getMockTVShows(10)
}

async function fetchListsByGenres() {
  return mockTVShowsListsByGenres
}

async function fetchStates() {
  return { ...mockShowStates }
}

async function fetchListPaginatedByGenre() {
  return { ...mockTVShowsListPaginated }
}

const apis = {
  fetchCredits,
  fetchDetails,
  fetchListAiringToday,
  fetchListByGenre,
  fetchListOnTheAir,
  fetchListPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTopRated,
  fetchListsByGenres,
  fetchListPaginatedByGenre,
  fetchVideos,
  fetchStates,
}

export const useTVShowsAPI = () => apis
