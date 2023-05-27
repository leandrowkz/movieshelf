import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { BulletSeparator } from '.'

const { renderComponent, screen } = useTesting()

test('Should render bullet separator properly', async () => {
  renderComponent(<BulletSeparator />)

  const separator = screen.queryByText('•')

  expect(separator).toBeInTheDocument()
})

test('Should set classes properly', async () => {
  renderComponent(<BulletSeparator className="custom" isMuted />)

  const separator = screen.getByText('•')

  expect(separator.classList.toString()).toEqual('separator custom muted text')
})
