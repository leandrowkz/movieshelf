import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { SignIn } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<SignIn />)

  expect(screen.getByText('➡️ Login to movieshelf')).toBeVisible()
  expect(screen.getByTestId('input-email')).toBeVisible()
  expect(screen.getByTestId('input-password')).toBeVisible()
  expect(screen.getByTestId('btn-submit')).toBeVisible()
  expect(screen.getByText(/Do not have an account yet?/i)).toBeVisible()
})
