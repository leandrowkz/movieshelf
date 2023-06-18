import type { TVShow, TVShowCredits, TVShowItem, Video } from '@leandrowkz/tmdb'
import { APIFetcherPublic } from './APIFetcherPublic'
import { ListByGenre } from 'src/types/ListByGenre'

class TVShowsAPI extends APIFetcherPublic {
  constructor() {
    super('')
  }

  public async fetchDetails(tvShowId: number): Promise<TVShow> {
    const path = this.getPath('/api/tv-shows/details', { tvShowId })

    return this.get<TVShow>(path)
  }

  public async fetchListPopular(): Promise<TVShowItem[]> {
    const path = this.getPath('/api/tv-shows/popular')

    return this.get<TVShowItem[]>(path)
  }

  public async fetchListOnTheAir(): Promise<TVShowItem[]> {
    const path = this.getPath('/api/tv-shows/on-the-air')

    return this.get<TVShowItem[]>(path)
  }

  public async fetchListAiringToday(): Promise<TVShowItem[]> {
    const path = this.getPath('/api/tv-shows/airing-today')

    return this.get<TVShowItem[]>(path)
  }

  public async fetchListTopRated(): Promise<TVShowItem[]> {
    const path = this.getPath('/api/tv-shows/top-rated')

    return this.get<TVShowItem[]>(path)
  }

  public async fetchListSimilar(tvShowId: number): Promise<TVShowItem[]> {
    const path = this.getPath('/api/tv-shows/similar', { tvShowId })

    return await this.get<TVShowItem[]>(path)
  }

  public async fetchListRecommended(tvShowId: number): Promise<TVShowItem[]> {
    const path = this.getPath('/api/tv-shows/recommended', { tvShowId })

    return this.get<TVShowItem[]>(path)
  }

  public async fetchListByGenre(
    genres: number[],
    filters = {}
  ): Promise<TVShowItem[]> {
    const fetchFilters = {
      with_genres: genres.join(','),
      ...filters,
    }
    const path = this.getPath('api/tv-shows/by-genre', fetchFilters)

    return this.get<TVShowItem[]>(path)
  }

  public async fetchListsByGenres(
    genres: number[]
  ): Promise<ListByGenre<TVShowItem>[]> {
    const fetchFilters = { with_genres: genres.join(',') }
    const path = this.getPath('api/tv-shows/lists-by-genres', fetchFilters)

    return this.get<ListByGenre<TVShowItem>[]>(path)
  }

  public async fetchCredits(tvShowId: number): Promise<TVShowCredits> {
    const path = this.getPath('/api/tv-shows/credits', { tvShowId })

    return this.get<TVShowCredits>(path)
  }

  public async fetchVideos(tvShowId: number): Promise<Video[]> {
    const path = this.getPath('/api/tv-shows/videos', { tvShowId })

    return this.get<Video[]>(path)
  }
}

export const api = new TVShowsAPI()
