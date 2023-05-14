import React from 'react'
import { renderComponent } from '../../helpers/testing'
import { Movies } from '.'

jest.mock('src/services/MoviesAPI')

describe('Movies', () => {
  test('Should render MovieDetails properly', async () => {
    const { findByTestId } = renderComponent(<Movies />)

    const carouselAction = await findByTestId('carousel-action')
    const carouselAdventure = await findByTestId('carousel-adventure')
    const carouselAnimation = await findByTestId('carousel-animation')
    const carouselComedy = await findByTestId('carousel-comedy')
    const carouselCrime = await findByTestId('carousel-crime')
    const carouselDocumentary = await findByTestId('carousel-documentary')
    const carouselDrama = await findByTestId('carousel-drama')
    const carouselFamily = await findByTestId('carousel-family')
    const carouselFantasy = await findByTestId('carousel-fantasy')
    const carouselHistory = await findByTestId('carousel-history')
    const carouselHorror = await findByTestId('carousel-horror')
    const carouselMusic = await findByTestId('carousel-music')
    const carouselMistery = await findByTestId('carousel-mistery')
    const carouselRomance = await findByTestId('carousel-romance')
    const carouselScienceFiction = await findByTestId(
      'carousel-science-fiction'
    )
    const carouselThriller = await findByTestId('carousel-thriller')
    const carouselWar = await findByTestId('carousel-war')
    const carouselWestern = await findByTestId('carousel-western')

    expect(carouselAction).toBeInTheDocument()
    expect(carouselAdventure).toBeInTheDocument()
    expect(carouselAnimation).toBeInTheDocument()
    expect(carouselComedy).toBeInTheDocument()
    expect(carouselCrime).toBeInTheDocument()
    expect(carouselDocumentary).toBeInTheDocument()
    expect(carouselDrama).toBeInTheDocument()
    expect(carouselFamily).toBeInTheDocument()
    expect(carouselFantasy).toBeInTheDocument()
    expect(carouselHistory).toBeInTheDocument()
    expect(carouselHorror).toBeInTheDocument()
    expect(carouselMusic).toBeInTheDocument()
    expect(carouselMistery).toBeInTheDocument()
    expect(carouselRomance).toBeInTheDocument()
    expect(carouselScienceFiction).toBeInTheDocument()
    expect(carouselThriller).toBeInTheDocument()
    expect(carouselWar).toBeInTheDocument()
    expect(carouselWestern).toBeInTheDocument()
  })
})
