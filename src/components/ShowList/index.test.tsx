import React from 'react'
import type { MovieItem } from '@leandrowkz/tmdb'
import { screen } from '@testing-library/react'
import { ShowList } from '.'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { renderComponent } from '../../helpers/testing'

function getMockMovies(length = 10) {
  const mockMovies: MovieItem[] = []

  for (let i = 0; i < length; i++) {
    mockMovies.push({ ...mockMovieDetails })
  }

  return mockMovies
}

function render(title = '', movies = getMockMovies(), isLoading = false) {
  return renderComponent(
    <ShowList shows={movies} title={title} isLoading={isLoading} />
  )
}

describe('ShowList', () => {
  test('Should render ShowList properly', async () => {
    render('MOCK LIST TITLE')

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(screen.getByText('MOCK LIST TITLE')).toBeInTheDocument()
    expect(screen.getAllByTestId('show-item').length).toEqual(10)
  })

  test('Should render Loader properly', async () => {
    render('MOCK LIST TITLE', getMockMovies(), true)

    expect(screen.getByText('MOCK LIST TITLE')).toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.queryAllByTestId('show-item').length).toEqual(0)
  })

  test('Should render properly when there are no items', async () => {
    render('MOCK LIST TITLE', [])

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(screen.queryByText('MOCK LIST TITLE')).not.toBeInTheDocument()
    expect(screen.queryAllByTestId('show-item').length).toEqual(0)
  })
})
