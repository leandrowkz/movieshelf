import React from 'react'
import { render } from '@testing-library/react'
import { Text } from '.'

describe('Text', () => {
  test('Should render Text properly', async () => {
    const { getByText } = render(<Text>CONTENT</Text>)

    const content = getByText('CONTENT')

    expect(content).toBeInTheDocument()
  })

  test('Should resolve tag properly', async () => {
    const { getByTestId } = render(
      <Text isParagraph data-testid="text">
        CONTENT
      </Text>
    )

    const text = getByTestId('text')

    expect(text).toBeInstanceOf(HTMLParagraphElement)
  })

  test('Should set classes properly', async () => {
    const { getByTestId } = render(
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

    const text = getByTestId('text')

    expect(text.classList.toString()).toEqual(
      'custom large center muted text bold paragraph'
    )
  })
})
