import React from 'react'
import { useTesting } from '../../hooks/useTesting'
import { Logo } from '.'

const { renderComponent, screen } = useTesting()

test('Should render Logo properly', async () => {
  renderComponent(<Logo data-testid="logo" />)

  const logo = screen.getByTestId('logo') as HTMLLinkElement
  const title = screen.getByText('🍿 movieshelf')

  expect(title).toBeInTheDocument()
  expect(logo.href).toEqual(`${window.location.href}`)
})

test('Should render Logo iconOnly properly', async () => {
  renderComponent(<Logo onlyIcon />)

  expect(screen.getByText('🍿')).toBeVisible()
})
