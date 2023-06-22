import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { FavoriteButton } from '.'
import { Movie } from '@leandrowkz/tmdb'

const { renderComponent, getMockMovies, screen } = useTesting()

test('Should render FavoriteButton properly', async () => {
  renderComponent(
    <FavoriteButton type="movie" show={getMockMovies(1)[0] as Movie} />
  )

  expect(screen.getByTestId('show-title')).toBeVisible()
  expect(screen.getByTestId('show-overview')).toBeVisible()
  expect(screen.getByTestId('show-year')).toBeVisible()
  expect(screen.getByTestId('show-genres')).toBeVisible()
  expect(screen.getByTestId('show-countries')).toBeVisible()
  expect(screen.getByTestId('show-poster')).toBeVisible()
  expect(screen.getByTestId('show-cast')).toBeVisible()
})
