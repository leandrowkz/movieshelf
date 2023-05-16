import React from 'react'
import type { MovieItem } from '@leandrowkz/tmdb'
import { render } from '@testing-library/react'
import { BannerPages } from './pages'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { BrowserRouter } from 'react-router-dom'

const makeSUT = () => {
  const mockMovies: MovieItem[] = []

  for (let i = 0; i < 10; i++) {
    mockMovies.push({ ...mockMovieDetails })
  }

  return { movies: mockMovies }
}

describe('BannerPages', () => {
  test('Should render BannerPages properly', async () => {
    const { movies } = makeSUT()
    const mockMovie = movies[0]
    const { getByText, getByTestId } = render(<BannerPages shows={movies} />, {
      wrapper: BrowserRouter,
    })

    const title = getByText(mockMovie.title)
    const overview = getByText(mockMovie.overview || '')
    const linkButton = getByTestId('show-link') as HTMLLinkElement
    const bullets = getByTestId('bullets')

    expect(title).toBeInTheDocument()
    expect(overview).toBeInTheDocument()
    expect(linkButton).toBeInTheDocument()
    expect(linkButton.href).toEqual(
      `${window.location.href}movies/${mockMovie.id}`
    )
    expect(bullets).toBeInTheDocument()
    expect(bullets.childNodes.length).toEqual(movies.length)
  })
})
