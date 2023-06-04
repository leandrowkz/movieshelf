import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { TVSeasonDetails } from '.'

const { renderComponent, getMockTVSeasons, screen } = useTesting()

function getSeason() {
  return getMockTVSeasons(1)[0]
}

test('Should render TVSeasonDetails properly', async () => {
  const season = getSeason()
  renderComponent(<TVSeasonDetails season={season} />)

  expect(screen.getByText(season.overview)).toBeVisible()
  expect(screen.getByText(`Episodes (${season.episodes.length})`)).toBeVisible()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(screen.getByTestId('season-episodes')).toBeVisible()
})

test('Should render Loader properly', async () => {
  const season = getSeason()
  renderComponent(<TVSeasonDetails season={season} isLoading />)

  expect(screen.queryByText(season.overview)).not.toBeInTheDocument()
  expect(
    screen.queryByText(`Episodes (${season.episodes.length})`)
  ).not.toBeInTheDocument()
  expect(screen.getByTestId('loader')).toBeVisible()
  expect(screen.queryByTestId('season-episodes')).not.toBeInTheDocument()
})

test('Should render properly when season is empty for some reason', async () => {
  // @ts-expect-error testing for null purposes
  renderComponent(<TVSeasonDetails season={null} />)

  expect(screen.queryByTestId('season-overview')).not.toBeInTheDocument()
  expect(screen.queryByTestId('season-header')).not.toBeInTheDocument()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(screen.queryByTestId('season-episodes')).not.toBeInTheDocument()
})
