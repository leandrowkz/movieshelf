import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowProviders } from '.'

const { renderComponent, getMockProviders, screen, user } = useTesting()

function localRenderComponent(
  watchProvidersAmount = 5,
  mock = jest.fn(),
  isLoading = false
) {
  return renderComponent(
    <ShowProviders
      country="US"
      providers={getMockProviders(watchProvidersAmount)}
      onCountryChange={mock}
      isLoading={isLoading}
    />
  )
}

test('Should render ShowProviders properly', async () => {
  localRenderComponent(10)

  const items = screen.getAllByTestId('provider-item')

  expect(screen.getByText('Where to watch in')).toBeVisible()
  expect(screen.getByText('United States of America 🇺🇸')).toBeVisible()
  expect(screen.queryByTestId('providers-loader')).not.toBeInTheDocument()
  expect(items.length).toBe(10)
})

test('Should render loading state properly', async () => {
  localRenderComponent(10, jest.fn(), true)

  const items = screen.queryAllByTestId('provider-item')

  expect(items.length).toEqual(0)
  expect(screen.getByTestId('providers-loader')).toBeVisible()
  expect(screen.getByText('Where to watch in')).toBeVisible()
  expect(screen.getByText('United States of America 🇺🇸')).toBeVisible()
})

test('Should render no providers state properly', async () => {
  localRenderComponent(0)

  const items = screen.queryAllByTestId('provider-item')

  expect(items.length).toEqual(0)
  expect(screen.getByText('Where to watch in')).toBeVisible()
  expect(screen.getByText('United States of America 🇺🇸')).toBeVisible()
  expect(
    screen.getByText(
      'Oh, no! No streaming services were found for this show in United States of America. 😢'
    )
  ).toBeVisible()
})

test('Should call function onCountryChange properly', async () => {
  const mock = jest.fn()
  localRenderComponent(10, mock)

  const trigger = screen.getByText('United States of America 🇺🇸')

  await user.click(trigger)

  const desiredCountry = await screen.findByText('Brazil')

  await user.click(desiredCountry)

  expect(mock).toHaveBeenCalledWith('BR')
})
