import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from 'src/helpers/testing'
import { Page } from '.'

test('Should render Page properly', async () => {
  renderComponent(<Page>CONTENT</Page>)

  expect(screen.getByTestId('content')).toBeVisible()
  expect(screen.getByTestId('header')).toBeVisible()
  expect(screen.getByTestId('footer')).toBeVisible()
  expect(screen.getByText('CONTENT')).toBeVisible()
})
