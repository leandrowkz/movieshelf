import React from 'react'
import { useTesting } from '../../hooks/useTesting'
import { PersonImages } from '.'
import { mockPersonImages } from '../../__mocks__/mockPersonImages'

const { renderComponent, screen } = useTesting()

test('Should render properly', async () => {
  renderComponent(<PersonImages images={mockPersonImages} />)

  expect(screen.getAllByTestId('person-image').length).toEqual(3)
  expect(
    screen.getByText(`+${mockPersonImages.length - 2} Photos`)
  ).toBeVisible()
})
