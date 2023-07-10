import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Watched } from '.'

jest.mock('src/hooks/apis/useUserListsAPI')

const { renderComponent, screen, user } = useTesting()

test('Should render page properly', async () => {
  renderComponent(<Watched />)

  expect(screen.getByTestId('heading')).toBeVisible()
  expect(await screen.findByTestId('list-movies')).toBeVisible()
  expect(screen.queryByTestId('list-tv-shows')).not.toBeInTheDocument()
})

test('Should render properly after filtering', async () => {
  renderComponent(<Watched />)

  const button = screen.getByRole('button', { name: 'TV Shows' })

  await user.click(button)

  expect(screen.queryByTestId('list-movies')).not.toBeInTheDocument()
  expect(await screen.findByTestId('list-tv-shows')).toBeVisible()
})
