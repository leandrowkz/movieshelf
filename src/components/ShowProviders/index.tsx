import React, { type HTMLAttributes } from 'react'
import { CountryFlag, Country } from 'src/types'
import styles from './styles.module.css'
import classNames from 'classnames'
import type { CountryCode, WatchProvider } from '@leandrowkz/tmdb'
import { Heading } from '../Heading'
import { Avatar } from '../Avatar'
import { useHelpers } from 'src/hooks/useHelpers'
import { Text } from '../Text'
import { Container } from '../Container'

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
  ...props
}: ShowProviderProps) {
  const classes = classNames(styles.providers, className)
  const countryName = Country[country]
  const countryFlag = CountryFlag[country]
  const { getShowImageUrl } = useHelpers()

  return (
    <Container {...props} className={classes}>
      <Heading
        title={`Where to watch in ${countryName} ${countryFlag}`}
        level={2}
      />
      <div className={styles.items}>
        {providers.map((provider) => (
          <div
            key={`provider-item-${provider.provider_id}`}
            className={styles.item}
          >
            <Avatar
              image={getShowImageUrl(provider.logo_path)}
              className={styles.logo}
            />
            {/* <Text size="small">{provider.provider_name}</Text> */}
          </div>
        ))}
      </div>
    </Container>
  )
}
