import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Text } from '.'

const { renderComponent, screen } = useTesting()

test('Should render Text properly', async () => {
  renderComponent(<Text>CONTENT</Text>)

  const content = screen.getByText('CONTENT')

  expect(content).toBeInTheDocument()
})

test('Should resolve tag properly', async () => {
  renderComponent(
    <Text isParagraph data-testid="text">
      CONTENT
    </Text>
  )

  const text = screen.getByTestId('text')

  expect(text).toBeInstanceOf(HTMLParagraphElement)
})

test('Should set classes properly', async () => {
  renderComponent(
    <Text
      data-testid="text"
      className="custom"
      size="large"
      alignment="center"
      isMuted
      isParagraph
      isBold
    >
      CONTENT
    </Text>
  )

  const text = screen.getByTestId('text')

  expect(text.classList.toString()).toEqual(
    'custom large center muted text bold paragraph'
  )
})
