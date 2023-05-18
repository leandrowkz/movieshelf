import React, { HTMLAttributes, ReactElement } from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MovieListsContextProvider } from '../store/MovieListsContext'
import { MovieDetailsContextProvider } from '../store/MovieDetailsContext'
import { BrowserRouter } from 'react-router-dom'

export function renderComponent(component: ReactElement) {
  const user = userEvent.setup()

  const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <BrowserRouter>
      <MovieListsContextProvider>
        <MovieDetailsContextProvider>{children}</MovieDetailsContextProvider>
      </MovieListsContextProvider>
    </BrowserRouter>
  )

  return { user, ...render(component, { wrapper }) }
}
