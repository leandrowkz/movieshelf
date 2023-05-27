import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Footer } from '.'

const { renderComponent, screen } = useTesting()

test('Should render footer and content sections properly', async () => {
  renderComponent(<Footer />)

  expect(screen.getByTestId('newsletter-section')).toBeVisible()
  expect(screen.getByTestId('logo-section')).toBeVisible()
  expect(screen.getByTestId('menu-section')).toBeVisible()
  expect(screen.getByTestId('disclaimer-section')).toBeVisible()
})
