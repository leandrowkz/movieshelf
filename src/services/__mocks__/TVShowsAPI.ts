/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TVShow, TVShowCredits, TVShowItem, Video } from '@leandrowkz/tmdb'
import { mockTVShow } from '../../__mocks__/mockTVShow'
import { mockVideo } from '../../__mocks__/mockVideo'
import { mockTVShowCredits } from '../../__mocks__/mockTVShowCredits'

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
}

export const api = new TVShowsAPI()
