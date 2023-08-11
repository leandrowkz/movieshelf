import React, { useContext, useEffect } from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { PersonImagesModal } from '.'
import { mockPersonImages } from 'src/__mocks__/mockPersonImages'
import { Button } from '../Button'
import { PeopleContext } from 'src/context/PeopleContext'
import { mockImage } from 'src/__mocks__/mockImage'
import { act } from '@testing-library/react'

jest.mock('src/hooks/apis/usePeopleAPI')

const { renderComponent, screen, user } = useTesting()

const mocks = {
  image: mockImage,
}

function WrapperComponent() {
  const { fetchImages, openModalImage, closeModalImage, setActiveImage } =
    useContext(PeopleContext)

  useEffect(() => {
    fetchImages(400)
  }, [])

  return (
    <>
      <Button
        data-testid="button-open-modal"
        onClick={() => openModalImage(mocks.image)}
      />
      <Button
        data-testid="button-close-modal"
        onClick={() => closeModalImage()}
      />
      <Button
        data-testid="button-set-active"
        onClick={() => setActiveImage(mocks.image)}
      />
      <PersonImagesModal data-testid="modal" />
    </>
  )
}

async function safeRenderComponent() {
  return act(async () => renderComponent(<WrapperComponent />))
}

test('Should render properly, not visible by default', async () => {
  await safeRenderComponent()

  expect(screen.getByTestId('modal').classList.contains('open')).toBeFalsy()
})

test('Should open and render properly', async () => {
  await safeRenderComponent()

  await user.click(screen.getByTestId('button-open-modal'))

  expect(screen.getByTestId('modal').classList.contains('open')).toBeTruthy()
  expect(
    (await screen.findAllByTestId('person-image-modal-item')).length
  ).toEqual(mockPersonImages.length)
})
