import React from 'react'
import { Movie } from '@leandrowkz/tmdb'
import { moviesAPI } from 'src/services/MoviesAPI'
import { useTesting } from 'src/hooks/useTesting'
import { FavoriteButton } from '.'
import { mockMovieAccountStates } from 'src/__mocks__/mockMovieAccountStates'

const { renderComponent, getMockMovies, getMockMovieAccountStates, screen } =
  useTesting()

jest.mock('src/services/MoviesAPI')

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
  moviesAPI.fetchAccountStates = jest
    .fn()
    .mockResolvedValueOnce({ ...accountStates })

  renderComponent(getComponent())

  expect(screen.getByText('Favorited')).toBeVisible()
})
