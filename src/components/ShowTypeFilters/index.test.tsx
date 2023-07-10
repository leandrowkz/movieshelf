import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowTypeFilters } from '.'

const { renderComponent, screen, user } = useTesting()

function getButton(): HTMLButtonElement {
  return screen.getByRole('button', { name: /movies/i })
}

test('Should render filters properly when no filter is selected', () => {
  const { container } = renderComponent(
    <ShowTypeFilters onFilter={jest.fn()} value="movie" />
  )

  expect(container.querySelectorAll('.active').length).toEqual(1)
})

test('Should render filters properly', () => {
  renderComponent(<ShowTypeFilters onFilter={jest.fn()} value="movie" />)

  expect(screen.getByText(/Movies/i)).toBeInTheDocument()
  expect(screen.getByText(/TV Shows/i)).toBeInTheDocument()
})

test('Should dispatch correct onFilter calls', async () => {
  const onFilter = jest.fn()
  renderComponent(<ShowTypeFilters onFilter={onFilter} value="movie" />)

  const button = getButton()
  await user.click(button)

  expect(onFilter).toHaveBeenCalledTimes(1)
  expect(onFilter).toHaveBeenCalledWith('movie')
})
