import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Page } from '.'

const { renderComponent, screen } = useTesting()

test('Should render Page properly', async () => {
  renderComponent(<Page>CONTENT</Page>)

  expect(screen.getByTestId('content')).toBeVisible()
  expect(screen.getByTestId('header')).toBeVisible()
  expect(screen.getByTestId('footer')).toBeVisible()
  expect(screen.getByText('CONTENT')).toBeVisible()
})
