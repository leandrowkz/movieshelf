import React from 'react'
import { useTesting } from '../../hooks/useTesting'
import { NotFound } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<NotFound />)

  expect(screen.getByText('🍿')).toBeVisible()
  expect(screen.getByText('Not found.')).toBeVisible()
  expect(
    screen.getByText(/The page you requested does not exist/i)
  ).toBeVisible()
  expect(screen.getByText(/Go home/i)).toBeVisible()
})
