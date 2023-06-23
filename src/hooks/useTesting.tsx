/* eslint-disable no-restricted-imports */
import React, { HTMLAttributes, ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MovieListsContextProvider } from '../context/MovieListsContext'
import { MovieDetailsContextProvider } from '../context/MovieDetailsContext'
import { BrowserRouter } from 'react-router-dom'
import { TVShowListsContextProvider } from 'src/context/TVShowListsContext'
import { TVShowDetailsContextProvider } from 'src/context/TVShowDetailsContext'
import { TVSeasonDetailsContextProvider } from 'src/context/TVSeasonDetailsContext'
import type {
  MovieAccountStates,
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
import { GenresContextProvider } from 'src/context/GenresContext'
import { AuthContextProvider } from 'src/context/AuthContext'
import { mockMovieAccountStates } from 'src/__mocks__/mockMovieAccountStates'
import { FavoritesContextProvider } from 'src/context/FavoritesContext'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  ScrollRestoration: () => <></>,
}))

jest.mock('src/hooks/useSupabase')
jest.mock('src/context/AuthContext')
jest.mock('src/context/GenresContext')

const user = userEvent.setup()

function renderComponent(component: ReactElement) {
  const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <BrowserRouter>
      <AuthContextProvider>
        <GenresContextProvider>
          <FavoritesContextProvider>
            <TVShowListsContextProvider>
              <TVShowDetailsContextProvider>
                <TVSeasonDetailsContextProvider>
                  <MovieListsContextProvider>
                    <MovieDetailsContextProvider>
                      {children}
                    </MovieDetailsContextProvider>
                  </MovieListsContextProvider>
                </TVSeasonDetailsContextProvider>
              </TVShowDetailsContextProvider>
            </TVShowListsContextProvider>
          </FavoritesContextProvider>
        </GenresContextProvider>
      </AuthContextProvider>
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

function getMockMovieAccountStates(amount = 10) {
  const list: MovieAccountStates[] = []

  for (let i = 0; i < amount; i++) {
    list.push({ ...mockMovieAccountStates })
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
  getMockMovieAccountStates,
  renderComponent,
})
