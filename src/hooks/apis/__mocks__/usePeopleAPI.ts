import { mockPerson } from '../../../__mocks__/mockPerson'
import { mockPersonMoviesLists } from '../../../__mocks__/mockPersonMoviesLists'
import { mockPersonTVShowsLists } from '../../../__mocks__/mockPersonTVShowsLists'
import { mockPersonImages } from '../../../__mocks__/mockPersonImages'

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
