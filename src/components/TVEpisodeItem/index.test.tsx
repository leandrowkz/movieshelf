import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { TVEpisodeItem } from '.'

const { renderComponent, getMockTVEpisodes, screen } = useTesting()

test('Should render TVEpisodeItem properly', async () => {
  const ep = getMockTVEpisodes(1)[0]
  renderComponent(<TVEpisodeItem episode={ep} />)

  expect(screen.getByTestId('ep-poster')).toBeVisible()
  expect(screen.getByTestId('ep-overview')).toBeVisible()
  expect(screen.getByTestId('ep-rating')).toBeVisible()
  expect(screen.getAllByText(ep.overview).length).toEqual(2)
  expect(screen.getByText(ep.name)).toBeVisible()
  expect(screen.getByText(`Episode ${ep.episode_number}`)).toBeVisible()
})
