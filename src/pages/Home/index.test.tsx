import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Home } from '.'

jest.mock('src/hooks/apis/useMoviesAPI')
jest.mock('src/hooks/apis/useTVShowsAPI')

const { renderComponent, screen } = useTesting()

test('Should render Home properly', async () => {
  renderComponent(<Home />)

  expect(await screen.findByTestId('banner')).toBeVisible()
  expect(await screen.findByTestId('carousel-in-theaters')).toBeVisible()
  expect(await screen.findByTestId('carousel-most-popular')).toBeVisible()
  expect(await screen.findByTestId('carousel-best-comedies')).toBeVisible()
  expect(await screen.findByTestId('carousel-sci-fi-fantasy')).toBeVisible()
  expect(await screen.findByTestId('carousel-family')).toBeVisible()
  expect(
    await screen.findByTestId('carousel-top-rated-documentaries')
  ).toBeVisible()
  expect(await screen.findByTestId('carousel-tv-airing-today')).toBeVisible()
  expect(await screen.findByTestId('carousel-tv-on-the-air')).toBeVisible()
  expect(await screen.findByTestId('carousel-tv-popular')).toBeVisible()
  expect(await screen.findByTestId('carousel-tv-top-rated')).toBeVisible()
})
