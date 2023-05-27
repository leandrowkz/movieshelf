import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowDetails } from '.'
import { Movie } from '@leandrowkz/tmdb'

const { renderComponent, getMockMovies, getMockPeople, getMockVideos, screen } =
  useTesting()

test('Should render ShowDetails properly', async () => {
  renderComponent(
    <ShowDetails
      show={getMockMovies(1)[0] as Movie}
      cast={getMockPeople()}
      videos={getMockVideos()}
      isLoadingCast={false}
      isLoadingShow={false}
      isLoadingVideos={false}
    />
  )

  expect(screen.getByTestId('show-title')).toBeVisible()
  expect(screen.getByTestId('show-overview')).toBeVisible()
  expect(screen.getByTestId('show-year')).toBeVisible()
  expect(screen.getByTestId('show-genres')).toBeVisible()
  expect(screen.getByTestId('show-countries')).toBeVisible()
  expect(screen.getByTestId('show-poster')).toBeVisible()
  expect(screen.getByTestId('show-cast')).toBeVisible()
})
