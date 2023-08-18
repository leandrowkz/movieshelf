import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { SignUp } from '.'

const { renderComponent, screen, user } = useTesting()

function getControls() {
  const email = screen.getByTestId('input-email') as HTMLInputElement
  const name = screen.getByTestId('input-name') as HTMLInputElement
  const password = screen.getByTestId('input-password') as HTMLInputElement
  const passwordConfirm = screen.getByTestId(
    'input-password-confirm'
  ) as HTMLInputElement
  const submit = screen.getByTestId('btn-submit') as HTMLButtonElement
  const google = screen.getByTestId('btn-google') as HTMLButtonElement

  return {
    email,
    name,
    password,
    passwordConfirm,
    submit,
    google,
  }
}

test('should render content properly', () => {
  renderComponent(<SignUp />)

  const { email, name, password, passwordConfirm, submit, google } =
    getControls()

  expect(screen.getByText('🎬')).toBeVisible()
  expect(screen.getByText('Create an account')).toBeVisible()
  expect(email).toBeVisible()
  expect(name).toBeVisible()
  expect(password).toBeVisible()
  expect(passwordConfirm).toBeVisible()
  expect(submit).toBeVisible()
  expect(google).toBeVisible()
  expect(screen.getByText(/Sign up to movieshelf to save your/i)).toBeVisible()
  expect(screen.getByText(/Already have an account\?/i)).toBeVisible()
  expect(screen.getByText(/Try Sign in/i)).toBeVisible()
})

test('should point links to right place', () => {
  renderComponent(<SignUp />)

  const signin = screen.getByText(/Try sign in/i) as HTMLLinkElement

  expect(signin.href).toContain('/sign-in')
})

test('must validate form properly', async () => {
  renderComponent(<SignUp />)

  const { email, password, passwordConfirm, submit } = getControls()

  await user.type(email, 'INVALID_EMAIL')
  await user.type(password, '123')
  await user.type(passwordConfirm, '123456')
  await user.click(submit)

  expect(
    screen.getByText(/String must contain at least 1 character\(s\)/i)
  ).toBeVisible() // name
  expect(screen.getByText(/Invalid email/i)).toBeVisible()
  expect(
    screen.getByText(/String must contain at least 6 character\(s\)/i)
  ).toBeVisible() // password
  expect(screen.getByText(/Passwords don't match/i)).toBeVisible()
})

test('signup workflow should work properly', async () => {
  renderComponent(<SignUp />)

  const { email, name, password, passwordConfirm, submit } = getControls()

  await user.type(name, 'Movieshelf Person')
  await user.type(email, 'me@movieshelf.app')
  await user.type(password, '123456')
  await user.type(passwordConfirm, '123456')
  await user.click(submit)

  expect(screen.getByText('We are almost there.')).toBeVisible()
  expect(
    screen.getByText(
      'You need to confirm your account through the link we sent you by email.'
    )
  ).toBeVisible()
  expect(screen.getByRole('button', { name: /go home/i })).toBeVisible()
})
