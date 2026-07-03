import React from 'react'
import { useTesting } from '../../hooks/useTesting'
import { Result } from '.'
import { Button } from '../Button'

const { renderComponent, screen } = useTesting()

test('should render base content properly', () => {
  renderComponent(
    <Result
      icon="🍿"
      title="THIS IS A TITLE"
      description="THIS IS A DESCRIPTION"
      actions={<Button>ACTION</Button>}
    />
  )

  expect(screen.getByText('🍿')).toBeVisible()
  expect(screen.getByText('THIS IS A TITLE')).toBeVisible()
  expect(screen.getByText('THIS IS A DESCRIPTION')).toBeVisible()
  expect(screen.getByText('ACTION')).toBeVisible()
})
