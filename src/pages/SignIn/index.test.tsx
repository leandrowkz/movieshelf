import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { SignIn } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<SignIn />)

  expect(screen.getByText('🍿')).toBeVisible()
  expect(screen.getByText('Login to movieshelf')).toBeVisible()
  expect(screen.getByTestId('input-email')).toBeVisible()
  expect(screen.getByTestId('input-password')).toBeVisible()
  expect(screen.getByTestId('btn-submit')).toBeVisible()
  expect(screen.getByTestId('btn-google')).toBeVisible()
  expect(
    screen.getByText(
      /Sign in to movieshelf to continue saving your favorite movies and TV shows./i
    )
  ).toBeVisible()
  expect(screen.getByText(/Do not have an account yet\?/i)).toBeVisible()
  expect(screen.getByText(/Sign up now/i)).toBeVisible()
  expect(screen.getByText(/Forgot your password\?/i)).toBeVisible()
})

test('should point links to right place', () => {
  renderComponent(<SignIn />)

  const signup = screen.getByText(/Sign up now/i) as HTMLLinkElement
  const forgotPass = screen.getByText(
    /Forgot your password\?/i
  ) as HTMLLinkElement

  expect(signup.href).toContain('/sign-up')
  expect(forgotPass.href).toContain('/password/reset')
})
