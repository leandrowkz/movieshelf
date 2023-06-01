import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { TVEpisodeList } from '.'

const { renderComponent, getMockTVEpisodes, screen } = useTesting()

test('Should render TVEpisodeList properly', async () => {
  const { container } = renderComponent(
    <TVEpisodeList episodes={getMockTVEpisodes(10)} isLoading={false} />
  )

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(container.querySelectorAll('.episode').length).toEqual(10)
})

test('Should render Loader properly', async () => {
  const { container } = renderComponent(
    <TVEpisodeList episodes={getMockTVEpisodes(10)} isLoading={true} />
  )

  expect(screen.getByTestId('loader')).toBeVisible()
  expect(container.querySelectorAll('.episode').length).toEqual(0)
})

test('Should render properly when there are no items', async () => {
  const { container } = renderComponent(
    <TVEpisodeList episodes={getMockTVEpisodes(0)} />
  )

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(container.querySelectorAll('.episode').length).toEqual(0)
})
