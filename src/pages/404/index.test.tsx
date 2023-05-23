import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from 'src/helpers/testing'
import { NotFound } from '.'

test('should render content properly', () => {
  renderComponent(<NotFound />)

  expect(screen.getByText('🍿')).toBeVisible()
  expect(screen.getByText('Not found.')).toBeVisible()
  expect(
    screen.getByText(/The page you requested does not exist/i)
  ).toBeVisible()
  expect(screen.getByText(/Go home/i)).toBeVisible()
})
