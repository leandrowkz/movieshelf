import React, { createContext } from 'react'
import type { PropsWithState } from 'src/types'
import type { GenresState } from '../GenresContext/types'
import { initialState } from '../GenresContext/state'
import { mockGenresMoviesCodes } from 'src/__mocks__/mockGenresMoviesCodes'
import { mockGenresMoviesLists } from 'src/__mocks__/mockGenresMoviesLists'
import { mockGenresTVShowsCodes } from 'src/__mocks__/mockGenresTVShowsCodes'
import { mockGenresTVShowsLists } from 'src/__mocks__/mockGenresTVShowsLists'

const mockState: GenresState = {
  ...initialState,
  moviesGenresCodes: [...mockGenresMoviesCodes],
  moviesGenresLists: { ...mockGenresMoviesLists },
  tvShowsGenresCodes: [...mockGenresTVShowsCodes],
  tvShowsGenresLists: { ...mockGenresTVShowsLists },
}

export const GenresContext = createContext<GenresState>({ ...mockState })

export const GenresContextProvider = ({
  children,
  state = { ...mockState },
}: PropsWithState<GenresState>) => {
  return (
    <GenresContext.Provider value={state}>{children}</GenresContext.Provider>
  )
}
