import React from 'react'
import { useTesting } from '../../hooks/useTesting'
import { ShowCountries } from '.'
import type { Movie } from '@leandrowkz/tmdb'

const { renderComponent, getMockMovies, screen } = useTesting()

test('Should render ShowCountries properly', async () => {
  renderComponent(<ShowCountries show={getMockMovies(1)[0] as Movie} />)

  expect(screen.getByText('🇧🇷')).toBeVisible()
  expect(screen.getByText('🇯🇵')).toBeVisible()
})

test('Should render separator properly', async () => {
  renderComponent(
    <ShowCountries show={getMockMovies(1)[0] as Movie} separator="#€&" />
  )

  expect(screen.getByText('#€&')).toBeVisible()
})
