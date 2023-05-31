import React, { HTMLAttributes } from 'react'
import type { TVSeason } from '@leandrowkz/tmdb'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import classNames from 'classnames'
import { Container } from '../Container'
import { Text } from '../Text'
import { TVEpisodeList } from '../TVEpisodeList'
import { TVSeasonDetailsLoader } from './loader'
import { useHelpers } from 'src/hooks/useHelpers'

interface Props extends HTMLAttributes<HTMLDivElement> {
  season: TVSeason
  isLoading?: boolean
}

export function TVSeasonDetails({
  season,
  className,
  isLoading = false,
  ...props
}: Props) {
  if (isLoading) {
    return <TVSeasonDetailsLoader />
  }

  if (!season || !season.id) {
    return <></>
  }

  const classes = classNames(styles.tvSeasonDetails, className)

  return (
    <section className={classes} {...props}>
      <Container>
        {season.overview && <Text isParagraph>{season.overview}</Text>}
        <Heading
          level={3}
          title={`Episodes (${season.episodes.length})`}
          className={styles.subtitle}
        />
        <TVEpisodeList episodes={season.episodes} />
      </Container>
    </section>
  )
}
