import React from 'react'
import { act } from '@testing-library/react'
import { useTesting } from 'src/hooks/useTesting'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { MovieCategory } from '.'

jest.mock('src/hooks/apis/useMoviesAPI')

const { renderComponent, screen } = useTesting()
const api = useMoviesAPI()

async function safeRenderComponent() {
  return act(async () => {
    renderComponent(<MovieCategory />)
  })
}

test('should render MovieCategory properly', async () => {
  await safeRenderComponent()

  expect(await screen.findByTestId('list-movies-by-category')).toBeVisible()
})

test('should render NotFound component when fetch errors occur', async () => {
  api.fetchListPaginatedByGenre = jest.fn().mockRejectedValueOnce(false)
  await safeRenderComponent()

  expect(await screen.findByTestId('category-not-found')).toBeVisible()
  expect(
    screen.queryByTestId('list-movies-by-category')
  ).not.toBeInTheDocument()
})
