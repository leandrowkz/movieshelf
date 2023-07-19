import React from 'react'
import type { Movie } from '@leandrowkz/tmdb'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { useTesting } from 'src/hooks/useTesting'
import { FavoriteButton } from '.'
import { mockShowStates } from 'src/__mocks__/mockShowStates'

jest.mock('src/hooks/apis/useMoviesAPI')

const api = useMoviesAPI()
const { renderComponent, getMockMovies, getMockShowStates, screen } =
  useTesting()

function getComponent(favorited = true) {
  const show = { ...(getMockMovies(1)[0] as Movie) }
  const states = { ...getMockShowStates(1)[0], favorited }

  return <FavoriteButton show={show} states={states} />
}

test('Should render FavoriteButton properly', async () => {
  renderComponent(getComponent(false))

  expect(screen.getByTestId('button-off')).toBeVisible()
})

test('Should render checked properly', async () => {
  const movie = getMockMovies(1)[0]
  const states = { ...mockShowStates, id: movie.id }
  api.fetchStates = jest.fn().mockResolvedValueOnce({ ...states })

  renderComponent(getComponent())

  expect(screen.getByTestId('button-on')).toBeVisible()
})
