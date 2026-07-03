/* eslint-disable no-restricted-imports */
import React, { type HTMLAttributes, type ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MovieListsContextProvider } from '../context/MovieListsContext'
import { MovieDetailsContextProvider } from '../context/MovieDetailsContext'
import { BrowserRouter } from 'react-router-dom'
import { TVShowListsContextProvider } from '../context/TVShowListsContext'
import { TVShowDetailsContextProvider } from '../context/TVShowDetailsContext'
import { TVSeasonDetailsContextProvider } from '../context/TVSeasonDetailsContext'
import type {
  MovieItem,
  PersonCast,
  TVEpisode,
  TVSeason,
  TVShowItem,
  Video,
  WatchProvider,
} from '@leandrowkz/tmdb'
import { mockMovieDetails } from '../__mocks__/mockMovieDetails'
import { mockTVShow } from '../__mocks__/mockTVShow'
import { mockPerson } from '../__mocks__/mockPerson'
import { mockVideo } from '../__mocks__/mockVideo'
import { mockTVEpisode } from '../__mocks__/mockTVEpisode'
import { mockTVSeason } from '../__mocks__/mockTVSeason'
import { mockWatchProvider } from '../__mocks__/mockWatchProvider'
import { GenresContextProvider } from '../context/GenresContext'
import type { GenresState } from '../context/GenresContext/types'
import { SearchContextProvider } from '../context/SearchContext'
import { PeopleContextProvider } from '../context/PeopleContext'

jest.mock('../context/GenresContext/state', () => {
  const { mockGenresMoviesCodes } = jest.requireActual(
    '../__mocks__/mockGenresMoviesCodes'
  )
  const { mockGenresMoviesLists } = jest.requireActual(
    '../__mocks__/mockGenresMoviesLists'
  )
  const { mockGenresTVShowsCodes } = jest.requireActual(
    '../__mocks__/mockGenresTVShowsCodes'
  )
  const { mockGenresTVShowsLists } = jest.requireActual(
    '../__mocks__/mockGenresTVShowsLists'
  )
  const { initialState: actualInitialState } = jest.requireActual(
    '../context/GenresContext/state'
  )

  const mockState: GenresState = {
    ...actualInitialState,
    moviesGenresCodes: [...mockGenresMoviesCodes],
    moviesGenresLists: [...mockGenresMoviesLists],
    tvShowsGenresCodes: [...mockGenresTVShowsCodes],
    tvShowsGenresLists: [...mockGenresTVShowsLists],
  }

  return { initialState: mockState }
})

const user = userEvent.setup()

function renderComponent(component: ReactElement) {
  const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <BrowserRouter>
      <GenresContextProvider>
        <TVShowListsContextProvider>
          <TVShowDetailsContextProvider>
            <TVSeasonDetailsContextProvider>
              <MovieListsContextProvider>
                <MovieDetailsContextProvider>
                  <SearchContextProvider>
                    <PeopleContextProvider>{children}</PeopleContextProvider>
                  </SearchContextProvider>
                </MovieDetailsContextProvider>
              </MovieListsContextProvider>
            </TVSeasonDetailsContextProvider>
          </TVShowDetailsContextProvider>
        </TVShowListsContextProvider>
      </GenresContextProvider>
    </BrowserRouter>
  )

  return render(component, { wrapper })
}

function getMockMovies(amount = 10) {
  const mockMovies: MovieItem[] = []

  for (let i = 0; i < amount; i++) {
    mockMovies.push({ ...mockMovieDetails })
  }

  return mockMovies
}

function getMockTVShows(amount = 10) {
  const mockTVShows: TVShowItem[] = []

  for (let i = 0; i < amount; i++) {
    mockTVShows.push({ ...mockTVShow })
  }

  return mockTVShows
}

function getMockTVSeasons(amount = 10) {
  const seasons: TVSeason[] = []

  for (let i = 0; i < amount; i++) {
    seasons.push({ ...mockTVSeason })
  }

  return seasons
}

function getMockTVEpisodes(amount = 10) {
  const eps: TVEpisode[] = []

  for (let i = 0; i < amount; i++) {
    eps.push({ ...mockTVEpisode })
  }

  return eps
}

function getMockPeople(amount = 10) {
  const mockPeople: PersonCast[] = []

  for (let i = 0; i < amount; i++) {
    mockPeople.push({ ...mockPerson })
  }

  return mockPeople
}

function getMockVideos(amount = 10) {
  const mockVideos: Video[] = []

  for (let i = 0; i < amount; i++) {
    mockVideos.push({ ...mockVideo })
  }

  return mockVideos
}

function getMockProviders(amount = 10) {
  const list: WatchProvider[] = []

  for (let i = 0; i < amount; i++) {
    list.push({ ...mockWatchProvider })
  }

  return list
}

export const useTesting = () => ({
  user,
  screen,
  getMockMovies,
  getMockPeople,
  getMockTVShows,
  getMockTVSeasons,
  getMockTVEpisodes,
  getMockVideos,
  getMockProviders,
  renderComponent,
})
