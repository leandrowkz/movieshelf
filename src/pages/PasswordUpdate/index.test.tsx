/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PasswordUpdate } from '.'

const { renderComponent, screen, user } = useTesting()

const mockToast = jest.fn()
const mockUseNavigate = jest.fn()

jest.mock('react-toastify', () => ({
  toast: (args: any[]) => mockToast(args),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

function getControls() {
  const password = screen.getByTestId('input-password') as HTMLInputElement
  const confirmPassword = screen.getByTestId(
    'input-confirm-password'
  ) as HTMLInputElement
  const submit = screen.getByTestId('btn-submit') as HTMLButtonElement
  const goHome = screen.getByTestId('btn-go-home') as HTMLButtonElement

  return { password, confirmPassword, submit, goHome }
}

test('should render content properly', () => {
  renderComponent(<PasswordUpdate />)

  const { password, confirmPassword, submit, goHome } = getControls()

  expect(screen.getByText('New password')).toBeVisible()
  expect(
    screen.getByText(
      'You got here through a magic link, which means you are already logged in. We still recommend you to reset your password through the form below.'
    )
  ).toBeVisible()
  expect(password).toBeVisible()
  expect(confirmPassword).toBeVisible()
  expect(submit).toBeVisible()
  expect(goHome).toBeVisible()
})

test('must validate form properly', async () => {
  renderComponent(<PasswordUpdate />)

  const { password, confirmPassword, submit } = getControls()

  await user.type(password, '123')
  await user.type(confirmPassword, '123456')
  await user.click(submit)

  expect(
    screen.getByText(/String must contain at least 6 character\(s\)/i)
  ).toBeVisible()
  expect(screen.getByText(/Passwords don't match/i)).toBeVisible()
})

test('update password workflow works properly', async () => {
  renderComponent(<PasswordUpdate />)

  const { password, confirmPassword, submit } = getControls()

  await user.type(password, '123456')
  await user.type(confirmPassword, '123456')
  await user.click(submit)

  expect(mockUseNavigate).toHaveBeenCalledWith('/')
  expect(mockToast).toHaveBeenCalledWith('Your password has been updated.')
})
