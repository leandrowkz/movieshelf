import React from 'react'
import { GenreCode } from '@leandrowkz/tmdb'
import { useTesting } from 'src/hooks/useTesting'
import { useGenres } from 'src/hooks/useGenres'
import { Movies } from '.'

const { renderComponent, screen, user } = useTesting()

jest.mock('src/services/MoviesAPI')

function getButtonsFilters() {
  const genres = useGenres()
  const getFilter = (genreCode: number) =>
    genres.find((genre) => genre.id === genreCode) || {
      id: null,
      icon: '🧘‍♂️',
      name: 'NONE',
    }

  const filters = {
    action: getFilter(GenreCode.ACTION),
    sf: getFilter(GenreCode.SCIENCE_FICTION),
    thriller: getFilter(GenreCode.THRILLER),
  }

  const buttons = {
    action: screen.getByText(`${filters.action.icon} ${filters.action.name}`),
    scienceFiction: screen.getByText(`${filters.sf.icon} ${filters.sf.name}`),
    thriller: screen.getByText(
      `${filters.thriller.icon} ${filters.thriller.name}`
    ),
  }

  return buttons
}

async function assertHasAllCarousels() {
  expect(await screen.findByTestId('carousel-action')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-adventure')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-animation')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-comedy')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-crime')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-documentary')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-drama')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-family')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-fantasy')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-history')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-horror')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-music')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-mistery')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-romance')).toBeInTheDocument()
  expect(
    await screen.findByTestId('carousel-science-fiction')
  ).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-thriller')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-war')).toBeInTheDocument()
  expect(await screen.findByTestId('carousel-western')).toBeInTheDocument()
}

test('Should render movies page properly', async () => {
  renderComponent(<Movies />)

  await assertHasAllCarousels()
})

test('Should properly hide/show carousels when filtering single', async () => {
  renderComponent(<Movies />)

  const filters = getButtonsFilters()

  await user.click(filters.action)

  expect(screen.getByTestId('carousel-action')).toBeInTheDocument()
  expect(screen.getAllByRole('list').length).toEqual(1)
})

test('Should properly hide/show carousels when filtering multiple', async () => {
  renderComponent(<Movies />)

  const filters = getButtonsFilters()

  await Promise.all([
    user.click(filters.action),
    user.click(filters.scienceFiction),
    user.click(filters.thriller),
  ])

  expect(screen.getByTestId('carousel-action')).toBeInTheDocument()
  expect(screen.getByTestId('carousel-science-fiction')).toBeInTheDocument()
  expect(screen.getByTestId('carousel-thriller')).toBeInTheDocument()
  expect(screen.getAllByRole('list').length).toEqual(3)
})

test('Should properly hide/show carousels when filtering and clearing multiple', async () => {
  renderComponent(<Movies />)

  const filters = getButtonsFilters()

  await Promise.all([
    user.click(filters.action),
    user.click(filters.scienceFiction),
    user.click(filters.thriller),
  ])

  await Promise.all([
    user.click(filters.action),
    user.click(filters.scienceFiction),
    user.click(filters.thriller),
  ])

  await assertHasAllCarousels()
})
