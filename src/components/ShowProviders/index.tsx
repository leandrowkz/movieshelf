import React, { type HTMLAttributes } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import type { CountryCode, WatchProvider } from '@leandrowkz/tmdb'
import { Avatar } from '../Avatar'
import { useHelpers } from 'src/hooks/useHelpers'
import { Container } from '../Container'
import { ShowProvidersCountrySelector } from '../ShowProvidersCountrySelector'
import { Heading } from '../Heading'
import { Country } from 'src/types'
import { Text } from '../Text'

interface ShowProviderProps extends HTMLAttributes<HTMLDivElement> {
  country: CountryCode
  providers: WatchProvider[]
  isLoading?: boolean
  onCountryChange: (country: CountryCode) => void
}

export function ShowProviders({
  country,
  providers,
  isLoading,
  className,
  onCountryChange,
  ...props
}: ShowProviderProps) {
  const classes = classNames(styles.providers, className)
  const countryName = Country[country]
  const { getShowImageUrl } = useHelpers()

  return (
    <Container {...props} className={classes}>
      <div className={styles.header}>
        <Heading
          title="Where to watch in "
          level={2}
          className={styles.heading}
        />
        <ShowProvidersCountrySelector
          country={country}
          onCountryChange={(code) => onCountryChange(code)}
        />
      </div>
      {!providers.length && !isLoading && (
        <Heading
          title={`No streaming services were found for this show in ${countryName}.`}
          level={3}
        />
      )}
      <div className={styles.items}>
        {providers.map((provider) => (
          <div
            key={`provider-item-${provider.provider_id}`}
            className={styles.item}
            title={provider.provider_name}
          >
            <Avatar
              image={getShowImageUrl(provider.logo_path)}
              title={provider.provider_name}
              className={styles.logo}
            />
            <Text size="small" className={styles.providerName}>
              {provider.provider_name}
            </Text>
          </div>
        ))}
      </div>
    </Container>
  )
}
