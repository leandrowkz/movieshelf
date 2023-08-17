import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PasswordUpdate } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<PasswordUpdate />)

  expect(screen.getByText('Reset your password')).toBeVisible()
  expect(screen.getByTestId('input-email')).toBeVisible()
  expect(screen.getByTestId('btn-submit')).toBeVisible()
})
