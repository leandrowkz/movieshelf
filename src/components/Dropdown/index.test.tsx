import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Dropdown } from '.'

const { renderComponent, screen, user } = useTesting()

function getDropdown() {
  return (
    <Dropdown.Wrapper>
      <Dropdown.Trigger>TRIGGER</Dropdown.Trigger>
      <Dropdown.Menu data-testid="menu">
        <Dropdown.Header>HEADER</Dropdown.Header>
        <Dropdown.Item>ITEM 1</Dropdown.Item>
        <Dropdown.Item>ITEM 2</Dropdown.Item>
        <Dropdown.Item>ITEM 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Wrapper>
  )
}

test('Should render Dropdown properly', () => {
  renderComponent(getDropdown())

  expect(screen.getByText('TRIGGER')).toBeVisible()
  expect(screen.getByTestId('menu').classList.contains('open')).toBeFalsy()
})

test('Should show Dropdown menu properly', async () => {
  renderComponent(getDropdown())

  const trigger = screen.getByText('TRIGGER')

  await user.click(trigger)

  expect(screen.getByTestId('menu').classList.contains('open')).toBeTruthy()
  expect(screen.getByText('HEADER')).toBeVisible()
  expect(screen.getByText('ITEM 1')).toBeVisible()
  expect(screen.getByText('ITEM 2')).toBeVisible()
  expect(screen.getByText('ITEM 3')).toBeVisible()
})
