import React, { createContext } from 'react'
import { initialState } from '../GenresContext/state'
import type { GenresState } from '../GenresContext/types'
import { mockGenresTVShows } from 'src/__mocks__/mockGenresTVShows'
import { mockGenresMovies } from 'src/__mocks__/mockGenresMovies'
import type { PropsWithState } from 'types'

const mockState: GenresState = {
  ...initialState,
  moviesGenres: [...mockGenresMovies],
  tvShowsGenres: [...mockGenresTVShows],
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
