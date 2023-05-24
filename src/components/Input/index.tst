import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { Input } from '.'

describe('Input', () => {
  test('Should render Input properly', async () => {
    const { queryByText } = render(<Input />)

    const Input = queryByText('Hello')

    expect(Input).toBeInTheDocument()
  })

  test('Should set classes properly', async () => {
    const { getByTestId } = render(
      <Input
        className="custom"
        size="large"
        variant="secondary"
        data-testid="Input"
        pill
      >
        Hello
      </Input>
    )

    const Input = getByTestId('Input')

    expect(Input.classList.toString()).toEqual(
      'Input custom large secondary pill'
    )
  })

  test('Should fire event properly', async () => {
    const spy = jest.fn()
    const user = userEvent.setup()
    const { getByTestId } = render(
      <Input data-testid="Input" onClick={spy} />
    )

    const Input = getByTestId('Input')

    await user.click(Input)

    expect(spy).toHaveBeenCalled()
  })
})
