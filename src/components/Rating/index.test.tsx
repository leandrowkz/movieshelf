import React from 'react'
import { render } from '@testing-library/react'
import { Rating } from '.'

describe('Rating', () => {
  test('Should render Rating properly', async () => {
    const { getByText } = render(<Rating score={7.83} />)

    const rating = getByText('★ 7.8')

    expect(rating).toBeInTheDocument()
  })

  test('Should round Rating properly', async () => {
    const { getByText } = render(<Rating score={7.89} />)

    const rating = getByText('★ 7.9')

    expect(rating).toBeInTheDocument()
  })

  test('Should fallback Rating properly', async () => {
    const { getByText } = render(<Rating score={'HAHA' as unknown as number} />)

    const rating = getByText('★ 0.0')

    expect(rating).toBeInTheDocument()
  })
})
