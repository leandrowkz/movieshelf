import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Watchlist } from '.'

jest.mock('src/hooks/apis/useUserListsAPI')

const { renderComponent, screen } = useTesting()

test('Should render page properly', async () => {
  renderComponent(<Watchlist />)

  expect(screen.getByTestId('heading')).toBeVisible()
  expect(await screen.findByTestId('list-movies')).toBeVisible()
  expect(await screen.findByTestId('list-tv-shows')).toBeVisible()
})
