/* eslint-disable no-restricted-imports */
import React, { type HTMLAttributes, type ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MovieListsContextProvider } from '../context/MovieListsContext'
import { MovieDetailsContextProvider } from '../context/MovieDetailsContext'
import { BrowserRouter } from 'react-router-dom'
import { TVShowListsContextProvider } from 'src/context/TVShowListsContext'
import { TVShowDetailsContextProvider } from 'src/context/TVShowDetailsContext'
import { TVSeasonDetailsContextProvider } from 'src/context/TVSeasonDetailsContext'
import type {
  MovieItem,
  PersonCast,
  TVEpisode,
  TVSeason,
  TVShowItem,
  Video,
} from '@leandrowkz/tmdb'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockTVShow } from 'src/__mocks__/mockTVShow'
import { mockPerson } from 'src/__mocks__/mockPerson'
import { mockVideo } from 'src/__mocks__/mockVideo'
import { mockTVEpisode } from 'src/__mocks__/mockTVEpisode'
import { mockTVSeason } from 'src/__mocks__/mockTVSeason'
import {
  AuthContext as MockAuthContext,
  AuthContextProvider as MockAuthContextProvider,
} from 'src/context/__mocks__/AuthContext'
import { UserListsContextProvider } from 'src/context/UserListsContext'
import type { UserShowStates } from 'src/types'
import { mockShowStates } from 'src/__mocks__/mockShowStates'
import { GenresContextProvider } from 'src/context/GenresContext'
import type { GenresState } from 'src/context/GenresContext/types'
import { SearchContextProvider } from 'src/context/SearchContext'
import { PeopleContextProvider } from 'src/context/PeopleContext'

jest.mock('src/hooks/useSupabase')

jest.mock('src/context/AuthContext', () => ({
  ...jest.requireActual('src/context/AuthContext'),
  AuthContext: MockAuthContext,
  AuthContextProvider: MockAuthContextProvider,
}))

jest.mock('src/context/GenresContext/state', () => {
  const { mockGenresMoviesCodes } = jest.requireActual(
    'src/__mocks__/mockGenresMoviesCodes'
  )
  const { mockGenresMoviesLists } = jest.requireActual(
    'src/__mocks__/mockGenresMoviesLists'
  )
  const { mockGenresTVShowsCodes } = jest.requireActual(
    'src/__mocks__/mockGenresTVShowsCodes'
  )
  const { mockGenresTVShowsLists } = jest.requireActual(
    'src/__mocks__/mockGenresTVShowsLists'
  )
  const { initialState: actualInitialState } = jest.requireActual(
    'src/context/GenresContext/state'
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
      <MockAuthContextProvider>
        <GenresContextProvider>
          <UserListsContextProvider>
            <TVShowListsContextProvider>
              <TVShowDetailsContextProvider>
                <TVSeasonDetailsContextProvider>
                  <MovieListsContextProvider>
                    <MovieDetailsContextProvider>
                      <SearchContextProvider>
                        <PeopleContextProvider>
                          {children}
                        </PeopleContextProvider>
                      </SearchContextProvider>
                    </MovieDetailsContextProvider>
                  </MovieListsContextProvider>
                </TVSeasonDetailsContextProvider>
              </TVShowDetailsContextProvider>
            </TVShowListsContextProvider>
          </UserListsContextProvider>
        </GenresContextProvider>
      </MockAuthContextProvider>
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

function getMockShowStates(amount = 10) {
  const list: UserShowStates[] = []

  for (let i = 0; i < amount; i++) {
    list.push({ ...mockShowStates })
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
  getMockShowStates,
  renderComponent,
})
