import React from 'react'
import { render } from '@testing-library/react'
import { ShowCarousel } from '.'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { Movie } from 'src/types/Movie'
import { BrowserRouter } from 'react-router-dom'

const makeSUT = () => {
  const mockMovies: Movie[] = []

  for (let i = 0; i < 10; i++) {
    mockMovies.push({ ...mockMovieDetails })
  }

  return { movies: mockMovies }
}

describe('ShowCarousel', () => {
  test('Should render ShowCarousel properly', async () => {
    const { movies } = makeSUT()
    const { container, getByText, queryByTestId } = render(
      <ShowCarousel shows={movies} title="MOCK CAROUSEL TITLE" />,
      { wrapper: BrowserRouter }
    )

    const title = getByText('MOCK CAROUSEL TITLE')
    const pages = container.querySelectorAll('.page')
    const items = container.querySelectorAll('.show')
    const loader = queryByTestId('loader')

    expect(title).toBeInTheDocument()
    expect(loader).not.toBeInTheDocument()
    expect(pages.length).toEqual(10)
    expect(items.length).toEqual(10)
  })

  test('Should render Loader properly', async () => {
    const { movies } = makeSUT()
    const { container, getByText, getByTestId } = render(
      <ShowCarousel shows={movies} title="MOCK CAROUSEL TITLE" isLoading />,
      { wrapper: BrowserRouter }
    )

    const title = getByText('MOCK CAROUSEL TITLE')
    const pages = container.querySelectorAll('.page')
    const items = container.querySelectorAll('.show')
    const loader = getByTestId('loader')

    expect(title).toBeInTheDocument()
    expect(loader).toBeInTheDocument()
    expect(pages.length).toEqual(0)
    expect(items.length).toEqual(0)
  })

  test('Should render properly when there are no items', async () => {
    const { container, queryByText, queryByTestId } = render(
      <ShowCarousel shows={[]} title="MOCK CAROUSEL TITLE" />,
      { wrapper: BrowserRouter }
    )

    const title = queryByText('MOCK CAROUSEL TITLE')
    const pages = container.querySelectorAll('.page')
    const items = container.querySelectorAll('.show')
    const loader = queryByTestId('loader')

    expect(title).not.toBeInTheDocument()
    expect(loader).not.toBeInTheDocument()
    expect(pages.length).toEqual(0)
    expect(items.length).toEqual(0)
  })
})
