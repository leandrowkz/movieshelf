import type { Genre } from '@leandrowkz/tmdb'
import { mockGenresMovies } from 'src/__mocks__/mockGenresMovies'
import { mockGenresTVShows } from 'src/__mocks__/mockGenresTVShows'

export class GenresAPI {
  public async fetchMoviesGenres(): Promise<Genre[]> {
    return mockGenresMovies
  }

  public async fetchTVShowsGenres(): Promise<Genre[]> {
    return mockGenresTVShows
  }
}

export const api = new GenresAPI()
