import { mockPerson } from 'src/__mocks__/mockPerson'
import { mockPersonMoviesLists } from 'src/__mocks__/mockPersonMoviesLists'
import { mockPersonTVShowsLists } from 'src/__mocks__/mockPersonTVShowsLists'
import { mockPersonImages } from 'src/__mocks__/mockPersonImages'

async function fetchPerson() {
  return { ...mockPerson }
}

async function fetchMovies() {
  return [...mockPersonMoviesLists]
}

async function fetchTVShows() {
  return [...mockPersonTVShowsLists]
}

async function fetchImages() {
  return [...mockPersonImages]
}

const actions = {
  fetchPerson,
  fetchImages,
  fetchMovies,
  fetchTVShows,
}

export const usePeopleAPI = () => actions
