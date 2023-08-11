import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PeopleList } from '.'

const { renderComponent, getMockPeople, screen } = useTesting()

test('Should render PeopleList properly', async () => {
  renderComponent(<PeopleList people={getMockPeople(10)} />)

  const peopleList = screen.queryAllByTestId('person-item')

  expect(peopleList.length).toEqual(4)
})

test('Should render length properly', async () => {
  renderComponent(<PeopleList people={getMockPeople(8)} size={8} />)

  const peopleList = screen.queryAllByTestId('person-item')

  expect(peopleList.length).toEqual(8)
})

test('Should render person info properly', async () => {
  const people = getMockPeople()
  renderComponent(<PeopleList people={people} size={1} />)

  const mockPerson = people[0]
  expect(screen.getByText(mockPerson.name)).toBeVisible()
  expect(screen.getByTestId('person-avatar')).toBeVisible()
})
