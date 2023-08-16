import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { SignUp } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<SignUp />)

  expect(screen.getByText('🍿 Create an account')).toBeVisible()
  expect(screen.getByTestId('input-email')).toBeVisible()
  expect(screen.getByTestId('input-name')).toBeVisible()
  expect(screen.getByTestId('input-password')).toBeVisible()
  expect(screen.getByTestId('input-password-confirm')).toBeVisible()
  expect(screen.getByTestId('btn-submit')).toBeVisible()
  expect(screen.getByTestId('btn-google')).toBeVisible()
  expect(screen.getByText(/Sign up to movieshelf to save your/i)).toBeVisible()
  expect(screen.getByText(/Already have an account\? Try/i)).toBeVisible()
})
