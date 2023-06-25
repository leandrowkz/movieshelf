/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  TVShow,
  TVShowAccountStates,
  TVShowCredits,
  TVShowItem,
  Video,
} from '@leandrowkz/tmdb'
import { mockTVShow } from 'src/__mocks__/mockTVShow'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockTVShowCredits } from 'src/__mocks__/mockTVShowCredits'
import { ListByGenre } from 'src/types/ListByGenre'
import { mockTVShowsListsByGenres } from 'src/__mocks__/mockTVShowsListsByGenres'
import { mockMovieAccountStates } from 'src/__mocks__/mockMovieAccountStates'

function getMockTVShows(amount: number): TVShowItem[] {
  const TVShows: TVShowItem[] = []

  for (let i = 0; i < amount; i++) {
    TVShows.push({ ...mockTVShow })
  }

  return TVShows
}

async function fetchDetails(tvShowId: number): Promise<TVShow> {
  return { ...mockTVShow }
}

async function fetchListSimilar(tvShowId: number): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchListRecommended(tvShowId: number): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchListByGenre(
  genres: number[],
  filters = {}
): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchCredits(TVShowId: number): Promise<TVShowCredits> {
  return { ...mockTVShowCredits }
}

async function fetchVideos(TVShowId: number): Promise<Video[]> {
  return [{ ...mockVideo }]
}

async function fetchListPopular(): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchListOnTheAir(): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchListAiringToday(): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchListTopRated(): Promise<TVShowItem[]> {
  return getMockTVShows(10)
}

async function fetchListsByGenres(): Promise<ListByGenre<TVShowItem>[]> {
  return mockTVShowsListsByGenres
}

async function fetchAccountStates(): Promise<TVShowAccountStates> {
  return { ...(mockMovieAccountStates as TVShowAccountStates) }
}

export default {
  fetchAccountStates,
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
  fetchVideos,
}
