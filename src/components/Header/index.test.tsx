import React from 'react'
import { useTesting } from '../../hooks/useTesting'
import { Header } from '.'

const { renderComponent, screen } = useTesting()

test('Should render header properly', async () => {
  renderComponent(<Header />)

  expect(screen.getByTestId('logo')).toBeVisible()
  expect(screen.getByTestId('menu')).toBeVisible()
  expect(screen.getByTestId('search')).toBeVisible()
})

test('Should render menu links properly', async () => {
  renderComponent(<Header />)

  const menuMovies = screen.getByTestId('menu-movies') as HTMLLinkElement
  const menuTVShows = screen.getByTestId('menu-tv-shows') as HTMLLinkElement

  expect(menuMovies.href).toEqual(`${window.location.href}movies`)
  expect(menuTVShows.href).toEqual(`${window.location.href}tv`)
})
