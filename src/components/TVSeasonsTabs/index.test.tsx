import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { TVSeasonsTabs } from '.'
import { TVShow } from '@leandrowkz/tmdb'
import { act } from '@testing-library/react'

jest.mock('src/services/TVSeasonsAPI')

const { renderComponent, getMockTVShows, screen } = useTesting()

function getShow() {
  return { ...getMockTVShows(1)[0] } as TVShow
}

async function safeRenderComponent(show: TVShow) {
  return await act(async () =>
    renderComponent(<TVSeasonsTabs show={show} title="ALL SEASONS TITLE" />)
  )
}

test('Should render TVSeasonsTabs properly', async () => {
  const show = getShow()
  await safeRenderComponent(show)

  expect(screen.getByText('ALL SEASONS TITLE')).toBeVisible()
  expect(screen.getByTestId('seasons-tabs')).toBeVisible()
  expect(await screen.findByTestId('season-details')).toBeVisible()
})

test('Should render properly when there are no items', async () => {
  const show = getShow()
  show.seasons = []
  await safeRenderComponent(show)

  expect(screen.queryByText('ALL SEASONS TITLE')).not.toBeInTheDocument()
  expect(screen.queryByTestId('seasons-tabs')).not.toBeInTheDocument()
  expect(screen.queryByTestId('season-details')).not.toBeInTheDocument()
})

test('Should render tabs amount properly', async () => {
  const show = getShow()
  await safeRenderComponent(show)

  expect(screen.getAllByTestId('season-tab-button').length).toEqual(
    show.seasons.length
  )
})
