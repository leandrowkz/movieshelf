import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Home } from '.'
import { MovieListsContextProvider } from '../../store/MovieListsContext'

jest.mock('react-router-dom')
jest.mock('src/services/MoviesAPI')

describe('Home', () => {
  test('Should render Home properly', async () => {
    const { queryByTestId } = render(<Home />, {
      wrapper: MovieListsContextProvider,
    })

    await waitFor(async () => {
      const banner = queryByTestId('banner')
      const carouselInTheathers = queryByTestId('carousel-in-theaters')
      const carouselMostPopular = queryByTestId('carousel-most-popular')
      const carouselBestComedies = queryByTestId('carousel-best-comedies')
      const carouselSciFiFantasy = queryByTestId('carousel-sci-fi-fantasy')
      const carouselFamily = queryByTestId('carousel-family')
      const carouselTopRatedDocumentaries = queryByTestId(
        'carousel-top-rated-documentaries'
      )
      expect(banner).toBeInTheDocument()
      expect(carouselInTheathers).toBeInTheDocument()
      expect(carouselMostPopular).toBeInTheDocument()
      expect(carouselBestComedies).toBeInTheDocument()
      expect(carouselSciFiFantasy).toBeInTheDocument()
      expect(carouselFamily).toBeInTheDocument()
      expect(carouselTopRatedDocumentaries).toBeInTheDocument()
    })
  })
})
