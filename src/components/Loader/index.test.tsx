import React from 'react'
import { render } from '@testing-library/react'
import { Loader, Circle, Rectangle, Paragraph } from '.'

describe('Loader', () => {
  test('Should render loader and content properly', async () => {
    const { getByTestId } = render(
      <Loader data-testid="loader">CONTENT</Loader>
    )

    const loader = getByTestId('loader')

    expect(loader.innerHTML).toEqual('CONTENT')
  })

  test('Should render inner components properly', async () => {
    const { getByTestId } = render(
      <Loader data-testid="loader">
        <Circle width={40} data-testid="circle" />
        <Rectangle width={200} height={300} data-testid="rectangle" />
        <Paragraph lines={10} data-testid="paragraph" />
      </Loader>
    )

    const circle = getByTestId('circle')
    const rectangle = getByTestId('rectangle')
    const paragraph = getByTestId('paragraph')

    expect(circle).toBeInTheDocument()
    expect(circle.style.width).toBe('40px')
    expect(rectangle).toBeInTheDocument()
    expect(rectangle.style.width).toBe('200px')
    expect(rectangle.style.height).toBe('300px')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph.querySelectorAll('div').length).toEqual(10)
  })
})
