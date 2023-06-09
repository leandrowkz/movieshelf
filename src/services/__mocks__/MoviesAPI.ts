/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  Genre,
  Movie,
  MovieCredits,
  MovieItem,
  Video,
} from '@leandrowkz/tmdb'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { mockVideo } from '../../__mocks__/mockVideo'
import { mockMovieCredits } from '../../__mocks__/mockMovieCredits'
import { mockMoviesListsByGenres } from 'src/__mocks__/mockMoviesListsByGenres'
import { ListByGenre } from 'src/types/ListByGenre'

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

  public async fetchListsByGenres(): Promise<ListByGenre<MovieItem>[]> {
    return mockMoviesListsByGenres
  }
}

export const moviesAPI = new MoviesAPI()
