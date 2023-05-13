import React from 'react'
import { render } from '@testing-library/react'
import { ShowGenres } from '.'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'

const makeSUT = () => {
  return { movie: { ...mockMovieDetails, genre_ids: [] } }
}

describe('ShowGenres', () => {
  test('Should render ShowGenres properly', async () => {
    const { movie } = makeSUT()
    const { getByText, queryByText } = render(<ShowGenres show={movie} />)

    const action = getByText('COMEDY')
    const comedy = getByText('ACTION')
    const adventure = queryByText('ADVENTURE')

    expect(action).toBeInTheDocument()
    expect(comedy).toBeInTheDocument()
    expect(adventure).not.toBeInTheDocument()
  })

  test('Should render ShowGenres properly with limit', async () => {
    const { movie } = makeSUT()
    const { getByText } = render(<ShowGenres show={movie} limit={3} />)

    const action = getByText('COMEDY')
    const comedy = getByText('ACTION')
    const adventure = getByText('ADVENTURE')

    expect(action).toBeInTheDocument()
    expect(comedy).toBeInTheDocument()
    expect(adventure).toBeInTheDocument()
  })

  test('Should render separator properly', async () => {
    const { movie } = makeSUT()
    const { getByText } = render(<ShowGenres show={movie} separator="#€&" />)

    const separator = getByText('#€&')

    expect(separator).toBeInTheDocument()
  })
})
