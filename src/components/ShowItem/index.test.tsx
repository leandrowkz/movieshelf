import React from 'react'
import { render } from '@testing-library/react'
import { ShowItem } from '.'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { BrowserRouter } from 'react-router-dom'

const makeSUT = () => {
  return { movie: { ...mockMovieDetails, genre_ids: [] } }
}

describe('ShowItem', () => {
  test('Should render ShowItem properly', async () => {
    const { movie } = makeSUT()
    const { getByTestId } = render(<ShowItem show={movie} />, {
      wrapper: BrowserRouter,
    })

    const link = getByTestId('show-poster-link') as HTMLLinkElement
    const title = getByTestId('show-title')
    const rating = getByTestId('show-rating')
    const categories = getByTestId('show-categories')

    expect(link).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(rating).toBeInTheDocument()
    expect(categories).toBeInTheDocument()
    expect(link.href).toEqual(`${window.location.href}movies/${movie.id}`)
  })
})
