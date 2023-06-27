import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { Pagination } from '.'

const { renderComponent, user, screen } = useTesting()

function getButton(content: string) {
  return screen.getByRole('button', { name: content })
}

function getNextButton() {
  return getButton('>')
}

function getPrevButton() {
  return getButton('<')
}

test('Should render pagination properly', () => {
  renderComponent(<Pagination pages={20} onPageChange={jest.fn()} />)

  expect(getButton('10')).toBeVisible()
  expect(getPrevButton()).toBeVisible()
  expect(getNextButton()).toBeVisible()
})

test('Should call pagination properly', async () => {
  const onPageChange = jest.fn()
  renderComponent(
    <Pagination pages={20} current={5} onPageChange={onPageChange} />
  )

  const middleButton = getButton('7')
  const prevButton = getPrevButton()
  const nextButton = getNextButton()

  await user.click(nextButton)
  await user.click(prevButton)
  await user.click(middleButton)

  expect(onPageChange).toHaveBeenCalledTimes(3)
  expect(onPageChange).toHaveBeenCalledWith(6)
  expect(onPageChange).toHaveBeenCalledWith(4)
  expect(onPageChange).toHaveBeenCalledWith(7)
})

test('Should not call prev/next if current is first or last', async () => {
  const onPageChange = jest.fn()
  renderComponent(<Pagination pages={20} onPageChange={onPageChange} />)

  await user.click(getPrevButton())

  expect(onPageChange).not.toHaveBeenCalled()
})

test('Should not render if pages are not set', async () => {
  renderComponent(<Pagination pages={0} onPageChange={jest.fn()} />)

  expect(screen.queryAllByRole('button').length).toEqual(0)
})
