import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { mockMoviesListsByGenres } from 'src/__mocks__/mockMoviesListsByGenres'
import { Movies } from '.'

const { renderComponent, screen, user } = useTesting()

jest.mock('src/hooks/apis/useMoviesAPI')

test('Should render movies page properly', async () => {
  renderComponent(<Movies />)

  expect((await screen.findAllByRole('list')).length).toEqual(
    mockMoviesListsByGenres.length
  )
})

test('Should properly hide/show carousels when filtering single', async () => {
  renderComponent(<Movies />)

  const buttonAction = await screen.findByTestId(`button-filter-28`)

  await user.click(buttonAction)

  expect(screen.getAllByRole('list').length).toEqual(1)
})

test('Should properly hide/show carousels when filtering multiple', async () => {
  renderComponent(<Movies />)

  const buttonAction = await screen.findByTestId(`button-filter-28`)
  const buttonAnimation = await screen.findByTestId(`button-filter-16`)

  await Promise.all([user.click(buttonAnimation), user.click(buttonAction)])

  expect(screen.getAllByRole('list').length).toEqual(2)
})

test('Should properly hide/show carousels when filtering and clearing multiple', async () => {
  renderComponent(<Movies />)

  const buttonAction = await screen.findByTestId(`button-filter-28`)
  const buttonAnimation = await screen.findByTestId(`button-filter-16`)

  await Promise.all([user.click(buttonAnimation), user.click(buttonAction)])

  await Promise.all([user.click(buttonAnimation), user.click(buttonAction)])

  expect(screen.getAllByRole('list').length).toEqual(
    mockMoviesListsByGenres.length
  )
})
