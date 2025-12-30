import { mockGenresMoviesCodes } from '../../../__mocks__/mockGenresMoviesCodes'
import { mockGenresMoviesLists } from '../../../__mocks__/mockGenresMoviesLists'
import { mockGenresTVShowsCodes } from '../../../__mocks__/mockGenresTVShowsCodes'
import { mockGenresTVShowsLists } from '../../../__mocks__/mockGenresTVShowsLists'

async function fetchMoviesGenresCodes() {
  return [...mockGenresMoviesCodes]
}

async function fetchMoviesGenresLists() {
  return [...mockGenresMoviesLists]
}

async function fetchTVShowsGenresCodes() {
  return [...mockGenresTVShowsCodes]
}

async function fetchTVShowsGenresLists() {
  return [...mockGenresTVShowsLists]
}

const actions = {
  fetchMoviesGenresLists,
  fetchMoviesGenresCodes,
  fetchTVShowsGenresLists,
  fetchTVShowsGenresCodes,
}

export const useGenresAPI = () => actions
