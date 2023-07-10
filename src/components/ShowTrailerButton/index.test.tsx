import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowTrailerButton } from '.'

const { renderComponent, getMockVideos, screen } = useTesting()

test('Should render ShowTrailerButton properly', async () => {
  renderComponent(<ShowTrailerButton videos={getMockVideos()} />)

  expect(screen.getByRole('button', { name: /trailer/i })).toBeVisible()
})

test('Should not render ShowTrailerButton if videos are missing', async () => {
  renderComponent(<ShowTrailerButton videos={[]} />)

  expect(
    screen.queryByRole('button', { name: /trailer/i })
  ).not.toBeInTheDocument()
})
