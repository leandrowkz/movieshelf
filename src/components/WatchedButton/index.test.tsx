import React from 'react'
import { Movie } from '@leandrowkz/tmdb'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { useTesting } from 'src/hooks/useTesting'
import { WatchedButton } from '.'
import { mockShowStates } from 'src/__mocks__/mockShowStates'

jest.mock('src/hooks/apis/useMoviesAPI')

const api = useMoviesAPI()
const { renderComponent, getMockMovies, getMockShowStates, screen } =
  useTesting()

function getComponent(favorite = true) {
  const show = { ...(getMockMovies(1)[0] as Movie) }
  const states = { ...getMockShowStates(1)[0], favorite }

  return <WatchedButton type="movie" show={show} states={states} />
}

test('Should render WatchedButton properly', async () => {
  renderComponent(getComponent(false))

  expect(screen.getByText('Add to watched')).toBeVisible()
})

test('Should render watched properly', async () => {
  const movie = getMockMovies(1)[0]
  const states = { ...mockShowStates, id: movie.id }
  api.fetchStates = jest.fn().mockResolvedValueOnce({ ...states })

  renderComponent(getComponent())

  expect(screen.getByText('Watched')).toBeVisible()
})
