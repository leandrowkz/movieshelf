import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Loader, Circle, Rectangle, Paragraph } from '.'

const { renderComponent, screen } = useTesting()

test('Should render loader and content properly', async () => {
  renderComponent(<Loader data-testid="loader">CONTENT</Loader>)

  expect(screen.getByText('CONTENT')).toBeVisible()
})

test('Should render inner components properly', async () => {
  renderComponent(
    <Loader data-testid="loader">
      <Circle width={40} data-testid="circle" />
      <Rectangle width={200} height={300} data-testid="rectangle" />
      <Paragraph lines={10} data-testid="paragraph" />
    </Loader>
  )

  const circle = screen.getByTestId('circle')
  const rectangle = screen.getByTestId('rectangle')
  const paragraph = screen.getByTestId('paragraph')

  expect(circle).toBeInTheDocument()
  expect(circle.style.width).toBe('40px')
  expect(rectangle).toBeInTheDocument()
  expect(rectangle.style.width).toBe('200px')
  expect(rectangle.style.height).toBe('300px')
  expect(paragraph).toBeInTheDocument()
  expect(paragraph.querySelectorAll('div').length).toEqual(10)
})
