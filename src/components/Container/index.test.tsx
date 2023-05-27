import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Container } from '.'

const { renderComponent, screen } = useTesting()

test('Should render container and content properly', async () => {
  renderComponent(<Container data-testid="container">Hello</Container>)

  expect(screen.getByText('Hello')).toBeVisible()
})

test('Should set classes properly', async () => {
  renderComponent(<Container className="custom" data-testid="container" />)

  const container = screen.getByTestId('container')

  expect(container.classList.toString()).toEqual('container custom')
})
