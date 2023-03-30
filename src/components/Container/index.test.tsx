import React from 'react'
import { render } from '@testing-library/react'
import { Container } from '.'

describe('Container', () => {
  test('Should render container and content properly', async () => {
    const { getByTestId } = render(
      <Container data-testid="container">Hello</Container>
    )

    const container = getByTestId('container')

    expect(container.innerHTML).toEqual('Hello')
  })

  test('Should set classes properly', async () => {
    const { getByTestId } = render(
      <Container className="custom" data-testid="container" />
    )

    const container = getByTestId('container')

    expect(container.classList.toString()).toEqual('container custom')
  })
})
