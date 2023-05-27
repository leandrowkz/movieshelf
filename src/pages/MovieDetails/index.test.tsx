import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from 'src/helpers/testing'
import { MovieDetails } from '.'

jest.mock('src/services/MoviesAPI')

test('should render MovieDetails properly', async () => {
  renderComponent(<MovieDetails />)

  expect(await screen.findByTestId('show-details')).toBeVisible()
  expect(await screen.findByTestId('carousel-similar')).toBeVisible()
  expect(await screen.findByTestId('carousel-recommended')).toBeVisible()
  expect(await screen.findByTestId('carousel-trending')).toBeVisible()
})
