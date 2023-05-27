import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { BannerPages } from './pages'

const { renderComponent, getMockMovies, screen } = useTesting()

test('Should render BannerPages properly', async () => {
  const movies = getMockMovies()
  const mockMovie = movies[0]
  renderComponent(<BannerPages shows={movies} />)

  const title = screen.getByText(mockMovie.title)
  const overview = screen.getByText(mockMovie.overview || '')
  const linkButton = screen.getByTestId('show-link') as HTMLLinkElement
  const bullets = screen.getByTestId('bullets')

  expect(title).toBeInTheDocument()
  expect(overview).toBeInTheDocument()
  expect(linkButton).toBeInTheDocument()
  expect(linkButton.href).toEqual(
    `${window.location.href}movies/${mockMovie.id}`
  )
  expect(bullets).toBeInTheDocument()
  expect(bullets.childNodes.length).toEqual(movies.length)
})
