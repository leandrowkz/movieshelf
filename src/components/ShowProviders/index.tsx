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
import { ShowProvidersLoader } from './loader'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Link } from 'react-router-dom'

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
  const isMobile = useScreenSize('mobile')
  const isTablet = useScreenSize('tablet')
  const isSmallDevice = isMobile || isTablet
  const classes = classNames(styles.providers, className, {
    [styles.mobile]: isSmallDevice,
  })
  const countryName = Country[country]
  const { getShowImageUrl } = useHelpers()

  const getProviderName = (name: string) => {
    const parts = name.split(' ')
    return `${parts[0] || name}${parts[1] ? ` ${parts[1]}` : ''}`
  }

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
      <Text isMuted size="small" isParagraph className={styles.disclaimer}>
        This data is provided by <b>JustWatch</b> partner. If you spot something
        unusual you must{' '}
        <Link to="https://support.justwatch.com/hc/en-us" target="_blank">
          report
        </Link>{' '}
        them directly.
      </Text>
      {isLoading && <ShowProvidersLoader data-testid="providers-loader" />}
      {!providers.length && !isLoading && (
        <Text className={styles.notFound}>
          Oh, no! No streaming services were found for this show in{' '}
          {countryName}. 😢
        </Text>
      )}
      <div className={styles.items}>
        {!isLoading &&
          providers.map((provider, index) => (
            <div
              key={`provider-item-${provider.provider_id}-${index}`}
              className={styles.item}
              title={provider.provider_name}
              data-testid="provider-item"
            >
              <Avatar
                image={getShowImageUrl(provider.logo_path)}
                title={provider.provider_name}
                className={styles.logo}
              />
              <Text size="small" className={styles.providerName}>
                {getProviderName(provider.provider_name)}
              </Text>
            </div>
          ))}
      </div>
    </Container>
  )
}
