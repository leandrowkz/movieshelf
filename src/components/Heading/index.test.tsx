import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Heading } from '.'

const { renderComponent, screen } = useTesting()

test('Should render heading and content properly', async () => {
  renderComponent(<Heading data-testid="heading" title="Hello" level={1} />)

  expect(screen.getByText('Hello')).toBeVisible()
})

test('Should set classes properly', async () => {
  renderComponent(
    <Heading className="custom" data-testid="heading" title="Hello" level={2} />
  )

  const heading = screen.getByTestId('heading')

  expect(heading.classList.toString()).toEqual('custom heading heading-2')
})
