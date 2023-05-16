import React from 'react'
import type { MovieItem } from '@leandrowkz/tmdb'
import { render } from '@testing-library/react'
import { Banner } from '.'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { BrowserRouter } from 'react-router-dom'

const makeSUT = () => {
  const mockMovies: MovieItem[] = []

  for (let i = 0; i < 10; i++) {
    mockMovies.push({ ...mockMovieDetails })
  }

  return { movies: mockMovies }
}

describe('Banner', () => {
  test('Should render Banner properly', async () => {
    const { movies } = makeSUT()
    const { getByTestId, queryByTestId } = render(<Banner shows={movies} />, {
      wrapper: BrowserRouter,
    })

    const header = getByTestId('header')
    const loader = queryByTestId('loader')
    const items = getByTestId('pages')

    expect(header).toBeInTheDocument()
    expect(loader).not.toBeInTheDocument()
    expect(items).toBeInTheDocument()
  })

  test('Should render Loader properly', async () => {
    const { movies } = makeSUT()
    const { getByTestId, queryByTestId } = render(
      <Banner shows={movies} isLoading />,
      { wrapper: BrowserRouter }
    )

    const header = getByTestId('header')
    const loader = getByTestId('loader')
    const items = queryByTestId('pages')

    expect(header).toBeInTheDocument()
    expect(loader).toBeInTheDocument()
    expect(items).not.toBeInTheDocument()
  })
})
