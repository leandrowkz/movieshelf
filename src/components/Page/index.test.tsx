import React from 'react'
import { render } from '@testing-library/react'
import { Page } from '.'

jest.mock('react-router-dom')

describe('Page', () => {
  test('Should render Page properly', async () => {
    const { getByTestId } = render(<Page>CONTENT</Page>)

    const content = getByTestId('content')
    const header = getByTestId('header')
    const footer = getByTestId('footer')

    expect(content).toBeInTheDocument()
    expect(content.innerHTML).toEqual('CONTENT')
    expect(header).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })
})
