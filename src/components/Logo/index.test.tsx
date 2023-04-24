import React from 'react'
import { render } from '@testing-library/react'
import { Logo } from '.'
import { BrowserRouter } from 'react-router-dom'

describe('Logo', () => {
  test('Should render Logo properly', async () => {
    const { getByText, getByTestId } = render(<Logo data-testid="logo" />, {
      wrapper: BrowserRouter,
    })

    const logo = getByTestId('logo') as HTMLLinkElement
    const title = getByText('🍿 movieshelf')

    expect(title).toBeInTheDocument()
    expect(logo.href).toEqual(`${window.location.href}`)
  })

  test('Should render Logo iconOnly properly', async () => {
    const { getByText } = render(<Logo onlyIcon />, {
      wrapper: BrowserRouter,
    })

    const title = getByText('🍿')

    expect(title).toBeInTheDocument()
  })
})
