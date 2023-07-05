import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowTypeFilters } from '.'
import { mockGenresTVShows } from 'src/__mocks__/mockGenresTVShows'
import { mockGenresMovies } from 'src/__mocks__/mockGenresMovies'

const { renderComponent, screen, user } = useTesting()

jest.mock('src/context/GenresContext')

function getButton(): HTMLButtonElement {
  const { name } = mockGenresMovies[0]
  return screen.getByText(`${name}`)
}

test('Should render filters properly when no filter is selected', () => {
  const { container } = renderComponent(
    <ShowTypeFilters onFilter={jest.fn()} value="movie" />
  )

  expect(container.querySelectorAll('.active').length).toEqual(0)
})

test('Should render all filters properly', () => {
  renderComponent(<ShowTypeFilters onFilter={jest.fn()} value="movie" />)

  expect(screen.getAllByRole('button').length).toEqual(mockGenresTVShows.length)
})

test('Should render a single filter properly', () => {
  renderComponent(<ShowTypeFilters onFilter={jest.fn()} value="movie" />)

  expect(getButton()).toBeInTheDocument()
})

test('Should dispatch correct onFilter calls', async () => {
  const onFilter = jest.fn()
  renderComponent(<ShowTypeFilters onFilter={onFilter} value="movie" />)

  const button = getButton()
  await user.click(button)

  expect(onFilter).toHaveBeenCalledTimes(2)
  expect(onFilter).toHaveBeenCalledWith([])
  expect(onFilter).toHaveBeenCalledWith([Number(button.value)])
})

test('Should save filters on localStorage properly', async () => {
  renderComponent(<ShowTypeFilters onFilter={jest.fn()} value="movie" />)

  const button = getButton()
  await user.click(button)

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'MOVIES_FILTERS',
    `[${button.value}]`
  )
})

test('Should load filters from localStorage properly', async () => {
  window.localStorage.getItem = jest
    .fn()
    .mockImplementationOnce(() => '[14,31,27]')

  renderComponent(<ShowTypeFilters onFilter={jest.fn()} value="movie" />)

  const button = getButton()
  await user.click(button)

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'MOVIES_FILTERS',
    `[14,31,27,${button.value}]`
  )
})

test('Should clear other filters when clicking on "ALL" filter', async () => {
  window.localStorage.getItem = jest
    .fn()
    .mockImplementationOnce(() => '[14,16,27]')

  renderComponent(<ShowTypeFilters onFilter={jest.fn()} value="movie" />)

  const buttonOne = screen.getByTestId(`button-filter-14`)
  const buttonTwo = screen.getByTestId(`button-filter-16`)
  const buttonThree = screen.getByTestId(`button-filter-27`)

  await Promise.all([
    user.click(buttonOne),
    user.click(buttonTwo),
    user.click(buttonThree),
  ])

  expect(localStorage.setItem).toHaveBeenCalledWith('MOVIES_FILTERS', `[]`)
})
