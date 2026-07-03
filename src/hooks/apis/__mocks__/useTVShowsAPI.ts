import { mockTVShow } from '../../../__mocks__/mockTVShow'
import { mockVideo } from '../../../__mocks__/mockVideo'
import { mockTVShowCredits } from '../../../__mocks__/mockTVShowCredits'
import { mockWatchProvider } from '../../../__mocks__/mockWatchProvider'
import { mockTVShowsListPaginated } from '../../../__mocks__/mockTVShowsListPaginated'

async function fetchTVShow() {
  return { ...mockTVShow }
}

async function fetchCredits() {
  return { ...mockTVShowCredits }
}

async function fetchVideos() {
  return [{ ...mockVideo }]
}

async function fetchWatchProviders() {
  return [{ ...mockWatchProvider }, { ...mockWatchProvider }]
}

async function fetchListSimilar() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListRecommended() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListPopular() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListOnTheAir() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListAiringToday() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListTopRated() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListDiscover() {
  return { ...mockTVShowsListPaginated }
}

async function fetchListSearch() {
  return { ...mockTVShowsListPaginated }
}

const apis = {
  fetchTVShow,
  fetchCredits,
  fetchVideos,
  fetchWatchProviders,
  fetchListSearch,
  fetchListAiringToday,
  fetchListDiscover,
  fetchListOnTheAir,
  fetchListPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTopRated,
}

export const useTVShowsAPI = () => apis
