import { mockGenresMovies } from 'src/__mocks__/mockGenresMovies'
import { mockGenresTVShows } from 'src/__mocks__/mockGenresTVShows'

async function fetchMoviesGenres() {
  return [...mockGenresMovies]
}

async function fetchTVShowsGenres() {
  return [...mockGenresTVShows]
}

const actions = {
  fetchMoviesGenres,
  fetchTVShowsGenres,
}

export const useGenresAPI = () => actions
