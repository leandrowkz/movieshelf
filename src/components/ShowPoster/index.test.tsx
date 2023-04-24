import React from 'react'
import { render } from '@testing-library/react'
import { ShowPoster } from '.'
import { mockMovieDetails } from 'src/__mocks__/mockMovieDetails'
import { MovieHelper } from 'src/services/MovieHelper'

const makeSUT = () => {
  return { movie: { ...mockMovieDetails, genre_ids: [] } }
}

describe('ShowPoster', () => {
  test('Should render ShowPoster properly', async () => {
    const { movie } = makeSUT()
    const { getByTestId } = render(<ShowPoster show={movie} />)

    const poster = getByTestId('show-poster') as HTMLImageElement
    const src = MovieHelper.getImageUrl(movie.poster_path)

    expect(poster).toBeInTheDocument()
    expect(poster.src).toEqual(src)
    expect(poster.title).toEqual(movie.title)
  })
})
