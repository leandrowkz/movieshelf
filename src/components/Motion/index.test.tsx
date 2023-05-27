import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Motion } from '.'

const { renderComponent, screen } = useTesting()

test('Should render Motion properly', async () => {
  renderComponent(
    <Motion data-testid="motion" tag="span">
      CONTENT
    </Motion>
  )

  const motion = screen.getByTestId('motion') as HTMLSpanElement
  const content = screen.getByText('CONTENT')

  expect(motion).toBeInstanceOf(HTMLSpanElement)
  expect(content).toBeInTheDocument()
})
