import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from 'src/helpers/testing'
import { TVShowDetails } from '.'

jest.mock('src/services/TVShowsAPI')

test('should render TVShowDetails properly', async () => {
  renderComponent(<TVShowDetails />)

  expect(await screen.findByTestId('show-details')).toBeVisible()
  expect(await screen.findByTestId('carousel-similar')).toBeVisible()
  expect(await screen.findByTestId('carousel-recommended')).toBeVisible()
  expect(await screen.findByTestId('carousel-popular')).toBeVisible()
})
