import React from 'react'
import { act } from '@testing-library/react'
import { useTesting } from 'src/hooks/useTesting'
import { useTVShowsAPI } from 'src/hooks/apis/useTVShowsAPI'
import { TVShowCategory } from '.'

const { renderComponent, screen } = useTesting()
const api = useTVShowsAPI()

async function safeRenderComponent() {
  return act(async () => {
    renderComponent(<TVShowCategory />)
  })
}

jest.mock('src/hooks/apis/useTVShowsAPI')

test('should render TVShowCategory properly', async () => {
  await safeRenderComponent()

  expect(await screen.findByTestId('list-tv-shows-by-category')).toBeVisible()
})

test('should render NotFound component when fetch errors occur', async () => {
  api.fetchListByGenre = jest.fn().mockRejectedValueOnce(false)
  await safeRenderComponent()

  expect(await screen.findByTestId('category-not-found')).toBeVisible()
  expect(
    screen.queryByTestId('list-tv-shows-by-category')
  ).not.toBeInTheDocument()
})
