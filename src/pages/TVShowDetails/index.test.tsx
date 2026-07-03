import React from 'react'
import { useTVShowsAPI } from '../../hooks/apis/useTVShowsAPI'
import { useTesting } from '../../hooks/useTesting'
import { TVShowDetails } from '.'

jest.mock('../../hooks/apis/useTVShowsAPI')
jest.mock('../../hooks/apis/useTVSeasonsAPI')

const { renderComponent, screen } = useTesting()
const api = useTVShowsAPI()

test('should render TVShowDetails properly', async () => {
  renderComponent(<TVShowDetails />)

  expect(await screen.findByTestId('show-details')).toBeVisible()
  expect(await screen.findByTestId('carousel-similar')).toBeVisible()
  expect(await screen.findByTestId('carousel-recommended')).toBeVisible()
  expect(await screen.findByTestId('carousel-popular')).toBeVisible()
  expect(await screen.findByTestId('show-seasons')).toBeVisible()
})

test('should render NotFound component when fetch errors occur', async () => {
  api.fetchTVShow = jest.fn().mockRejectedValueOnce(false)
  renderComponent(<TVShowDetails />)

  expect(await screen.findByTestId('show-not-found')).toBeVisible()
  expect(screen.queryByTestId('show-details')).not.toBeInTheDocument()
})
