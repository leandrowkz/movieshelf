import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { GoogleAuthButton } from '.'

const { renderComponent, screen } = useTesting()

test('should render properly', () => {
  renderComponent(<GoogleAuthButton />)

  expect(screen.getByText(/Sign in with google/i)).toBeVisible()
})
