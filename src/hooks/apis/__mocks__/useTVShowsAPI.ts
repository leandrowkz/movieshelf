import { mockTVShow } from 'src/__mocks__/mockTVShow'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockTVShowCredits } from 'src/__mocks__/mockTVShowCredits'
import { mockShowStates } from 'src/__mocks__/mockShowStates'
import { mockTVShowsListPaginated } from 'src/__mocks__/mockTVShowsListPaginated'

async function fetchTVShow() {
  return { ...mockTVShow }
}

async function fetchCredits() {
  return { ...mockTVShowCredits }
}

async function fetchVideos() {
  return [{ ...mockVideo }]
}

async function fetchStates() {
  return { ...mockShowStates }
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

const apis = {
  fetchTVShow,
  fetchCredits,
  fetchVideos,
  fetchStates,
  fetchListAiringToday,
  fetchListDiscover,
  fetchListOnTheAir,
  fetchListPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTopRated,
}

export const useTVShowsAPI = () => apis
