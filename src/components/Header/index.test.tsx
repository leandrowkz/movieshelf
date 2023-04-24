import React from 'react'
import { render } from '@testing-library/react'
import { Header } from '.'
import { BrowserRouter } from 'react-router-dom'

describe('Header', () => {
  test('Should render header properly', async () => {
    const { getByTestId } = render(<Header />, { wrapper: BrowserRouter })

    const logo = getByTestId('logo')
    const menu = getByTestId('menu')
    const sponsor = getByTestId('sponsor')

    expect(logo).toBeInTheDocument()
    expect(menu).toBeInTheDocument()
    expect(sponsor).toBeInTheDocument()
  })

  test('Should render menu links properly', async () => {
    const { getByTestId } = render(<Header />, { wrapper: BrowserRouter })

    const menuMovies = getByTestId('menu-movies') as HTMLLinkElement
    const menuSponsorship = getByTestId('sponsor') as HTMLLinkElement

    expect(menuMovies.href).toEqual(`${window.location.href}`)
    expect(menuMovies.target).toEqual('')
    expect(menuSponsorship.href).toEqual(
      'https://github.com/sponsors/leandrowkz'
    )
    expect(menuSponsorship.target).toEqual('_blank')
  })
})
