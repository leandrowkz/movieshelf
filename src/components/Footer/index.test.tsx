import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from 'src/helpers/testing'
import { Footer } from '.'

test('Should render footer and content sections properly', async () => {
  renderComponent(<Footer />)

  expect(screen.getByTestId('newsletter-section')).toBeVisible()
  expect(screen.getByTestId('logo-section')).toBeVisible()
  expect(screen.getByTestId('menu-section')).toBeVisible()
  expect(screen.getByTestId('disclaimer-section')).toBeVisible()
})
