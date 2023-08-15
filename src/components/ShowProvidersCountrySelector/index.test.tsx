import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { ShowProvidersCountrySelector } from '.'

const { renderComponent, user, screen } = useTesting()

function getTrigger() {
  return screen.getByText('United States of America 🇺🇸')
}

async function getInputSearch() {
  return await screen.findByTestId('search-input')
}

test('Should render ShowProvidersCountrySelector properly', async () => {
  renderComponent(
    <ShowProvidersCountrySelector country="US" onCountryChange={jest.fn()} />
  )

  const trigger = getTrigger()

  await user.click(trigger)

  expect(trigger).toBeVisible()
  expect(await getInputSearch()).toBeVisible()
})

test('Should work properly when selecting a country', async () => {
  const mock = jest.fn()
  renderComponent(
    <ShowProvidersCountrySelector country="US" onCountryChange={mock} />
  )

  await user.click(getTrigger())

  const newCountry = await screen.findByText('Brazil')

  await user.click(newCountry)

  expect(mock).toHaveBeenCalledWith('BR')
})

test('Should filter countries properly when typing', async () => {
  const mock = jest.fn()
  renderComponent(
    <ShowProvidersCountrySelector country="US" onCountryChange={mock} />
  )

  await user.click(getTrigger())
  await user.type(await getInputSearch(), 'ARGEN')

  const foundItem = await screen.findByText('🇦🇷')
  const notFoundItem = screen.queryByText('🇺🇸')
  const countries = screen.getAllByTestId('country-item')

  expect(foundItem).toBeVisible()
  expect(countries.length).toBe(1)
  expect(notFoundItem).not.toBeInTheDocument()
})
