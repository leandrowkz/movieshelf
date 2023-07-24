import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowInputSearch } from '.'

const { renderComponent, screen } = useTesting()

test('Should render properly', async () => {
  renderComponent(<ShowInputSearch />)

  expect(screen.queryByTestId('sign-up')).not.toBeInTheDocument()
  expect(screen.getByTestId('user-menu')).toBeVisible()
  expect(screen.getByTestId('user-avatar')).toBeVisible()
})
