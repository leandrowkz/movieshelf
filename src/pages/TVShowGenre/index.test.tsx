import React from 'react'
import { act } from '@testing-library/react'
import { useTesting } from 'src/hooks/useTesting'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'
import { TVShowGenre } from '.'

jest.mock('src/hooks/apis/useGenresAPI')
jest.mock('src/hooks/apis/useTVShowsAPI')

const { renderComponent, screen } = useTesting()
const api = useTVShowsAPI()

async function safeRenderComponent() {
  return act(async () => {
    renderComponent(<TVShowGenre />)
  })
}

test('should render TVShowGenre properly', async () => {
  await safeRenderComponent()

  expect(await screen.findByTestId('list-tv-shows-by-genre')).toBeVisible()
  expect(await screen.findByTestId('carousel-popular')).toBeVisible()
})

test('should render NotFound component when fetch errors occur', async () => {
  api.fetchListDiscover = jest.fn().mockRejectedValueOnce(false)
  await safeRenderComponent()

  expect(await screen.findByTestId('genre-not-found')).toBeVisible()
  expect(screen.queryByTestId('list-tv-shows-by-genre')).not.toBeInTheDocument()
})
