import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Image } from '.'

const { renderComponent, screen } = useTesting()

test('Should render image properly', async () => {
  renderComponent(<Image data-testid="img" alt="Hello" src="something.gif" />)

  const img = screen.getByTestId('img') as HTMLImageElement

  expect(img.src).toEqual(`${window.location.href}something.gif`)
  expect(img.alt).toEqual('Hello')
})

test('Should add default title properly', async () => {
  renderComponent(<Image data-testid="img" />)

  const img = screen.getByTestId('img') as HTMLImageElement

  expect(img.alt).toEqual('Image')
})
