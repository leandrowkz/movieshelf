import React from 'react'
import type { Movie } from '@leandrowkz/tmdb'
import { useTesting } from 'src/hooks/useTesting'
import { ShowGenres } from '.'

const { renderComponent, getMockMovies, screen } = useTesting()

function getMovie() {
  const movie = getMockMovies(1)[0] as Movie

  return { ...movie, genre_ids: [] }
}

test('Should render ShowGenres properly', async () => {
  renderComponent(<ShowGenres show={getMovie()} />)

  expect(screen.getByText('COMEDY')).toBeVisible()
  expect(screen.getByText('ACTION')).toBeVisible()
  expect(screen.queryByText('ADVENTURE')).not.toBeInTheDocument()
})

test('Should render ShowGenres properly with limit', async () => {
  renderComponent(<ShowGenres show={getMovie()} limit={3} />)

  expect(screen.getByText('COMEDY')).toBeVisible()
  expect(screen.getByText('ACTION')).toBeVisible()
  expect(screen.getByText('ADVENTURE')).toBeVisible()
})

test('Should render separator properly', async () => {
  renderComponent(<ShowGenres show={getMovie()} limit={3} separator="#€&" />)

  expect(screen.getAllByText('#€&')).toBeTruthy()
})
