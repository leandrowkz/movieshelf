import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PasswordReset } from '.'

const { renderComponent, screen, user } = useTesting()

function getControls() {
  const input = screen.getByTestId('input-email') as HTMLInputElement
  const submit = screen.getByTestId('btn-submit') as HTMLButtonElement

  return { input, submit }
}

test('should render content properly', () => {
  renderComponent(<PasswordReset />)

  const { input, submit } = getControls()

  expect(screen.getByText('Reset your password')).toBeVisible()
  expect(
    screen.getByText(
      'We will send you a magic link which you will be able to login and reset your account password.'
    )
  ).toBeVisible()
  expect(input).toBeVisible()
  expect(submit).toBeVisible()
  expect(screen.getByTestId('btn-back')).toBeVisible()
})

test('must validate email properly', async () => {
  renderComponent(<PasswordReset />)

  const { input, submit } = getControls()

  await user.type(input, 'INVALID_EMAIL')
  await user.click(submit)

  expect(screen.getByText(/Invalid email/i)).toBeVisible()
})

test('password reset workflow works properly', async () => {
  renderComponent(<PasswordReset />)

  const { input, submit } = getControls()

  await user.type(input, 'me@movieshelf.app')
  await user.click(submit)

  expect(screen.getByText('We are almost there.')).toBeVisible()
  expect(
    screen.getByText(
      'You must receive an email with a magic login link if an account exists for this email address. With this you will be able to login again and reset your password.'
    )
  ).toBeVisible()
  expect(screen.getByRole('button', { name: /go home/i })).toBeVisible()
})
