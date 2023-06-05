import React from 'react'
import { moviesAPI } from 'src/services/MoviesAPI'
import { useTesting } from 'src/hooks/useTesting'
import { MovieDetails } from '.'

jest.mock('src/services/MoviesAPI')

const { renderComponent, screen } = useTesting()

test('should render MovieDetails properly', async () => {
  renderComponent(<MovieDetails />)

  expect(await screen.findByTestId('show-details')).toBeVisible()
  expect(await screen.findByTestId('carousel-similar')).toBeVisible()
  expect(await screen.findByTestId('carousel-recommended')).toBeVisible()
  expect(await screen.findByTestId('carousel-trending')).toBeVisible()
})

test('should render NotFound component when fetch errors occur', async () => {
  moviesAPI['fetchDetails'] = jest.fn().mockRejectedValueOnce(false)
  renderComponent(<MovieDetails />)

  expect(await screen.findByTestId('show-not-found')).toBeVisible()
  expect(screen.queryByTestId('show-details')).not.toBeInTheDocument()
})
