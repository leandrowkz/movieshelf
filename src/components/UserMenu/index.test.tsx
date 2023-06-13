import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { UserMenu } from '.'

const { renderComponent, screen } = useTesting()

test('Should render header properly', async () => {
  renderComponent(<UserMenu />)

  expect(screen.getByTestId('logo')).toBeVisible()
  expect(screen.getByTestId('menu')).toBeVisible()
  expect(screen.getByTestId('sponsor')).toBeVisible()
})

test('Should render menu links properly', async () => {
  renderComponent(<UserMenu />)

  const menuMovies = screen.getByTestId('menu-movies') as HTMLLinkElement
  const menuSponsorship = screen.getByTestId('sponsor') as HTMLLinkElement

  expect(menuMovies.href).toEqual(`${window.location.href}movies`)
  expect(menuMovies.target).toEqual('')
  expect(menuSponsorship.href).toEqual('https://github.com/sponsors/leandrowkz')
  expect(menuSponsorship.target).toEqual('_blank')
})
