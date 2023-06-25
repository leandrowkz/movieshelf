import React from 'react'
import { Movie } from '@leandrowkz/tmdb'
import { useMoviesAPI } from 'src/hooks/apis/useMoviesAPI'
import { useTesting } from 'src/hooks/useTesting'
import { FavoriteButton } from '.'
import { mockMovieAccountStates } from 'src/__mocks__/mockMovieAccountStates'

jest.mock('src/hooks/apis/useMoviesAPI')

const api = useMoviesAPI()
const { renderComponent, getMockMovies, getMockMovieAccountStates, screen } =
  useTesting()

function getComponent(favorite = true) {
  const show = { ...(getMockMovies(1)[0] as Movie) }
  const accountStates = { ...getMockMovieAccountStates(1)[0], favorite }

  return (
    <FavoriteButton type="movie" show={show} accountStates={accountStates} />
  )
}

test('Should render FavoriteButton properly', async () => {
  renderComponent(getComponent(false))

  expect(screen.getByText('Favorite')).toBeVisible()
})

test('Should render favorited properly', async () => {
  const movie = getMockMovies(1)[0]
  const accountStates = { ...mockMovieAccountStates, id: movie.id }
  api.fetchAccountStates = jest.fn().mockResolvedValueOnce({ ...accountStates })

  renderComponent(getComponent())

  expect(screen.getByText('Favorited')).toBeVisible()
})
