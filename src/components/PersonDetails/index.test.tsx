import React, { useContext, useEffect } from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PersonDetails } from '.'
import { usePeopleAPI } from 'src/hooks/apis/usePeopleAPI'
import { mockPerson } from 'src/__mocks__/mockPerson'
import type { Person } from '@leandrowkz/tmdb'
import { useHelpers } from 'src/hooks/useHelpers'
import { PeopleContext } from 'src/context/PeopleContext'
import { waitForElementToBeRemoved } from '@testing-library/react'

jest.mock('src/hooks/apis/usePeopleAPI')

const { renderComponent, screen } = useTesting()
const { formatDate, getAgeFromDate, getJobByDepartment } = useHelpers()
const api = usePeopleAPI()

function getPersonData(person: Person) {
  const birthday = formatDate(person.birthday)
  const age = getAgeFromDate(person.birthday)
  const knownFor = getJobByDepartment(
    person.known_for_department,
    person.gender
  )

  return {
    age,
    birthday,
    knownFor,
    name: person.name,
    birthplace: person.place_of_birth || '',
    bio: person.biography,
  }
}

function WrapperComponent() {
  const { fetchPerson } = useContext(PeopleContext)
  useEffect(() => {
    fetchPerson(400)
  }, [])

  return <PersonDetails />
}

test('Should render properly', async () => {
  renderComponent(<WrapperComponent />)

  const { name, knownFor, birthday, birthplace, bio, age } =
    getPersonData(mockPerson)

  expect(await screen.findByTestId('avatar')).toBeVisible()
  expect(screen.getByTestId('images')).toBeVisible()
  expect(screen.getByText(name, { exact: true })).toBeVisible()
  expect(screen.getByText(knownFor, { exact: true })).toBeVisible()
  expect(screen.getByText(birthday, { exact: true })).toBeVisible()
  expect(screen.getByText(birthplace, { exact: true })).toBeVisible()
  expect(screen.getByText(`(${age} years)`, { exact: true })).toBeVisible()
  expect(screen.getByText(bio)).toBeVisible()
})

test('Should render loader at first, when fetching data', async () => {
  renderComponent(<WrapperComponent />)

  await waitForElementToBeRemoved(() => screen.getByTestId('person-loader'))
})

test('Should render just a "-" when birthday or place of birth are missing', async () => {
  api.fetchPerson = jest.fn().mockResolvedValueOnce({
    ...mockPerson,
    birthday: 'INVALID DATE',
    place_of_birth: null,
  })
  renderComponent(<WrapperComponent />)

  expect((await screen.findAllByText('-', { exact: true })).length).toEqual(2)
})
