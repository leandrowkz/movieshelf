import React from 'react'
import { useHelpers } from 'src/hooks/useHelpers'
import { useTesting } from 'src/hooks/useTesting'
import { ShowPoster } from '.'
import { Movie } from '@leandrowkz/tmdb'

const { renderComponent, getMockMovies, screen } = useTesting()
const { getShowImageUrl } = useHelpers()

function getMovie() {
  const movie = getMockMovies(1)[0] as Movie

  return { ...movie, genre_ids: [] }
}

test('Should render ShowPoster properly', async () => {
  const movie = getMovie()
  renderComponent(<ShowPoster show={movie} />)

  const poster = screen.getByTestId('show-poster-image') as HTMLImageElement
  const src = getShowImageUrl(movie.poster_path || '')

  expect(poster).toBeInTheDocument()
  expect(poster.src).toEqual(src)
  expect(poster.title).toEqual(movie.title)
})
