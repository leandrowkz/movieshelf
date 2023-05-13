import React from 'react'
import { render } from '@testing-library/react'
import { ShowCountries } from '.'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'

const makeSUT = () => {
  return { movie: mockMovieDetails }
}

describe('ShowCountries', () => {
  test('Should render ShowCountries properly', async () => {
    const { movie } = makeSUT()
    const { getByText } = render(<ShowCountries show={movie} />)

    const brFlag = getByText('🇧🇷')
    const jpFlag = getByText('🇯🇵')

    expect(brFlag).toBeInTheDocument()
    expect(jpFlag).toBeInTheDocument()
  })

  test('Should render separator properly', async () => {
    const { movie } = makeSUT()
    const { getByText } = render(<ShowCountries show={movie} separator="#€&" />)

    const separator = getByText('#€&')

    expect(separator).toBeInTheDocument()
  })
})
