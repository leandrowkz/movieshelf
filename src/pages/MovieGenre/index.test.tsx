import React from 'react'
import { act } from '@testing-library/react'
import { useTesting } from 'src/hooks/useTesting'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { MovieGenre } from '.'

jest.mock('src/hooks/apis/useMoviesAPI')

const { renderComponent, screen } = useTesting()
const api = useMoviesAPI()

async function safeRenderComponent() {
  return act(async () => {
    renderComponent(<MovieGenre />)
  })
}

beforeEach(() => {
  jest.unmock('src/context/GenresContext')
})

test('should render MovieGenre properly', async () => {
  await safeRenderComponent()

  expect(await screen.findByTestId('list-movies-by-genre')).toBeVisible()
  expect(await screen.findByTestId('carousel-popular')).toBeVisible()
})

test('should render NotFound component when fetch errors occur', async () => {
  api.fetchListDiscover = jest.fn().mockRejectedValueOnce(false)
  await safeRenderComponent()

  expect(await screen.findByTestId('genre-not-found')).toBeVisible()
  expect(screen.queryByTestId('list-movies-by-genre')).not.toBeInTheDocument()
  expect(screen.queryByTestId('carousel-popular')).not.toBeInTheDocument()
})
