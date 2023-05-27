import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Button } from '.'

const { renderComponent, screen, user } = useTesting()

test('Should render button properly', async () => {
  renderComponent(<Button>Hello</Button>)

  const button = screen.queryByText('Hello')

  expect(button).toBeInTheDocument()
})

test('Should set classes properly', async () => {
  const { getByTestId } = renderComponent(
    <Button
      className="custom"
      size="large"
      variant="secondary"
      data-testid="button"
      pill
    >
      Hello
    </Button>
  )

  const button = getByTestId('button')

  expect(button.classList.toString()).toEqual(
    'button custom large secondary pill'
  )
})

test('Should fire event properly', async () => {
  const spy = jest.fn()
  renderComponent(<Button data-testid="button" onClick={spy} />)

  const button = screen.getByTestId('button')

  await user.click(button)

  expect(spy).toHaveBeenCalled()
})
