import { mockGenresMoviesCodes } from 'src/__mocks__/mockGenresMoviesCodes'
import { mockGenresMoviesLists } from 'src/__mocks__/mockGenresMoviesLists'
import { mockGenresTVShowsCodes } from 'src/__mocks__/mockGenresTVShowsCodes'
import { mockGenresTVShowsLists } from 'src/__mocks__/mockGenresTVShowsLists'

async function fetchMoviesGenresCodes() {
  return [...mockGenresMoviesCodes]
}

async function fetchMoviesGenresLists() {
  return { ...mockGenresMoviesLists }
}

async function fetchTVShowsGenresCodes() {
  return [...mockGenresTVShowsCodes]
}

async function fetchTVShowsGenresLists() {
  return { ...mockGenresTVShowsLists }
}

const actions = {
  fetchMoviesGenresLists,
  fetchMoviesGenresCodes,
  fetchTVShowsGenresLists,
  fetchTVShowsGenresCodes,
}

export const useGenresAPI = () => actions
