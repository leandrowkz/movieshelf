import React from 'react'
import { render } from '@testing-library/react'
import { Footer } from '.'
import { BrowserRouter } from 'react-router-dom'

describe('Footer', () => {
  test('Should render footer and content sections properly', async () => {
    const { getByTestId } = render(<Footer />, { wrapper: BrowserRouter })

    const logo = getByTestId('logo')
    const menu = getByTestId('menu')
    const bottom = getByTestId('bottom')
    const disclaimer = getByTestId('disclaimer')

    expect(logo).toBeInTheDocument()
    expect(menu).toBeInTheDocument()
    expect(bottom).toBeInTheDocument()
    expect(disclaimer).toBeInTheDocument()
  })

  test('Should render menu links properly', async () => {
    const { getByTestId } = render(<Footer />, { wrapper: BrowserRouter })

    const menuHome = getByTestId('menu-home') as HTMLLinkElement
    const menuGithub = getByTestId('menu-github') as HTMLLinkElement
    const menuTmdb = getByTestId('menu-tmdb') as HTMLLinkElement
    const menuSponsorship = getByTestId('menu-sponsorship') as HTMLLinkElement

    expect(menuHome.href).toEqual(`${window.location.href}`)
    expect(menuGithub.href).toEqual('https://github.com/leandrowkz/movieshelf')
    expect(menuGithub.target).toEqual('_blank')
    expect(menuTmdb.href).toEqual('https://www.themoviedb.org/')
    expect(menuTmdb.target).toEqual('_blank')
    expect(menuSponsorship.href).toEqual(
      'https://github.com/sponsors/leandrowkz'
    )
    expect(menuSponsorship.target).toEqual('_blank')
  })

  test('Should render bottom section properly', async () => {
    const { getByText } = render(<Footer />, {
      wrapper: BrowserRouter,
    })

    const madeWithLoveLink = getByText('@leandrowkz') as HTMLLinkElement

    expect(madeWithLoveLink.href).toEqual('https://github.com/leandrowkz')
    expect(madeWithLoveLink.target).toEqual('_blank')
  })

  test('Should render disclaimer section properly', async () => {
    const { getByTestId } = render(<Footer />, {
      wrapper: BrowserRouter,
    })

    const copyright = getByTestId('copyright') as HTMLDivElement
    const linkTmdb = getByTestId('link-tmdb') as HTMLLinkElement

    expect(copyright.innerHTML).toBe(`© ${new Date().getFullYear()} Movieshelf`)
    expect(linkTmdb.href).toEqual('https://www.themoviedb.org/')
    expect(linkTmdb.target).toEqual('_blank')
  })
})
