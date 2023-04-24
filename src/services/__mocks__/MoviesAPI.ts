/* eslint-disable @typescript-eslint/no-unused-vars */
import { Movie } from 'src/types/Movie'
import { MovieCredits } from 'src/types/MovieCredits'
import { MovieVideo } from 'src/types/MovieVideo'
import { MovieGenre } from 'src/types/MovieGenre'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { mockGenres } from '../../__mocks__/mockGenres'
import { mockMovieVideo } from '../../__mocks__/mockMovieVideo'
import { mockMovieCredits } from '../../__mocks__/mockMovieCredits'

class MoviesAPI {
  private getMockMovies(amount: number): Movie[] {
    const movies: Movie[] = []

    for (let i = 0; i < amount; i++) {
      movies.push({ ...mockMovieDetails })
    }

    return movies
  }

  public async fetchDetails(movieId: number): Promise<Movie> {
    return { ...mockMovieDetails }
  }

  public async fetchListSimilar(movieId: number): Promise<Movie[]> {
    return this.getMockMovies(10)
  }

  public async fetchListRecommended(movieId: number): Promise<Movie[]> {
    return this.getMockMovies(10)
  }

  public async fetchListInTheatres(filters = {}): Promise<Movie[]> {
    return this.getMockMovies(10)
  }

  public async fetchListByGenre(
    genres: number[],
    filters = {}
  ): Promise<Movie[]> {
    return this.getMockMovies(10)
  }

  public async fetchListMostPopular(page = 1): Promise<Movie[]> {
    return this.getMockMovies(10)
  }

  public async fetchListTrending(): Promise<Movie[]> {
    return this.getMockMovies(10)
  }

  public async fetchCredits(movieId: number): Promise<MovieCredits> {
    return { ...mockMovieCredits }
  }

  public async fetchVideos(movieId: number): Promise<MovieVideo[]> {
    return [{ ...mockMovieVideo }]
  }

  public async fetchGenres(): Promise<MovieGenre[]> {
    return [...mockGenres]
  }
}

export const moviesAPI = new MoviesAPI()
