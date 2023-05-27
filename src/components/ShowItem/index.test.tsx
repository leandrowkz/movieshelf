import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowItem } from '.'

const { renderComponent, getMockMovies, screen } = useTesting()

function getMovie() {
  const movie = getMockMovies(1)[0]

  return { ...movie, genre_ids: [] }
}

test('Should render ShowItem properly', async () => {
  const movie = getMovie()
  renderComponent(<ShowItem show={movie} />)

  const link = screen.getByTestId('show-poster-link') as HTMLLinkElement

  expect(link).toBeVisible()
  expect(screen.getByTestId('show-title')).toBeVisible()
  expect(screen.getByTestId('show-rating')).toBeVisible()
  expect(screen.getByTestId('show-categories')).toBeVisible()

  expect(link.href).toEqual(`${window.location.href}movies/${movie.id}`)
})
