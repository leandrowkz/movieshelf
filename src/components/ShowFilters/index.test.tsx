import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowFilters } from '.'
import { mockGenresTVShowsCodes } from 'src/__mocks__/mockGenresTVShowsCodes'
import { mockGenresMoviesCodes } from 'src/__mocks__/mockGenresMoviesCodes'

const { renderComponent, screen, user } = useTesting()

jest.mock('src/context/GenresContext')

function getButton(): HTMLButtonElement {
  const { name } = mockGenresMoviesCodes[0]
  return screen.getByText(`${name}`)
}

test('Should render filters properly when no filter is selected', () => {
  const { container } = renderComponent(
    <ShowFilters onFilter={jest.fn()} type="movie" />
  )

  expect(container.querySelectorAll('.active').length).toEqual(0)
})

test('Should render all filters properly', () => {
  renderComponent(<ShowFilters onFilter={jest.fn()} type="movie" />)

  expect(screen.getAllByRole('button').length).toEqual(
    mockGenresTVShowsCodes.length
  )
})

test('Should render a single filter properly', () => {
  renderComponent(<ShowFilters onFilter={jest.fn()} type="movie" />)

  expect(getButton()).toBeInTheDocument()
})

test('Should dispatch correct onFilter calls', async () => {
  const onFilter = jest.fn()
  renderComponent(<ShowFilters onFilter={onFilter} type="movie" />)

  const button = getButton()
  await user.click(button)

  expect(onFilter).toHaveBeenCalledTimes(2)
  expect(onFilter).toHaveBeenCalledWith([])
  expect(onFilter).toHaveBeenCalledWith([Number(button.value)])
})

test('Should save filters on localStorage properly', async () => {
  renderComponent(<ShowFilters onFilter={jest.fn()} type="movie" />)

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

  renderComponent(<ShowFilters onFilter={jest.fn()} type="movie" />)

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

  renderComponent(<ShowFilters onFilter={jest.fn()} type="movie" />)

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
