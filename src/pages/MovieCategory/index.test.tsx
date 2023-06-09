import React from 'react'
import { moviesAPI } from 'src/services/MoviesAPI'
import { useTesting } from 'src/hooks/useTesting'
import { MovieCategory } from '.'
import { act } from '@testing-library/react'

jest.mock('src/services/MoviesAPI')

const { renderComponent, screen } = useTesting()

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
  moviesAPI['fetchListByGenre'] = jest.fn().mockRejectedValueOnce(false)
  await safeRenderComponent()

  expect(await screen.findByTestId('category-not-found')).toBeVisible()
  expect(
    screen.queryByTestId('list-movies-by-category')
  ).not.toBeInTheDocument()
})
