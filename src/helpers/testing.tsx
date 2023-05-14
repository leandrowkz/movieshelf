import React, { HTMLAttributes, ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MovieListsContextProvider } from '../store/MovieListsContext'
import { MovieDetailsContextProvider } from '../store/MovieDetailsContext'

jest.mock('react-router-dom', () => ({
  useParams: () => ({ movieId: 4040 }),
  ScrollRestoration: () => <></>,
  Link: () => <></>,
}))

export function renderComponent(component: ReactElement) {
  const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <MovieListsContextProvider>
      <MovieDetailsContextProvider>{children}</MovieDetailsContextProvider>
    </MovieListsContextProvider>
  )

  return render(component, { wrapper })
}
