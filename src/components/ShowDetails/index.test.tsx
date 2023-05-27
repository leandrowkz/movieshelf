import React from 'react'
import { screen } from '@testing-library/react'
import { ShowDetails } from '.'
import { renderComponent } from 'src/helpers/testing'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { mockMovieCredits } from 'src/__mocks__/mockMovieCredits'
import { mockVideo } from 'src/__mocks__/mockVideo'

describe('MovieDetails', () => {
  test('Should render ShowDetails properly', async () => {
    const { cast } = mockMovieCredits
    const videos = [mockVideo]

    renderComponent(
      <ShowDetails
        show={mockMovieDetails}
        cast={cast}
        videos={videos}
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
})
