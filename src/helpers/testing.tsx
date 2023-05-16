import React, { HTMLAttributes, ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MovieListsContextProvider } from '../store/MovieListsContext'
import { MovieDetailsContextProvider } from '../store/MovieDetailsContext'

jest.mock('react-router-dom', () => ({
  useParams: () => ({ movieId: 4040 }),
  ScrollRestoration: () => <></>,
  Link: () => <></>,
}))

export function renderComponent(component: ReactElement) {
  const user = userEvent.setup()

  const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <MovieListsContextProvider>
      <MovieDetailsContextProvider>{children}</MovieDetailsContextProvider>
    </MovieListsContextProvider>
  )

  return { user, ...render(component, { wrapper }) }
}
