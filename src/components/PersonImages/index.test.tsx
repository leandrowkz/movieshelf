// import React from 'react'
// import { useTesting } from 'src/hooks/useTesting'
// import { PersonDetails } from '.'

// const { renderComponent, getMockPeople, screen } = useTesting()

// test('Should render PersonDetails properly', async () => {
//   renderComponent(<PersonDetails person={getMockPeople(10)} />)

//   const PersonDetails = screen.queryAllByTestId('person-item')

//   expect(PersonDetails.length).toEqual(4)
// })

// test('Should render length properly', async () => {
//   renderComponent(<PersonDetails person={getMockPeople(8)} size={8} />)

//   const PersonDetails = screen.queryAllByTestId('person-item')

//   expect(PersonDetails.length).toEqual(8)
// })

// test('Should render person info properly', async () => {
//   const people = getMockPeople()
//   renderComponent(<PersonDetails person={people} size={1} />)

//   const mockPerson = people[0]
//   expect(screen.getByText(mockPerson.name)).toBeVisible()
//   expect(screen.getByTestId('person-avatar')).toBeVisible()
// })
