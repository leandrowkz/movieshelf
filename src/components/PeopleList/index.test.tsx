// import React from 'react'
// import { render } from '@testing-library/react'
// import { PeopleList } from '.'
// import { mockPerson } from '../../__mocks__/mockPerson'

// const makeSUT = () => {
//   const mockPeople = []

//   for (let i = 0; i < 10; i++) {
//     mockPeople.push({ ...mockPerson })
//   }

//   return { people: mockPeople }
// }

// describe('PeopleList', () => {
//   test('Should render PeopleList properly', async () => {
//     const { people } = makeSUT()
//     const { container } = render(<PeopleList people={people} />)

//     const peopleList = container.querySelectorAll('div.person')

//     expect(peopleList.length).toEqual(4)
//   })

//   test('Should render length properly', async () => {
//     const { people } = makeSUT()
//     const { container } = render(<PeopleList people={people} size={8} />)

//     const peopleList = container.querySelectorAll('div.person')

//     expect(peopleList.length).toEqual(8)
//   })

//   test('Should render person info properly', async () => {
//     const { people } = makeSUT()
//     const { getByText, getByTestId } = render(
//       <PeopleList people={people} size={1} />
//     )

//     const mockPerson = people[0]
//     const name = getByText(mockPerson.name)
//     const avatar = getByTestId('person-avatar')

//     expect(name).toBeInTheDocument()
//     expect(avatar).toBeInTheDocument()
//   })
// })
