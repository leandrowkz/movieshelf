import React from 'react'
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
