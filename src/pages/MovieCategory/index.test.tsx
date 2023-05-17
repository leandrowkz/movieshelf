import React, { HTMLAttributes } from 'react'
import { render, waitFor } from '@testing-library/react'
import { MovieCategory } from '.'
import { MovieDetailsContextProvider } from '../../store/MovieDetailsContext'
import { MovieListsContextProvider } from '../../store/MovieListsContext'

jest.mock('react-router-dom', () => ({
  useParams: () => ({ movieId: 4040 }),
  ScrollRestoration: () => <></>,
  Link: () => <></>,
}))
jest.mock('src/services/MoviesAPI')

describe('MovieDetails', () => {
  test('Should render MovieDetails properly', async () => {
    const wrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => (
      <MovieListsContextProvider>
        <MovieDetailsContextProvider>{children}</MovieDetailsContextProvider>
      </MovieListsContextProvider>
    )
    const { queryByTestId } = render(<MovieCategory />, { wrapper })

    await waitFor(async () => {
      const title = queryByTestId('movie-title')
      const overview = queryByTestId('movie-overview')
      const year = queryByTestId('movie-year')
      const genres = queryByTestId('movie-genres')
      const countries = queryByTestId('movie-countries')
      const poster = queryByTestId('movie-poster')
      const cast = queryByTestId('movie-cast')
      const carouselSimilar = queryByTestId('carousel-similar')
      const carouselRecommended = queryByTestId('carousel-recommended')
      const carouselTrending = queryByTestId('carousel-trending')

      expect(title).toBeInTheDocument()
      expect(overview).toBeInTheDocument()
      expect(year).toBeInTheDocument()
      expect(genres).toBeInTheDocument()
      expect(countries).toBeInTheDocument()
      expect(poster).toBeInTheDocument()
      expect(cast).toBeInTheDocument()
      expect(carouselSimilar).toBeInTheDocument()
      expect(carouselRecommended).toBeInTheDocument()
      expect(carouselTrending).toBeInTheDocument()
    })
  })
})
