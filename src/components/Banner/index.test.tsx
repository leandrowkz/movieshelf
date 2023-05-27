import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Banner } from '.'

const { renderComponent, getMockMovies, screen } = useTesting()

test('Should render Banner properly', async () => {
  renderComponent(<Banner shows={getMockMovies()} />)

  expect(screen.getByTestId('header')).toBeVisible()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(screen.getByTestId('pages')).toBeVisible()
})

test('Should render Loader properly', async () => {
  renderComponent(<Banner shows={getMockMovies()} isLoading />)

  expect(screen.getByTestId('header')).toBeVisible()
  expect(screen.getByTestId('loader')).toBeVisible()
  expect(screen.queryByTestId('pages')).not.toBeInTheDocument()
})
