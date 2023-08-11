import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PersonDetails } from '.'
import { mockPersonMoviesLists } from 'src/__mocks__/mockPersonMoviesLists'
import { mockPersonTVShowsLists } from 'src/__mocks__/mockPersonTVShowsLists'
import { usePeopleAPI } from 'src/hooks/apis/usePeopleAPI'

jest.mock('src/hooks/apis/usePeopleAPI')

const { renderComponent, screen, user } = useTesting()
const api = usePeopleAPI()

test('Should render properly', async () => {
  renderComponent(<PersonDetails />)

  expect(await screen.findByTestId('person-details')).toBeVisible()
  expect(await screen.findByTestId('filters')).toBeVisible()
  expect(await screen.findByTestId('person-images-modal')).toBeInTheDocument()
  expect((await screen.findAllByTestId('movies-list')).length).toEqual(
    mockPersonMoviesLists.length
  )
  expect(screen.queryAllByTestId('tv-shows-list').length).toEqual(0)
})

test('Should switch filters properly', async () => {
  renderComponent(<PersonDetails />)

  const moviesButton = await screen.findByRole('button', { name: /movies/i })
  const tvShowsButton = await screen.findByRole('button', { name: /tv shows/i })

  await user.click(tvShowsButton)

  expect(screen.queryAllByTestId('movies-list').length).toEqual(0)
  expect(screen.queryAllByTestId('tv-shows-list').length).toEqual(
    mockPersonTVShowsLists.length
  )

  await user.click(moviesButton)

  expect(screen.queryAllByTestId('tv-shows-list').length).toEqual(0)
  expect(screen.queryAllByTestId('movies-list').length).toEqual(
    mockPersonMoviesLists.length
  )
})

test('Should render not found when person does not exist', async () => {
  api.fetchPerson = jest.fn().mockRejectedValueOnce('NOT FOUND GENERIC ERROR')
  renderComponent(<PersonDetails />)

  expect(await screen.findByTestId('person-not-found')).toBeVisible()
  expect(screen.queryByTestId('person-details')).not.toBeInTheDocument()
  expect(screen.queryByTestId('filters')).not.toBeInTheDocument()
  expect(screen.queryAllByTestId('tv-shows-list').length).toEqual(0)
  expect(screen.queryAllByTestId('movies-list').length).toEqual(0)
})

test('Should render not found when person does not exist', async () => {
  api.fetchPerson = jest.fn().mockRejectedValueOnce('NOT FOUND GENERIC ERROR')
  renderComponent(<PersonDetails />)

  expect(await screen.findByTestId('person-not-found')).toBeVisible()
  expect(screen.queryByTestId('person-details')).not.toBeInTheDocument()
  expect(screen.queryByTestId('filters')).not.toBeInTheDocument()
  expect(screen.queryAllByTestId('tv-shows-list').length).toEqual(0)
  expect(screen.queryAllByTestId('movies-list').length).toEqual(0)
})
