// import React from 'react'
// import { useTesting } from 'src/hooks/useTesting'
// import { ShowCarousel } from '.'

// const { renderComponent, getMockMovies, screen } = useTesting()

// test('Should render ShowCarousel properly', async () => {
//   const { container } = renderComponent(
//     <ShowCarousel shows={getMockMovies(10)} title="MOCK CAROUSEL TITLE" />
//   )

//   const title = screen.getByText('MOCK CAROUSEL TITLE')
//   const pages = container.querySelectorAll('.page')
//   const items = container.querySelectorAll('.show')
//   const loader = screen.queryByTestId('loader')

//   expect(title).toBeInTheDocument()
//   expect(loader).not.toBeInTheDocument()
//   expect(pages.length).toEqual(10)
//   expect(items.length).toEqual(10)
// })

// test('Should render Loader properly', async () => {
//   const { container } = renderComponent(
//     <ShowCarousel
//       shows={getMockMovies(10)}
//       title="MOCK CAROUSEL TITLE"
//       isLoading
//     />
//   )

//   const title = screen.getByText('MOCK CAROUSEL TITLE')
//   const pages = container.querySelectorAll('.page')
//   const items = container.querySelectorAll('.show')
//   const loader = screen.getByTestId('loader')

//   expect(title).toBeInTheDocument()
//   expect(loader).toBeInTheDocument()
//   expect(pages.length).toEqual(0)
//   expect(items.length).toEqual(0)
// })

// test('Should render properly when there are no items', async () => {
//   const { container } = renderComponent(
//     <ShowCarousel shows={[]} title="MOCK CAROUSEL TITLE" />
//   )

//   const title = screen.queryByText('MOCK CAROUSEL TITLE')
//   const pages = container.querySelectorAll('.page')
//   const items = container.querySelectorAll('.show')
//   const loader = screen.queryByTestId('loader')

//   expect(title).not.toBeInTheDocument()
//   expect(loader).not.toBeInTheDocument()
//   expect(pages.length).toEqual(0)
//   expect(items.length).toEqual(0)
// })
