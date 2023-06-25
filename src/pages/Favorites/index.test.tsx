import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Favorites } from '.'

jest.mock('src/hooks/apis/useFavoritesAPI')

const { renderComponent, screen } = useTesting()

test('Should render page properly', async () => {
  renderComponent(<Favorites />)

  expect(screen.getByTestId('heading')).toBeVisible()
  expect(await screen.findByTestId('list-movies')).toBeVisible()
  expect(await screen.findByTestId('list-tv-shows')).toBeVisible()
})
