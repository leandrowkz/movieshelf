import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowInputSearch } from '.'

jest.mock('src/hooks/apis/useMoviesAPI')
jest.mock('src/hooks/apis/useTVShowsAPI')

const { renderComponent, screen, user } = useTesting()

test('Should render properly', async () => {
  renderComponent(<ShowInputSearch />)

  expect(screen.queryByTestId('search-input-container')).not.toBeInTheDocument()
  expect(screen.getByTestId('search-button')).toBeVisible()
})

test('Should show input when clicking on search button', async () => {
  renderComponent(<ShowInputSearch />)

  await user.click(screen.getByTestId('search-button'))

  expect(screen.getByTestId('search-input-container')).toBeVisible()
  expect(screen.queryByTestId('search-button')).not.toBeInTheDocument()
})

test('Should perform search properly', async () => {
  renderComponent(<ShowInputSearch />)

  await user.click(screen.getByTestId('search-button'))
  await user.type(screen.getByTestId('search-input'), 'Barbie')

  expect((await screen.findAllByTestId('search-item')).length).toEqual(18)
})
