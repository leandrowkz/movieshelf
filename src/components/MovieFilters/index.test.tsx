import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from 'src/helpers/testing'
import { MovieFilters } from '.'
import { genres } from './genres'

function getButton(): HTMLButtonElement {
  const filter = genres[1]
  return screen.getByText(`${filter.icon} ${filter.name}`)
}

test('Should render filters properly when no filter is selected', () => {
  const { container } = renderComponent(<MovieFilters onFilter={jest.fn()} />)

  expect(container.querySelectorAll('.active').length).toEqual(1)
  expect(
    container.querySelector('.active')?.innerHTML.match(/all/i)
  ).toBeTruthy()
})

test('Should render all filters properly', () => {
  renderComponent(<MovieFilters onFilter={jest.fn()} />)

  expect(screen.getAllByRole('button').length).toEqual(genres.length)
})

test('Should render a single filter properly', () => {
  renderComponent(<MovieFilters onFilter={jest.fn()} />)

  expect(getButton()).toBeInTheDocument()
})

test('Should dispatch correct onFilter calls', async () => {
  const onFilter = jest.fn()
  const { user } = renderComponent(<MovieFilters onFilter={onFilter} />)

  const button = getButton()
  await user.click(button)

  expect(onFilter).toHaveBeenCalledTimes(3)
  expect(onFilter).toHaveBeenCalledWith([])
  expect(onFilter).toHaveBeenCalledWith([null])
  expect(onFilter).toHaveBeenCalledWith([Number(button.value)])
})

test('Should save filters on localStorage properly', async () => {
  const { user } = renderComponent(<MovieFilters onFilter={jest.fn()} />)

  const button = getButton()
  await user.click(button)

  expect(localStorage.setItem).toHaveBeenCalledWith('MOVIE_FILTERS', '[]')
  expect(localStorage.setItem).toHaveBeenCalledWith('MOVIE_FILTERS', '[null]')
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'MOVIE_FILTERS',
    `[${button.value}]`
  )
})

test('Should load filters from localStorage properly', async () => {
  window.localStorage.getItem = jest
    .fn()
    .mockImplementationOnce(() => '[14,31,27]')
  const { user } = renderComponent(<MovieFilters onFilter={jest.fn()} />)

  const button = getButton()
  await user.click(button)

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'MOVIE_FILTERS',
    '[14,31,27]'
  )
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'MOVIE_FILTERS',
    `[14,31,27,${button.value}]`
  )
})

test('Should clear other filters when clicking on "ALL" filter', async () => {
  window.localStorage.getItem = jest
    .fn()
    .mockImplementationOnce(() => '[14,31,27]')
  const { user } = renderComponent(<MovieFilters onFilter={jest.fn()} />)

  const { icon, name } = genres[0]
  const button = screen.getByText(`${icon} ${name}`)
  await user.click(button)

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'MOVIE_FILTERS',
    '[14,31,27]'
  )
  expect(localStorage.setItem).toHaveBeenCalledWith('MOVIE_FILTERS', `[null]`)
})