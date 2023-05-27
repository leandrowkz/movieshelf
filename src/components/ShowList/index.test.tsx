import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowList } from '.'

const { renderComponent, getMockMovies, screen } = useTesting()

test('Should render ShowList properly', async () => {
  renderComponent(
    <ShowList
      shows={getMockMovies(10)}
      title={'MOCK LIST TITLE'}
      isLoading={false}
    />
  )

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(screen.getByText('MOCK LIST TITLE')).toBeInTheDocument()
  expect(screen.getAllByTestId('show-item').length).toEqual(10)
})

test('Should render Loader properly', async () => {
  renderComponent(
    <ShowList
      shows={getMockMovies(10)}
      title={'MOCK LIST TITLE'}
      isLoading={true}
    />
  )

  expect(screen.getByText('MOCK LIST TITLE')).toBeInTheDocument()
  expect(screen.getByTestId('loader')).toBeInTheDocument()
  expect(screen.queryAllByTestId('show-item').length).toEqual(0)
})

test('Should render properly when there are no items', async () => {
  renderComponent(
    <ShowList shows={[]} title={'MOCK LIST TITLE'} isLoading={false} />
  )

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  expect(screen.queryByText('MOCK LIST TITLE')).not.toBeInTheDocument()
  expect(screen.queryAllByTestId('show-item').length).toEqual(0)
})
