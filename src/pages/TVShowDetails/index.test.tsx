import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { TVShowDetails } from '.'

jest.mock('src/services/TVShowsAPI')

const { renderComponent, screen } = useTesting()

test('should render TVShowDetails properly', async () => {
  renderComponent(<TVShowDetails />)

  expect(await screen.findByTestId('show-details')).toBeVisible()
  expect(await screen.findByTestId('carousel-similar')).toBeVisible()
  expect(await screen.findByTestId('carousel-recommended')).toBeVisible()
  expect(await screen.findByTestId('carousel-popular')).toBeVisible()
  expect(await screen.findByTestId('show-seasons')).toBeVisible()
})
