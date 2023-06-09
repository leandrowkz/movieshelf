import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { mockMoviesListsByGenres } from 'src/__mocks__/mockMoviesListsByGenres'
import { TVShows } from '.'

const { renderComponent, screen, user } = useTesting()

jest.mock('src/services/TVShowsAPI')

test('Should render TVShows page properly', async () => {
  renderComponent(<TVShows />)

  expect((await screen.findAllByRole('list')).length).toEqual(
    mockMoviesListsByGenres.length
  )
})

test('Should properly hide/show carousels when filtering single', async () => {
  renderComponent(<TVShows />)

  const buttonAction = await screen.findByTestId(`button-filter-28`)

  await user.click(buttonAction)

  expect(screen.getAllByRole('list').length).toEqual(1)
})

test('Should properly hide/show carousels when filtering multiple', async () => {
  renderComponent(<TVShows />)

  const buttonAction = await screen.findByTestId(`button-filter-28`)
  const buttonAnimation = await screen.findByTestId(`button-filter-16`)

  await Promise.all([user.click(buttonAnimation), user.click(buttonAction)])

  expect(screen.getAllByRole('list').length).toEqual(2)
})

test('Should properly hide/show carousels when filtering and clearing multiple', async () => {
  renderComponent(<TVShows />)

  const buttonAction = await screen.findByTestId(`button-filter-28`)
  const buttonAnimation = await screen.findByTestId(`button-filter-16`)

  await Promise.all([user.click(buttonAnimation), user.click(buttonAction)])

  await Promise.all([user.click(buttonAnimation), user.click(buttonAction)])

  expect(screen.getAllByRole('list').length).toEqual(
    mockMoviesListsByGenres.length
  )
})
