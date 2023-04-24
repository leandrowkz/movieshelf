import React from 'react'
import { render } from '@testing-library/react'
import { Image } from '.'

describe('Image', () => {
  test('Should render image properly', async () => {
    const { getByTestId } = render(
      <Image data-testid="img" alt="Hello" src="something.gif" />
    )

    const img = getByTestId('img') as HTMLImageElement

    expect(img.src).toEqual(`${window.location.href}something.gif`)
    expect(img.alt).toEqual('Hello')
  })

  test('Should add default title properly', async () => {
    const { getByTestId } = render(<Image data-testid="img" />)

    const img = getByTestId('img') as HTMLImageElement

    expect(img.alt).toEqual('Image')
  })
})
