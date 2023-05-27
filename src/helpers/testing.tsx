import React, { HTMLAttributes, ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MovieListsContextProvider } from '../store/MovieListsContext'
import { MovieDetailsContextProvider } from '../store/MovieDetailsContext'
import { BrowserRouter } from 'react-router-dom'
import { TVShowListsContextProvider } from 'src/store/TVShowListsContext'
import { TVShowDetailsContextProvider } from 'src/store/TVShowDetailsContext'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  ScrollRestoration: () => <></>,
}))

export function renderComponent(component: ReactElement) {
  const user = userEvent.setup()

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

  return { user, ...render(component, { wrapper }) }
}
