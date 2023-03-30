import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { Button } from '.'

describe('Button', () => {
  test('Should render button properly', async () => {
    const { queryByText } = render(<Button>Hello</Button>)

    const button = queryByText('Hello')

    expect(button).toBeInTheDocument()
  })

  test('Should set classes properly', async () => {
    const { getByTestId } = render(
      <Button className="custom" size="large" pill data-testid="button">
        Hello
      </Button>
    )

    const button = getByTestId('button')

    expect(button.classList.toString()).toEqual('button custom large pill')
  })

  test('Should fire event properly', async () => {
    const spy = jest.fn()
    const user = userEvent.setup()
    const { getByTestId } = render(
      <Button data-testid="button" onClick={spy} />
    )

    const button = getByTestId('button')

    await user.click(button)

    expect(spy).toHaveBeenCalled()
  })
})
