import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Input } from '.'

const { renderComponent, screen } = useTesting()

test('Should render Input properly', async () => {
  renderComponent(<Input placeholder="PLACEHOLDER INPUT" />)

  expect(screen.getByPlaceholderText('PLACEHOLDER INPUT')).toBeVisible()
})

test('Should set classes properly', async () => {
  renderComponent(
    <Input className="custom" inputSize="large" data-testid="test-input" />
  )

  const input = screen.getByTestId('test-input')

  expect(input.classList.toString()).toEqual('input custom large')
})
