import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Header } from '.'

const { renderComponent, screen } = useTesting()

jest.mock('src/hooks/useSupabase')

test('Should render header properly', async () => {
  renderComponent(<Header />)

  expect(screen.getByTestId('logo')).toBeVisible()
  expect(screen.getByTestId('menu')).toBeVisible()
})

test('Should render menu links properly', async () => {
  renderComponent(<Header />)

  const menuMovies = screen.getByTestId('menu-movies') as HTMLLinkElement
  const menuTVShows = screen.getByTestId('menu-tv-shows') as HTMLLinkElement
  const menuSponsorship = screen.getByTestId('menu-sponsor') as HTMLLinkElement
  const menuFavorites = screen.getByTestId('menu-favorites') as HTMLLinkElement
  const menuWatchlist = screen.getByTestId('menu-watchlist') as HTMLLinkElement
  const menuUser = screen.getByTestId('user-menu')

  expect(menuMovies.href).toEqual(`${window.location.href}movies`)
  expect(menuTVShows.href).toEqual(`${window.location.href}tv`)
  expect(menuFavorites.href).toEqual(`${window.location.href}favorites`)
  expect(menuWatchlist.href).toEqual(`${window.location.href}watchlist`)
  expect(menuSponsorship.href).toEqual('https://github.com/sponsors/leandrowkz')
  expect(menuSponsorship.target).toEqual('_blank')
  expect(menuUser).toBeVisible()
})
