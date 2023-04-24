import React from 'react'
import { render } from '@testing-library/react'
import { Motion } from '.'

describe('Motion', () => {
  test('Should render Motion properly', async () => {
    const { getByText, getByTestId } = render(
      <Motion data-testid="motion" tag="span">
        CONTENT
      </Motion>
    )

    const motion = getByTestId('motion') as HTMLSpanElement
    const content = getByText('CONTENT')

    expect(motion).toBeInstanceOf(HTMLSpanElement)
    expect(content).toBeInTheDocument()
  })
})
