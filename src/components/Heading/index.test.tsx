import React from 'react'
import { render } from '@testing-library/react'
import { Heading } from '.'

describe('Heading', () => {
  test('Should render heading and content properly', async () => {
    const { getByTestId } = render(
      <Heading data-testid="heading" title="Hello" level={1} />
    )

    const heading = getByTestId('heading')

    expect(heading.innerHTML).toEqual('Hello')
  })

  test('Should set classes properly', async () => {
    const { getByTestId } = render(
      <Heading
        className="custom"
        data-testid="heading"
        title="Hello"
        level={2}
      />
    )

    const heading = getByTestId('heading')

    expect(heading.classList.toString()).toEqual('custom heading heading-2')
  })
})
