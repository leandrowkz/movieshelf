import React from 'react'
import { render } from '@testing-library/react'
import { BulletSeparator } from '.'

describe('BulletSeparator', () => {
  test('Should render bullet separator properly', async () => {
    const { queryByText } = render(<BulletSeparator />)

    const separator = queryByText('•')

    expect(separator).toBeInTheDocument()
  })

  test('Should set classes properly', async () => {
    const { getByText } = render(<BulletSeparator className="custom" isMuted />)

    const separator = getByText('•')

    expect(separator.classList.toString()).toEqual(
      'separator custom text muted'
    )
  })
})
