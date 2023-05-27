import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Rating } from '.'

const { renderComponent, screen } = useTesting()

test('Should render Rating properly', async () => {
  renderComponent(<Rating score={7.83} />)

  expect(screen.getByText('★ 7.8')).toBeVisible()
})

test('Should round Rating properly', async () => {
  renderComponent(<Rating score={7.89} />)

  expect(screen.getByText('★ 7.9')).toBeVisible()
})

test('Should fallback Rating properly', async () => {
  renderComponent(<Rating score={'HAHA' as unknown as number} />)

  expect(screen.getByText('★ 0.0')).toBeVisible()
})
