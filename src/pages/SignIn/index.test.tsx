import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { SignIn } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<SignIn />)

  expect(screen.getByText('🍿')).toBeVisible()
  expect(screen.getByText('Not found.')).toBeVisible()
  expect(
    screen.getByText(/The page you requested does not exist/i)
  ).toBeVisible()
  expect(screen.getByText(/Go home/i)).toBeVisible()
})
