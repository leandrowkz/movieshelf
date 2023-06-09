/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TVShow, TVShowCredits, TVShowItem, Video } from '@leandrowkz/tmdb'
import { mockTVShow } from '../../__mocks__/mockTVShow'
import { mockVideo } from '../../__mocks__/mockVideo'
import { mockTVShowCredits } from '../../__mocks__/mockTVShowCredits'
import { ListByGenre } from 'src/types/ListByGenre'
import { mockTVShowsListsByGenres } from 'src/__mocks__/mockTVShowsListsByGenres'

class TVShowsAPI {
  private getMockTVShows(amount: number): TVShowItem[] {
    const TVShows: TVShowItem[] = []

    for (let i = 0; i < amount; i++) {
      TVShows.push({ ...mockTVShow })
    }

    return TVShows
  }

  public async fetchDetails(tvShowId: number): Promise<TVShow> {
    return { ...mockTVShow }
  }

  public async fetchListSimilar(tvShowId: number): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchListRecommended(tvShowId: number): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchListByGenre(
    genres: number[],
    filters = {}
  ): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchCredits(TVShowId: number): Promise<TVShowCredits> {
    return { ...mockTVShowCredits }
  }

  public async fetchVideos(TVShowId: number): Promise<Video[]> {
    return [{ ...mockVideo }]
  }

  public async fetchListPopular(): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchListOnTheAir(): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchListAiringToday(): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchListTopRated(): Promise<TVShowItem[]> {
    return this.getMockTVShows(10)
  }

  public async fetchListsByGenres(): Promise<ListByGenre<TVShowItem>[]> {
    return mockTVShowsListsByGenres
  }
}

export const api = new TVShowsAPI()
