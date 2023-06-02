/* eslint-disable no-restricted-imports */
import React, { HTMLAttributes, ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MovieListsContextProvider } from '../context/MovieListsContext'
import { MovieDetailsContextProvider } from '../context/MovieDetailsContext'
import { BrowserRouter } from 'react-router-dom'
import { TVShowListsContextProvider } from 'src/context/TVShowListsContext'
import { TVShowDetailsContextProvider } from 'src/context/TVShowDetailsContext'
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  ScrollRestoration: () => <></>,
}))

const user = userEvent.setup()

function renderComponent(component: ReactElement) {
  const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <BrowserRouter>
      <TVShowListsContextProvider>
        <TVShowDetailsContextProvider>
          <MovieListsContextProvider>
            <MovieDetailsContextProvider>
              {children}
            </MovieDetailsContextProvider>
          </MovieListsContextProvider>
        </TVShowDetailsContextProvider>
      </TVShowListsContextProvider>
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

export const useTesting = () => ({
  user,
  screen,
  getMockMovies,
  getMockPeople,
  getMockTVShows,
  getMockTVSeasons,
  getMockTVEpisodes,
  getMockVideos,
  renderComponent,
})
