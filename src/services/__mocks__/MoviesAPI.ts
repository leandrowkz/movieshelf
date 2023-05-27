/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Movie, MovieCredits, MovieItem, Video } from '@leandrowkz/tmdb'
import { MovieGenre } from '../../types/MovieGenre'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { mockGenres } from '../../__mocks__/mockGenres'
import { mockVideo } from '../../__mocks__/mockVideo'
import { mockMovieCredits } from '../../__mocks__/mockMovieCredits'

class MoviesAPI {
  private getMockMovies(amount: number): MovieItem[] {
    const movies: MovieItem[] = []

    for (let i = 0; i < amount; i++) {
      movies.push({ ...mockMovieDetails })
    }

    return movies
  }

  public async fetchDetails(movieId: number): Promise<Movie> {
    return { ...mockMovieDetails }
  }

  public async fetchListSimilar(movieId: number): Promise<MovieItem[]> {
    return this.getMockMovies(10)
  }

  public async fetchListRecommended(movieId: number): Promise<MovieItem[]> {
    return this.getMockMovies(10)
  }

  public async fetchListInTheatres(filters = {}): Promise<MovieItem[]> {
    return this.getMockMovies(10)
  }

  public async fetchListByGenre(
    genres: number[],
    filters = {}
  ): Promise<MovieItem[]> {
    return this.getMockMovies(10)
  }

  public async fetchListMostPopular(page = 1): Promise<MovieItem[]> {
    return this.getMockMovies(10)
  }

  public async fetchListTrending(): Promise<MovieItem[]> {
    return this.getMockMovies(10)
  }

  public async fetchCredits(movieId: number): Promise<MovieCredits> {
    return { ...mockMovieCredits }
  }

  public async fetchVideos(movieId: number): Promise<Video[]> {
    return [{ ...mockVideo }]
  }

  public async fetchGenres(): Promise<MovieGenre[]> {
    return [...mockGenres]
  }
}

export const moviesAPI = new MoviesAPI()
